const mongoose = require('mongoose');
const user = require('../models/userModels');
const audiobooks = require('../models/audioBookModels');
const role = require('../models/roleModels');
const subscriptions = require('../models/subScriptionModels');
const voucher = require('../models/voucherModels');
const genre = require('../models/genreModels');
const cast = require('../models/crewModels');
const review = require('../models/reviewModels');
const episodes = require('../models/EpisodesModels');
const playlist = require('../models/playListMasterModels');
const homeLabel = require('../models/homeLabelModels');
// Helper function to format numbers
function formatNumber(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
};

exports.DashboardList = async (req, res) => {
  try {
    // Dynamically import google-play-scraper
    const gplay = await import('google-play-scraper');

    // Access the app data
    const appData = await gplay.default.app({ appId: 'com.whatsapp' });

    //   console.log(appData);
    const userCount = await user.countDocuments();
    const ratedCount = appData.ratings;
    const downLoadCount = appData.maxInstalls;
    const audioBooks = await audiobooks.countDocuments();
    res.json({
      message: 'Dashboard list received',
      data: {
        totalUsers: formatNumber(userCount),
        ratedThis: formatNumber(ratedCount),
        totalDownLoad: formatNumber(downLoadCount),
        totalAudioBooks: formatNumber(audioBooks),
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.UserChart = async (req, res) => {
  // Find users where createdAt is within that range
  const rawData = await user.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          hasSubscription: {
            $cond: [{ $ifNull: ["$subScriptionId", false] }, "premium", "normal"]
          }
        },
        count: { $sum: 1 }
      }
    }
  ]);
  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const now = new Date();
  const currentMonth = now.getMonth(); // 0-indexed (0 = Jan)
  const currentYear = now.getFullYear();

  // Get the last 5 months
  const targetMonths = [];
  for (let i = 4; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - i, 1);
    targetMonths.push({ year: date.getFullYear(), month: date.getMonth() + 1 }); // month is 1-based for matching aggregation result
  }

  // Create a map with default zero values
  const monthlyMap = {};
  targetMonths.forEach(({ year, month }) => {
    const name = MONTH_NAMES[month - 1];
    monthlyMap[`${year}-${month}`] = { name, premium: 0, normal: 0 };
  });

  // Fill in actual counts from raw aggregation
  rawData.forEach(entry => {
    const key = `${entry._id.year}-${entry._id.month}`;
    if (monthlyMap[key]) {
      monthlyMap[key][entry._id.hasSubscription] = entry.count;
    }
  });

  const barData = Object.values(monthlyMap);
  res.json({
    msg: 'helllo',
    data: barData,
  })
};

exports.CategoryChart = async (req, res) => {
  try {
    const genreUsage = await audiobooks.aggregate([
      {
        $match: {
          genreId: { $ne: null } // Exclude documents with null genreId
        }
      },
      {
        $group: {
          _id: "$genreId",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: "genres",
          localField: "_id",
          foreignField: "_id",
          as: "genre"
        }
      },
      {
        $unwind: {
          path: "$genre",
          preserveNullAndEmptyArrays: false // Drop if genre lookup fails
        }
      },
      {
        $project: {
          _id: 0,
          name: "$genre.name",
          value: "$count"
        }
      }
    ]);

    const colors = ["#1E2A5E", "#55679C", "#7C93C3", "#CCD6EB", "#E6ECF7"];

    const pieData = genreUsage.map((item, index) => ({
      name: item.name,
      value: item.value,
      color: colors[index % colors.length]
    }));

    res.json({ data: pieData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.globalSearch = async (req, res) => {
  const { query } = req.query;



  // Limit regex search complexity by escaping special characters
  const sanitizedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  // Add timeout for aggregation operations
  const aggregationOptions = { maxTimeMS: 5000 }; // 5 second timeout

  try {
    // Use Promise.allSettled instead of Promise.all to prevent one failing query from breaking everything
    const resultsPromises = [
      // Audiobooks with genre - limit results
      audiobooks.aggregate([
        { $match: { name: { $regex: sanitizedQuery, $options: 'i' } } },
        { $limit: 20 }, // Limit matching documents
        {
          $lookup: {
            from: "genres",
            localField: "genreId",
            foreignField: "_id",
            as: "genre"
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              image: "$sampleFile", genre: "$genre", name: "$name", description: "$description", tags: "$tags", language: "$language"
            }
          }
        }
      ]).option(aggregationOptions),

      // Roles - simplified query with limit
      role.find({ roleName: { $regex: sanitizedQuery, $options: 'i' } })
        .limit(10)
        .select(''),

      // Subscriptions - simplified query with limit
      subscriptions.find({ name: { $regex: sanitizedQuery, $options: 'i' } })
        .limit(10)
        .select(''),

      // Users with roles - limit and project only needed fields
      user.aggregate([
        { $match: { firstName: { $regex: sanitizedQuery, $options: 'i' } } },
        { $limit: 20 },
        {
          $lookup: {
            from: 'roles',
            localField: 'roleId',
            foreignField: '_id',
            as: 'roleData'
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              image: "$image", email: "$email", name: "$firstName", phone: "$mobileNo", role: '$roleData', bio: "$bio", age: "$age", occupation: '$occupation', student_Verification_Status: "$studentVerificationStatus", student_Id_Image: '$studentIdImage', language: '$language', status: '$status'
            }
          }
        }
      ]).option(aggregationOptions),

      // Vouchers - limit and project needed fields
      voucher.aggregate([
        { $match: { name: { $regex: sanitizedQuery, $options: 'i' } } },
        { $limit: 10 },
        {
          $lookup: {
            from: 'coinmasters',
            localField: 'coinMasterId',
            foreignField: '_id',
            as: 'coinMaster'
          }
        },
        {
          $lookup: {
            from: 'subscriptions',
            localField: 'subScriptionSellId',
            foreignField: '_id',
            as: 'subscriptions'
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              name: "$name", description: "$description", code: "$code", discount: "$discount", subscriptions: '$subscriptions', valid_Till: "$validTill", for_Student: "$forStudent", status: '$status'
            }
          }
        }
      ]).option(aggregationOptions),

      // Genres - simple query with limit
      genre.find({ name: { $regex: sanitizedQuery, $options: 'i' } })
        .limit(10)
        .select(),

      // Cast / Crew - limit and project needed fields
      cast.aggregate([
        { $match: { name: { $regex: sanitizedQuery, $options: 'i' } } },
        { $limit: 10 },
        {
          $lookup: {
            from: "audiobooks",
            localField: "audiBookId",
            foreignField: "_id",
            as: "audiBookData"
          }
        },
        {
          $lookup: {
            from: "roles",
            localField: "roleId",
            foreignField: "_id",
            as: "roleData"
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              image: '$crewImage', audio_Book: "$audiBookData", name: "$name", role: "$roleData"
            }
          }
        }
      ]).option(aggregationOptions),

      // Reviews - limit and project needed fields
      review.aggregate([
        { $match: { review: { $regex: sanitizedQuery, $options: 'i' } } },
        { $limit: 10 },
        {
          $lookup: {
            from: 'audiobooks',
            localField: 'audioBookId',
            foreignField: '_id',
            as: 'audioBookData'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userData'
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              audio_book: '$audioBookData', user: "$userData",date:'$date', review: "$review", rating: "$rating"
            }
          }
        }
      ]).option(aggregationOptions),

      // Episodes - limit and project needed fields
      episodes.aggregate([
        { $match: { name: { $regex: sanitizedQuery, $options: 'i' } } },
        { $limit: 10 },
        {
          $lookup: {
            from: 'audiobooks',
            localField: 'audioBookId',
            foreignField: '_id',
            as: 'audioBookData'
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              name: '$name', audio_book: "$audioBookData",premium:'$premium', duration: "$duration"
            }
          }
        }
      ]).option(aggregationOptions),

      // Playlist - limit and project needed fields
      playlist.aggregate([
        { $match: { name: { $regex: sanitizedQuery, $options: 'i' } } },
        { $limit: 10 },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  user: "$user",
                  name: "$name"
                }
              ]
            }
          }
        }
      ]).option(aggregationOptions),

      // Home Labels - simple query with limit
      homeLabel.find({ labelName: { $regex: sanitizedQuery, $options: 'i' } })
        .limit(10)
        .select(),
    ];

    const results = await Promise.allSettled(resultsPromises);

    // Process results, including handling any failed queries
    const [
      audiobookResult,
      roleResult,
      subscriptionsResult,
      userResult,
      voucherResult,
      genreResult,
      castResult,
      reviewResult,
      episodesResult,
      playlistResult,
      homeLabelResult
    ] = results;

    // Format and structure the response
    const formattedResults = {
      audio_books: audiobookResult.status === 'fulfilled' ? audiobookResult.value : [],
      roles: roleResult.status === 'fulfilled' ? roleResult.value : [],
      subscriptions: subscriptionsResult.status === 'fulfilled' ? subscriptionsResult.value : [],
      users: userResult.status === 'fulfilled' ? userResult.value : [],
      vouchers: voucherResult.status === 'fulfilled' ? voucherResult.value : [],
      genres: genreResult.status === 'fulfilled' ? genreResult.value : [],
      cast: castResult.status === 'fulfilled' ? castResult.value : [],
      reviews: reviewResult.status === 'fulfilled' ? reviewResult.value : [],
      episodes: episodesResult.status === 'fulfilled' ? episodesResult.value : [],
      playlists: playlistResult.status === 'fulfilled' ? playlistResult.value : [],
      home_Labels: homeLabelResult.status === 'fulfilled' ? homeLabelResult.value : [],
    };

    // Optional: Count total results
    const totalResults = Object.values(formattedResults).reduce(
      (sum, arr) => sum + arr.length, 0
    );

    return res.status(200).json({
      success: true,
      totalResults,
      data: formattedResults
    });

  } catch (error) {
    console.error("Search aggregation failed:", error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during search',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
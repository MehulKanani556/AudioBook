const mongoose = require('mongoose');
const user = require('../models/userModels');
const audiobooks = require('../models/audioBookModels');
const role = require('../models/roleModels');
const subscriptions = require('../models/subScriptionModels');
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

    res.json({data : pieData});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.globalSearch = async (req, res) => {
  const { query } = req.query;
  try {
      const results = await Promise.all([audiobooks.find({ $or: [{ name: { $regex: query, $options: 'i' } },] }).select(''),
      role.find({ $or: [{ roleName: { $regex: query, $options: 'i' } },] }).select(''),
      subscriptions.find({ $or: [{ name: { $regex: query, $options: 'i' } },] }).select(''),
    ]);
      const filteredResults = {
          audiobooks: results[0].length ? results[0] : [],
          role: results[0].length ? results[1] : [],
          subscriptions: results[0].length ? results[2] : [], 
      };

      return res.status(200).json({ status: 200, filteredResults });

  } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, message: error.message });
  }
};
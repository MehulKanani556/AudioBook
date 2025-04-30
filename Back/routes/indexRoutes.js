const express = require('express');
const { getAllUsers, getUserById, updateUserById, deleteUserById, createUser } = require('../controller/userController');
const { createRole, getAllRoles, getRolesById, updateRoleById, deleteRoleById } = require('../controller/roleController');
const { createSubScription, getAllSubScription, getSubScriptionById, updateSubScriptionById, deleteSubScriptionById } = require('../controller/subscriptionController');
const { createCoinLabel, getAllCoinLabel, getCoinLabelById, updateCoinLabelById, deleteCoinLabelById } = require('../controller/coinLabelController');
const { createCoinMaster, getAllCoinMaster, getCoinMasterById, updateCoinMasterById, deleteCoinMasterById } = require('../controller/coinMasterContoller');
const upload = require('../helper/imageUplode');
const { createSubScriptionSell, getAllSubScriptionSell, getSubScriptionSellById, updateSubScriptionSellById, deleteSubScriptionSellById } = require('../controller/subScriptionSellController');
const { createCoinScriptionSell, getAllCoinScriptionSell, getCoinScriptionSellById, createcoinSubScriptionSell, getAllcoinSubScriptionSell, getcoinSubScriptionSellById, updateCoinSubScriptionSellById, deletecoinSubScriptionSellById } = require('../controller/coinSellController');
const { createVoucher, getAllVoucher, getVoucherById, updateVoucherById, deleteVoucherById } = require('../controller/voucherController');
const { createVoucherUsed, getAllVoucherUsed, getVoucherUsedById, updateVoucherUsedById, deleteVoucherUsedById } = require('../controller/voucherUsedController');
const { createGenre, getAllGenre, getGenreById, updateGenreById, deleteGenreById } = require('../controller/genreController');
const { createAudiobook, getAllAudiobook, getAudiobookById, updateAudiobookById, deleteAudiobookById } = require('../controller/audioBookController');
const { createCrew, getAllCrew, getCrewById, updateCrewById, deleteCrewById } = require('../controller/crewController');
const { createReview, getAllReview, getReviewById, updateReviewById, deleteReviewById } = require('../controller/reviewController');
const { createEpisodes, getAllEpisodes, getEpisodesById, updateEpisodesById, deleteEpisodesById } = require('../controller/episodesController');
const { createUnlockEpisodes, getAllUnlockEpisodes, getUnlockEpisodesById, updateUnlockEpisodesById, deleteUnlockEpisodesById } = require('../controller/unlockEpisodesController');
const { createEpisodeState, getAllEpisodeState, getEpisodeStateById, updateEpisodeStateById, deleteEpisodeStateById } = require('../controller/episodeStateController');
const { createPlayList, getAllPlayList, getPlayListById, updatePlayListById, deletePlayListById, getMyPlayList } = require('../controller/playListController');
const { createPlayListSong, getAllPlayListSong, getPlayListSongById, updatePlayListSongById, deletePlayListSongById } = require('../controller/playListSongController');
const { createHomeCorousel, getAllHomeCorousel, getHomeCorouselById, updateHomeCorouselById, deleteHomeCorouselById } = require('../controller/homeCorouselController');
const { createHomeLabel, getAllHomeLabel, getHomeLabelById, updateHomeLabelById, deleteHomeLabelById } = require('../controller/homelabelController');
const { createHomeLabelJoin, getAllHomeLabelJoin, getHomeLabelJoinById, updateHomeLabelJoinById, deleteHomeLabelJoinById } = require('../controller/homeLabelJoinController');
const { adminLogin, userLogin, verifyOtp, forgotPassword, emailOtpVerify, resedMobileOtp, changePassword, updatePassword } = require('../auth/userlogin');
const { DashboardList, UserChart, CategoryChart, globalSearch } = require('../controller/dashboardController');
const indexRoutes = express.Router();

// auth Routes 

indexRoutes.post('/adminLogin', adminLogin)
indexRoutes.post('/userLogin', userLogin)
indexRoutes.post('/resedMobileOtp', resedMobileOtp)
indexRoutes.post('/verifyOtp', verifyOtp)
indexRoutes.post('/forgotPassword', forgotPassword)
indexRoutes.post('/emailOtpVerify', emailOtpVerify)
indexRoutes.put('/changePassword/:id', changePassword)
indexRoutes.put('/updatePassword/:id', updatePassword)

// User Routes 

indexRoutes.post('/createAdmin', upload.single('image'), createUser)
indexRoutes.get('/getAllUsers', getAllUsers)
indexRoutes.get('/getUser/:id', getUserById)
indexRoutes.put('/updateUser/:id', upload.single('image'), updateUserById)
indexRoutes.delete('/deleteUser/:id', deleteUserById)

// Role Routes

indexRoutes.post('/createRole', createRole)
indexRoutes.get('/getAllRoles', getAllRoles)
indexRoutes.get('/getRoles/:id', getRolesById)
indexRoutes.put('/updateRole/:id', updateRoleById)
indexRoutes.delete('/deleteRole/:id', deleteRoleById)

// SubScription Routes

indexRoutes.post('/createSubScription', createSubScription)
indexRoutes.get('/allSubScription', getAllSubScription)
indexRoutes.get('/getSubScription/:id', getSubScriptionById)
indexRoutes.put('/updateSubScription/:id', updateSubScriptionById)
indexRoutes.delete('/deleteSubScription/:id', deleteSubScriptionById)

// CoinLabel Routes

indexRoutes.post('/createCoinLabel', createCoinLabel)
indexRoutes.get('/allCoinLabel', getAllCoinLabel)
indexRoutes.get('/getCoinLabel/:id', getCoinLabelById)
indexRoutes.put('/updateCoinLabel/:id', updateCoinLabelById)
indexRoutes.delete('/deleteCoinLabel/:id', deleteCoinLabelById)

// CoinMaster Routes

indexRoutes.post('/createCoinMaster', createCoinMaster)
indexRoutes.get('/getAllCoinMaster', getAllCoinMaster)
indexRoutes.get('/getCoinMaster/:id', getCoinMasterById)
indexRoutes.put('/updateCoinMaster/:id', updateCoinMasterById)
indexRoutes.delete('/deleteCoinMaster/:id', deleteCoinMasterById)

// SubScriptionSell Routes

indexRoutes.post('/createSubScriptionSell', createSubScriptionSell)
indexRoutes.get('/getAllSubScriptionSell', getAllSubScriptionSell)
indexRoutes.get('/getSubScriptionSell/:id', getSubScriptionSellById)
indexRoutes.put('/updateSubScriptionSell/:id', updateSubScriptionSellById)
indexRoutes.delete('/deleteSubScriptionSell/:id', deleteSubScriptionSellById)

// CoinScriptionSell Routes

indexRoutes.post('/createCoinScriptionSell', createcoinSubScriptionSell)
indexRoutes.get('/getAllCoinScriptionSell', getAllcoinSubScriptionSell)
indexRoutes.get('/getCoinScriptionSell/:id', getcoinSubScriptionSellById)
indexRoutes.put('/updateCoinSubScriptionSell/:id', updateCoinSubScriptionSellById)
indexRoutes.delete('/deletecoinSubScriptionSell/:id', deletecoinSubScriptionSellById)

// Voucher Routes

indexRoutes.post('/createVoucher', createVoucher)
indexRoutes.get('/getAllVoucher', getAllVoucher)
indexRoutes.get('/getVoucher/:id', getVoucherById)
indexRoutes.put('/updateVoucher/:id', updateVoucherById)
indexRoutes.delete('/deleteVoucher/:id', deleteVoucherById)

// VoucherUsed Routes

indexRoutes.post('/createVoucherUsed', createVoucherUsed)
indexRoutes.get('/getAllVoucherUsed', getAllVoucherUsed)
indexRoutes.get('/getVoucherUsed/:id', getVoucherUsedById)
indexRoutes.put('/updateVoucherUsed/:id', updateVoucherUsedById)
indexRoutes.delete('/deleteVoucherUsed/:id', deleteVoucherUsedById)

// Genre Routes

indexRoutes.post('/createGenre', upload.single('generImage'), createGenre)
indexRoutes.get('/getAllGenre', getAllGenre)
indexRoutes.get('/getGenre/:id', getGenreById)
indexRoutes.put('/updateGenre/:id', upload.single('generImage'), updateGenreById)
indexRoutes.delete('/deleteGenre/:id', deleteGenreById)

// AudioBook Routes

indexRoutes.post('/createAudiobook', upload.single('sampleFile'), createAudiobook)
indexRoutes.get('/getAllAudiobook', getAllAudiobook)
indexRoutes.get('/getAudiobook/:id', getAudiobookById)
indexRoutes.put('/updateAudiobook/:id', upload.single('sampleFile'), updateAudiobookById)
indexRoutes.delete('/deleteAudiobook/:id', deleteAudiobookById)

// Crew Routes

indexRoutes.post('/createCrew', upload.single('crewImage'), createCrew)
indexRoutes.get('/getAllCrew', getAllCrew)
indexRoutes.get('/getCrew/:id', getCrewById)
indexRoutes.put('/updateCrew/:id', upload.single('crewImage'), updateCrewById)
indexRoutes.delete('/deleteCrew/:id', deleteCrewById)

// Review Routes

indexRoutes.post('/createReview', createReview)
indexRoutes.get('/getAllReview', getAllReview)
indexRoutes.get('/getReview/:id', getReviewById)
indexRoutes.put('/updateReview/:id', updateReviewById)
indexRoutes.delete('/deleteReview/:id', deleteReviewById)

// Episodes Routes

indexRoutes.post('/createEpisodes', upload.single('audioFile'), createEpisodes)
indexRoutes.get('/getAllEpisodes', getAllEpisodes)
indexRoutes.get('/getEpisodes/:id', getEpisodesById)
indexRoutes.put('/updateEpisodes/:id', upload.single('audioFile'), updateEpisodesById)
indexRoutes.delete('/deleteEpisode/:id', deleteEpisodesById)

// UnlockEpisodes Routes

indexRoutes.post('/createUnlockEpisodes', createUnlockEpisodes)
indexRoutes.get('/getAllUnlockEpisodes', getAllUnlockEpisodes)
indexRoutes.get('/getUnlockEpisodes/:id', getUnlockEpisodesById)
indexRoutes.put('/updateUnlockEpisode/:id', updateUnlockEpisodesById)
indexRoutes.delete('/deleteUnlockEpisodes/:id', deleteUnlockEpisodesById)

// EpisodeState Routes

indexRoutes.post('/createEpisodeState', createEpisodeState)
indexRoutes.get('/getAllEpisodeState', getAllEpisodeState)
indexRoutes.get('/getEpisodeState/:id', getEpisodeStateById)
indexRoutes.put('/updateEpisodeState/:id', updateEpisodeStateById)
indexRoutes.delete('/deleteEpisodeState/:id', deleteEpisodeStateById)

// PlayList Master Routes

indexRoutes.post('/createPlayList', createPlayList)
indexRoutes.get('/getAllPlayList', getAllPlayList)
indexRoutes.get('/getPlayList/:id', getPlayListById)
indexRoutes.put('/updatePlayList/:id', updatePlayListById)
indexRoutes.delete('/deletePlayList/:id', deletePlayListById)
indexRoutes.get('/getMyPlayList/:id', getMyPlayList)

// PlayListSong Routes

indexRoutes.post('/createPlayListSong', createPlayListSong)
indexRoutes.get('/getAllPlayListSong', getAllPlayListSong)
indexRoutes.get('/getPlayListSong/:id', getPlayListSongById)
indexRoutes.put('/updatePlayListSong/:id', updatePlayListSongById)
indexRoutes.delete('/deletePlayListSong/:id', deletePlayListSongById)

// HomeCorousel Routes

indexRoutes.post('/createHomeCorousel', upload.single('homeCorouselImage'), createHomeCorousel)
indexRoutes.get('/getAllHomeCorousel', getAllHomeCorousel)
indexRoutes.get('/getHomeCorousel/:id', getHomeCorouselById)
indexRoutes.put('/updateHomeCorousel/:id', upload.single('homeCorouselImage'), updateHomeCorouselById)
indexRoutes.delete('/deleteHomeCorousel/:id', deleteHomeCorouselById)

// HomeLabel Routes

indexRoutes.post('/createHomeLabel', createHomeLabel)
indexRoutes.get('/getAllHomeLabel', getAllHomeLabel)
indexRoutes.get('/getHomeLabel/:id', getHomeLabelById)
indexRoutes.put('/updateHomeLabel/:id', updateHomeLabelById)
indexRoutes.delete('/deleteHomeLabel/:id', deleteHomeLabelById)

// HomeLabelJoin Rouute

indexRoutes.post('/createHomeLabelJoin', createHomeLabelJoin)
indexRoutes.get('/getAllHomeLabelJoin', getAllHomeLabelJoin)
indexRoutes.get('/getHomeLabelJoin/:id', getHomeLabelJoinById)
indexRoutes.put('/updateHomeLabelJoin/:id', updateHomeLabelJoinById)
indexRoutes.delete('/deleteHomeLabelJoin/:id', deleteHomeLabelJoinById)


// Dashboard Routes
indexRoutes.get('/dashboardList',DashboardList);
indexRoutes.get('/dashboardUserChart',UserChart);
indexRoutes.get('/dashboardCatChart',CategoryChart);
indexRoutes.post('/globalSearch',globalSearch)
module.exports = indexRoutes;

import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/LoginSlices";
import profileReducer from "./Slices/EditProfileSlice";
import CoinLabelSlice from "./Slices/CoinLabelSlice";
import roleReducer from "./Slices/RoleSlice";
import subscriptionReducer from "./Slices/SubscriptionSlice";
import SubscriptionSellSlice from './Slices/SubscriptionSellSlice'
import userMasterReducer from './Slices/UserMasterSlice'
import coinSellReducer from './Slices/CoinSellSlices'
import voucherReducer from './Slices/VoucherSlice'
import coinMasterReducer from "./Slices/CoinMasterSlice"
import genreReducer from "./Slices/GenreSlice"
import voucherUsedReducer from "./Slices/VoucherUsedSlice";
import audioBookReducer from './Slices/AudioBookSlice'
import reviewReducer from "./Slices/reviewSlice";
import episodeReducer from './Slices/EpisodesSlice'
import homeLabelReducer from './Slices/HomeLabelsSlice'

import homeCarouselReducer from './Slices/HomeCarouselSlice';
import homeLebelJoinReducer from './Slices/HomeLabelJoinSlice'

import CastCrewReducer from "./Slices/CastCrew";
import PlaylistMaster from "./Slices/PlaylistMasterSlice";
import firstDashboardReducer from "./Slices/DashboardSlice"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    editProfile: profileReducer,
    role: roleReducer,
    subscription: subscriptionReducer,
    coinLabel: CoinLabelSlice,
    subSell: SubscriptionSellSlice,
    coinMaster: coinMasterReducer,
    userMaster: userMasterReducer,
    coinSell: coinSellReducer,
    genre:genreReducer,
    voucher : voucherReducer,
    voucherUsed: voucherUsedReducer,
    audioBook: audioBookReducer,
    review: reviewReducer,
    episode:episodeReducer,
    homeLabel:homeLabelReducer,
    castCrew: CastCrewReducer,
    playlist: PlaylistMaster,
    homeCarousel: homeCarouselReducer,
    homeLabelJoin: homeLebelJoinReducer,
    firstDashboardData:firstDashboardReducer
  },
});

import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/LoginSlices";
import profileReducer from "./Slices/EditProfileSlice";
import CoinLabelSlice from "./Slices/CoinLabelSlice";
import roleReducer from "./Slices/RoleSlice"
import subscriptionReducer from "./Slices/SubscriptionSlice";
import SubscriptionSellSlice from './Slices/SubscriptionSellSlice'
import userMasterReducer from './Slices/UserMasterSlice'

import coinMasterReducer from "./Slices/CoinMasterSlice"
export const store = configureStore({
  reducer: {
    login: loginReducer,
    editProfile: profileReducer,
    role: roleReducer,
    subscription: subscriptionReducer,
    coinLabel:CoinLabelSlice,
    subSell:SubscriptionSellSlice,
    coinMaster: coinMasterReducer,
    userMaster: userMasterReducer,
  },
});

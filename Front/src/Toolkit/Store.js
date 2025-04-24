import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/LoginSlices";
import profileReducer from "./Slices/EditProfileSlice";
import subscriptionReducer from "./Slices/SubscriptionSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    editProfile: profileReducer,
    subscription: subscriptionReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/LoginSlices";
import profileReducer from "./Slices/EditProfileSlice";
import CoinLabelSlice from "./Slices/CoinLabelSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    editProfile: profileReducer,
    coinLabel:CoinLabelSlice
  },
});
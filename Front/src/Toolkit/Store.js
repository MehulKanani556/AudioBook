import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/LoginSlices";
import profileReducer from "./Slices/EditProfileSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    editProfile: profileReducer,
  },
});
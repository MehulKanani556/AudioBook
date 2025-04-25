import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/LoginSlices";
import profileReducer from "./Slices/EditProfileSlice";
import CoinLabelSlice from "./Slices/CoinLabelSlice";
import roleReducer from "./Slices/RoleSlice"
export const store = configureStore({
  reducer: {
    login: loginReducer,
    editProfile: profileReducer,
    role: roleReducer,
  },
});
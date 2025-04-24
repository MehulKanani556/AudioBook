import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/LoginSlices";
import profileReducer from "./Slices/EditProfileSlice";
import roleReducer from "./Slices/RoleSlice"
export const store = configureStore({
  reducer: {
    login: loginReducer,
    editProfile: profileReducer,
    role: roleReducer,
  },
});
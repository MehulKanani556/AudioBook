import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/LoginSlices";
import profileReducer from "./Slices/EditProfileSlice";
import roleReducer from "./Slices/RoleSlice"
import coinMasterReducer from "./Slices/CoinMasterSlice"
export const store = configureStore({
  reducer: {
    login: loginReducer,
    editProfile: profileReducer,
    role: roleReducer,
    coinMaster: coinMasterReducer,
  },
});
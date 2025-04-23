import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './Slices/LoginSlices'

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
})
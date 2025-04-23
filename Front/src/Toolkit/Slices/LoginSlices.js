import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const LoginSlices = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   
  },
})

export const {  } = LoginSlices.actions

export default LoginSlices.reducer
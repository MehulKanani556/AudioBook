import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const LoginAdmin = createAsyncThunk(
  "LoginAdmin",
  async (loginData, { rejectWithValue }) => {
    try {
      alert()
      const response = await axios.post(
        `${API_URL}/adminLogin`,
        {
          email:loginData.email,
          password:loginData.password
        }
      );
      localStorage.setItem("Token" , response?.data?.token)
      return response.data.data
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

const loginAdminSlice = createSlice({
  name: "login",
  initialState: {
    login: [],
    loading: false,
    success: false,
    message: "",
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAdmin.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(LoginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.login = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(LoginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      });
  },
});

export default loginAdminSlice.reducer;

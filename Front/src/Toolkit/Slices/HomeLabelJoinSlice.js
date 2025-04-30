import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const allHomeLabelJoin = createAsyncThunk(
  "homeLabelJoin",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/getAllHomeLabelJoin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error.status === 404) {
        console.error("Get Coin Label Error:", error.status);
        var data = [];
        return data;
      }
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

const HomeLabelJoinSlice = createSlice({
  name: "login",
  initialState: {
    homeLabelJoin: [],
    loading: false,
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // all home carousel
      .addCase(allHomeLabelJoin.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(allHomeLabelJoin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.homeLabelJoin = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(allHomeLabelJoin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      });
  },
});

export default HomeLabelJoinSlice.reducer;

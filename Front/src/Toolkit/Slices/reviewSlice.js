import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const getReview = createAsyncThunk(
  "getVoucher",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getAllReview`);
      console.log("Resposnse", response.data.data);
      return response.data.data
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      if (error.status === 404) {
        console.error("Get Coin Label Error:", error.status);
        var data = [];
        return data;
      }
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

const ReviewSlice = createSlice({
  name: "Review",
  initialState: {
    review: [],
    singleVoucher: [],
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getReview.fulfilled, (state, action) => {
        state.review = action.payload;
        console.log('data',state.vouchers)
      })
  },
});

export default ReviewSlice.reducer;

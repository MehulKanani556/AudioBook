import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const getAllVoucherUsedData = createAsyncThunk(
  "getVoucherUsed",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/getAllVoucherUsed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
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

const VoucherUsedSlice = createSlice({
  name: "login",
  initialState: {
    voucherUsed: [],
    loading: false,
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // all voucherused
      .addCase(getAllVoucherUsedData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(getAllVoucherUsedData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.voucherUsed = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(getAllVoucherUsedData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      });
  },
});

export default VoucherUsedSlice.reducer;

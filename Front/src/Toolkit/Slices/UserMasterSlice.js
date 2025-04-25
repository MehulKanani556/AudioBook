import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const getAllUserMasterData = createAsyncThunk(
  "getUsermaster",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      //   if (error.status === 404) {
      //     console.error("Get Coin Label Error:", error.status);
      //     var data = [];
      //     return data;
      //   }
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

export const singleUserMasterData = createAsyncThunk(
  "singleUserMaster",
  async (userMasterId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/getUser/${userMasterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

const userMasterSlice = createSlice({
  name: "login",
  initialState: {
    allUserMaster: [],
    singleUserMaster: [],
    loading: false,
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // all subscription
      .addCase(getAllUserMasterData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(getAllUserMasterData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.allUserMaster = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(getAllUserMasterData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      })

      //   single usermaster
      .addCase(singleUserMasterData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(singleUserMasterData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.singleUserMaster = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(singleUserMasterData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      });
  },
});

export default userMasterSlice.reducer;

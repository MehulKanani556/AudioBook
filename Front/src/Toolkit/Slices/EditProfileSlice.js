import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const editProfileAdmin = createAsyncThunk(
  "EditProfile-Admin",
  async (_, { rejectWithValue }) => {
    const editProfileId = localStorage.getItem("adminId");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${API_URL}/updateUser/${editProfileId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Resposnse", editProfileId);
      return response.data.data;
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

const EProfileSlice = createSlice({
  name: "login",
  initialState: {
    editProfile: [],
    loading: false,
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editProfileAdmin.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(editProfileAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.editProfile = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(editProfileAdmin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      });
  },
});

export default EProfileSlice.reducer;

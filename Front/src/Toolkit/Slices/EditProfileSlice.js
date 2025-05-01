import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const getSingleAdmin = createAsyncThunk(
  "getAdmin",
  async (_, { rejectWithValue }) => {
    const getAdminId = localStorage.getItem("adminId");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/getUser/${getAdminId}`, {
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

export const editProfileAdmin = createAsyncThunk(
  "EditProfile-Admin",
  async (adminUpdate, { rejectWithValue , dispatch}) => {
    const editProfileId = localStorage.getItem("adminId");
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("firstName", adminUpdate.firstName);
    formData.append("lastName", adminUpdate.lastName);
    formData.append("email", adminUpdate.email);
    formData.append("mobileNo", adminUpdate.mobileNo);

    console.log("zzzzzzzzzzzzzzzz" ,adminUpdate.image);

      formData.append("image", adminUpdate.image);

    try {
      const response = await axios.put(
        `${API_URL}/updateUser/${editProfileId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Resposnse", editProfileId);
      dispatch(getSingleAdmin())
      return response.data.data;
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

export const changePassAdmin = createAsyncThunk(
  "changePasswordAdmin",
  async (password, { rejectWithValue }) => {
    const changePassId = localStorage.getItem("adminId");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${API_URL}/updatePassword/${changePassId}`,
        {
          currentPassword: password?.oldPassword,
          newPassword: password?.newPassword,
          confirmPassword: password?.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    getAdmin: [],
    changePass: [],
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
      })

      // get single admin
      .addCase(getSingleAdmin.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(getSingleAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.getAdmin = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(getSingleAdmin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      })

      // change admin password
      .addCase(changePassAdmin.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(changePassAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.changePass = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(changePassAdmin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      });
  },
});

export default EProfileSlice.reducer;

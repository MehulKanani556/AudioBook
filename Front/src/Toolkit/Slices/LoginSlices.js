import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const LoginAdmin = createAsyncThunk(
  "LoginAdmin",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/adminLogin`,
        {
          email:loginData.email,
          password:loginData.password
        }
      );
      console.log("Resposnse" , response);
      
      localStorage.setItem("token" , response?.data?.token)
      localStorage.setItem("adminId" , response?.data?.data?._id)
      alert("SignUp SuccessFully")
      return response.data.data
      
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      alert("Login" , error.message)
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

export const ForgotPass = createAsyncThunk(
  "ForgetPass",
  async (forgetPassData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/forgotPassword`,
        {
          email:forgetPassData?.forgetPassVal
        }
      );
      localStorage.setItem("email" , forgetPassData?.forgetPassVal)
      // console.log("ForgetPass" , response?.data?.status);
      return response.data
    } catch (error) {
      console.error("ForgetPass Error:", error.message);
       alert("ForgetPass Invalid Email" , error.message)
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

export const OtpVerify = createAsyncThunk(
  "OtpVerify",
  async (otp, { rejectWithValue }) => {
    let email = localStorage.getItem("email")   
    try {
      const response = await axios.post(
        `${API_URL}/emailOtpVerify`,
        {
          email:email,
          otp:otp
        }
      );
      console.log("OtpVerify" , response);
      return response.data.data
    } catch (error) {
      console.error("OtpVerify Error:", error.message);
      alert("OtpVerify Invalid Otp" , error.message)
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

export const ResetPass = createAsyncThunk(
  "ResetPass",
  async (value, { rejectWithValue }) => {
    let adminId = localStorage.getItem("adminId")
    try {
      const response = await axios.put(
        `${API_URL}/changePassword/${adminId}`,
        {
          newPassword:value?.newPass,
          confirmPassword:value?.confirmPass
        }
      );
      console.log("ResetPass" , response);
      return response.data.data
    } catch (error) {
      console.error("ResetPass Error:", error.message);
      alert("ResetPass Does Not Match" , error.message)
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
    adminEmail:""
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
        // state.login = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(LoginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      })

      .addCase(ForgotPass.pending, (state) => {
        state.loading = true;
        state.message = "ForgetPassword Login Admin...";
      })
      .addCase(ForgotPass.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.login = action.payload;
        state.adminEmail = action.payload
        state.message = "ForgetPassword SuccessFully";
      })
      .addCase(ForgotPass.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To ForgetPassword";
      })

      .addCase(OtpVerify.pending, (state) => {
        state.loading = true;
        state.message = "OtpVerify Login Admin...";
      })
      .addCase(OtpVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.login = action.payload;
        state.message = "OtpVerify SuccessFully";
      })
      .addCase(OtpVerify.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To OtpVerify";
      })

      .addCase(ResetPass.pending, (state) => {
        state.loading = true;
        state.message = "ResetPass Login Admin...";
      })
      .addCase(ResetPass.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.login = action.payload;
        state.message = "ResetPass SuccessFully";
      })
      .addCase(ResetPass.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To ResetPass";
      });
  },
});

export default loginAdminSlice.reducer;

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
      console.log("ForgetPass" , response);
      return response.data.data
    } catch (error) {
      console.error("ForgetPass Error:", error.message);
      alert("ForgetPass" , error.message)
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
        state.message = "ForgetPassword SuccessFully";
      })
      .addCase(ForgotPass.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To ForgetPassword";
      });
  },
});

export default loginAdminSlice.reducer;

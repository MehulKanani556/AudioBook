import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";
const token = localStorage.getItem("token")

export const FirstDashData = createAsyncThunk(
  "FirstDashData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/dashboardList`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
      );
      console.log("FirstDashData" , response.data);
      return response?.data?.data
      
    } catch (error) {
      console.error("Get FirstDashData Error:", error.message);
      if(error.status === 404){
         console.error("Get FirstDashData Error:", error.status);
         let data =[];
         return data;
      }
      else{
        alert("Get FirstDashData" , error.message)
      }
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );

    }
  }
);

export const BarChartData = createAsyncThunk(
  "BarChartData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/dashboardUserChart`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
      );
      console.log("BarChartData" , response.data);
      return response?.data?.data
      
    } catch (error) {
      console.error("Get BarChartData Error:", error.message);
      if(error.status === 404){
         console.error("Get BarChartData Error:", error.status);
         let data =[];
         return data;
      }
      else{
        alert("Get BarChartData" , error.message)
      }
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );

    }
  }
);

export const PieChartData = createAsyncThunk(
  "PieChartData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/dashboardCatChart`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
      );
      console.log("PieChartData" , response.data);
      return response?.data?.data
      
    } catch (error) {
      console.error("Get PieChartData Error:", error.message);
      if(error.status === 404){
         console.error("Get PieChartData Error:", error.status);
         let data =[];
         return data;
      }
      else{
        alert("Get PieChartData" , error.message)
      }
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );

    }
  }
);


const DashboardSlice = createSlice({
  name: "DashboardSlice",
  initialState: {
    firstDashData:[],
    barData:[],
    pieData:[],
    loading: false,
    success: false,
    message: "",
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(FirstDashData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting FirstDashData..";
      })
      .addCase(FirstDashData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.firstDashData = action.payload;
        state.message = "FirstDashData Get SuccessFully";
      })
      .addCase(FirstDashData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To FirstDashData";
      })

      .addCase(BarChartData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting BarChartData..";
      })
      .addCase(BarChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.barData = action.payload;
        state.message = "BarChartData Get SuccessFully";
      })
      .addCase(BarChartData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To BarChartData";
      })

      .addCase(PieChartData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting PieChartData..";
      })
      .addCase(PieChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pieData = action.payload;
        state.message = "PieChartData Get SuccessFully";
      })
      .addCase(PieChartData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To PieChartData";
      })
  },
});

export default DashboardSlice.reducer;

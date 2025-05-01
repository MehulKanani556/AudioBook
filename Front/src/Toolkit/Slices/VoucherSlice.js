import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const getVoucher = createAsyncThunk(
  "getVoucher",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getAllVoucher`,);
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

export const addVoucher = createAsyncThunk(
  'addVoucher',
  async (voucherData, { rejectWithValue }) => {
    console.log(voucherData);
    try {
      const response = await axios.post(`${API_URL}/createVoucher`, {
        name: voucherData.name,
        description: voucherData.description,
        code: voucherData.code,
        discount: voucherData.discount,
        subScriptionSellId: voucherData.subscriptionId,
        validTill: voucherData.validTill,
        forStudent:voucherData.forStudent ,
        status: voucherData.status
      });
      console.log("Resposnse", response.data.data);
      return response.data;
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      if(error.status === 409){
        alert("Voucher already exists")
      }
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
)

export const deleteVoucher = createAsyncThunk(
  'deleteVoucher',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteVoucher/`+id);
      console.log("Resposnse", response.data.data);
      return response.data
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
)

export const UpdateVoucher = createAsyncThunk(
  "CoinMaster",
  async ({ voucherData, id }, { rejectWithValue }) => {
    console.log(voucherData);
    try {
      const response = await axios.put(`${API_URL}/updateVoucher/` + id, {
        name: voucherData.name,
        description: voucherData.description,
        code: voucherData.code,
        discount: voucherData.discount,
        subScriptionSellId: voucherData.subscriptionId,
        validTill:voucherData.validTill,
        forStudent:voucherData.forStudent,
        status: voucherData.status
      });
      console.log("Resposnse", response.data.data);
      return response.data;
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);
export const getSingleVoucher = createAsyncThunk(
  "getSingleCoinMaster",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getVoucher/` + id,);
      console.log("Resposnse", response.data.data);
      return response.data.data
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);
const CoinMasterSlice = createSlice({
  name: "CoinMaster",
  initialState: {
    vouchers: [],
    singleVoucher: [],
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getVoucher.fulfilled, (state, action) => {
        state.vouchers = action.payload;
        console.log('data',state.vouchers)
      }).addCase(getSingleVoucher.fulfilled, (state, action) => {
        state.singleVoucher = action.payload;
      })
  },
});

export default CoinMasterSlice.reducer;

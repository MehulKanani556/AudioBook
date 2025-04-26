import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const getCoinMaster = createAsyncThunk(
  "getCoinMaster",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getAllCoinMaster`,);
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

export const addCoinMaster = createAsyncThunk(
  'addCoinMaster',
  async (coinMasterData, { rejectWithValue }) => {
    console.log(coinMasterData);
    try {
      const response = await axios.post(`${API_URL}/createCoinMaster`, {
        coin: coinMasterData.coin,
        payment: coinMasterData.payment,
        freeCoins: coinMasterData.freeCoin,
        labelId: coinMasterData.labelID,
        isOneTime: coinMasterData.isoneTime,
        validTill: coinMasterData.validTill,
        status: coinMasterData.status
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
)

export const deleteCoinMaster = createAsyncThunk(
  'deleteRole',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteCoinMaster/` + id);
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

export const UpdateCoinMaster = createAsyncThunk(
  "CoinMaster",
  async ({ coinMasterData, id }, { rejectWithValue }) => {
    console.log(coinMasterData);
    try {
      const response = await axios.put(`${API_URL}/updateCoinMaster/` + id, {
        coin: coinMasterData.coin,
        payment: coinMasterData.payment,
        freeCoins: coinMasterData.freeCoin,
        labelId: coinMasterData.labelID,
        isOneTime: coinMasterData.isoneTime,
        validTill: coinMasterData.validTill,
        status: coinMasterData.status
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
export const getSingleCoinMaster = createAsyncThunk(
  "getSingleCoinMaster",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getCoinMaster/` + id,);
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
    coinMaster: [],
    singleCoinMaster: [],
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoinMaster.fulfilled, (state, action) => {
        state.coinMaster = action.payload;
        console.log('data', state.role)
      }).addCase(getSingleCoinMaster.fulfilled, (state, action) => {
        state.singleCoinMaster = action.payload;
      })
  },
});

export default CoinMasterSlice.reducer;

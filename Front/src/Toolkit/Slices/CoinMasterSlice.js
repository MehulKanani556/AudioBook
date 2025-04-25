import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const getCoinMaster = createAsyncThunk(
    "getCoinMaster",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_URL}/getAllCoinMaster`,);
        console.log("Resposnse" , response.data.data);
        return response.data.data
      } catch (error) {
        console.error("LoginAdmin Error:", error.message);
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
      }
    }
  );

export const addCoinMaster=createAsyncThunk(
    'addCoinMaster',
    async(coinMasterData,{rejectWithValue})=>{
        console.log(coinMasterData);
    //     try {
    //     const response = await axios.post(`${API_URL}/createCoinMaster`,{
            
    //     });
    //     console.log("Resposnse" , response.data.data);
        
    //     return response.data
    //   } catch (error) {
    //     console.error("LoginAdmin Error:", error.message);
    //     return rejectWithValue(
    //       error.response?.data || { message: "Unexpected error occurred" }
    //     );
    //   }
    }
)

export const deleteRole = createAsyncThunk(
    'deleteRole',
    async(id,{rejectWithValue})=>{
        try {
            const response = await axios.delete(`${API_URL}/deleteRole/`+id);
            console.log("Resposnse" , response.data.data);
            
            return response.data
          } catch (error) {
            console.error("LoginAdmin Error:", error.message);
            return rejectWithValue(
              error.response?.data || { message: "Unexpected error occurred" }
            );
          } 
    }
)

export const updateRole = createAsyncThunk(
    "updateRole",
    async ({role,id}, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${API_URL}/updateRole/`+id,{
            roleName:role
        });
        console.log("Resposnse" , response.data.data);
        
        return response.data
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
    coinMaster:[],
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoinMaster.fulfilled, (state,action) => {
        state.coinMaster = action.payload;
        console.log('data',state.role)
      })
      },
});

export default CoinMasterSlice.reducer;

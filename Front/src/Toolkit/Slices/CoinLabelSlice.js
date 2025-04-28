import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";
const token = localStorage.getItem("token")

export const CoinLabelData = createAsyncThunk(
  "CoinLabelData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/allCoinLabel`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
      );
      // console.log("CoinLabelData" , response.data.status);
      return response?.data?.data
      
    } catch (error) {
      console.error("Get Coin Label Error:", error.message);
      if(error.status === 404){
         console.error("Get Coin Label Error:", error.status);
         let data =[];
         return data;
      }
      else{
        alert("Get Coin Label" , error.message)
      }
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );

    }
  }
);

export const CreateCoinLabel = createAsyncThunk(
    "CreateCoinLabel",
    async (label, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${API_URL}/createCoinLabel`,
          {
            labelName:label?.labelNameVal
          },
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("CoinLabelData" , response);
        return response?.data
      } catch (error) {
        console.error("Create Coin Label Error:", error.message);
        // alert("Create Coin Label" , error.message)
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
      }
    }
  );

  export const SingleCoinLabel = createAsyncThunk(
    "SingleCoinLabel",
    async (labelId, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${API_URL}/getCoinLabel/${labelId}`,
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("SingleLabelData" , response);
        return response?.data?.data
      } catch (error) {
        console.error("Single Coin Label Error:", error.message);
        alert("Single Coin Label" , error.message)
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
      }
    }
  );

  export const EditCoinLabel = createAsyncThunk(
    "EditCoinLabel",
    async ({values , EditId}, { rejectWithValue }) => {
      
      try {
        const response = await axios.put(
          `${API_URL}/updateCoinLabel/${EditId}`,
          {
            labelName:values?.editLabelName
          },
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("EditCoinLabel" , response);
        return response?.data?.data
      } catch (error) {
        console.error("Edit Coin Label Error:", error.message);
        alert("Edit Coin Label" , error.message)
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
      }
    }
  );

  export const DeleteCoinLabel = createAsyncThunk(
    "DeleteCoinLabel",
    async (EditId, { rejectWithValue }) => {
      console.log("BNBNBNBNB" , EditId);
      
      try {
        const response = await axios.delete(
          `${API_URL}/deleteCoinLabel/${EditId}`,
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("DeleteCoinLabel" , response);
        return response?.data?.data
      } catch (error) {
        console.error("Delete Coin Label Error:", error.message);
        alert("Delete Coin Label" , error.message)
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
      }
    }
  );


const CoinLabelSlice = createSlice({
  name: "coinlabel",
  initialState: {
    coinLaData:[],
    loading: false,
    success: false,
    message: "",
    singleData:{}
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(CoinLabelData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Coin Label..";
      })
      .addCase(CoinLabelData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.coinLaData = action.payload;
        state.message = "Coin Label Get SuccessFully";
      })
      .addCase(CoinLabelData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Coin Label";
      })

      .addCase(CreateCoinLabel.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Create Coin Label..";
      })
      .addCase(CreateCoinLabel.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.coinLaData = action.payload;
        state.message = "Create Coin Label  SuccessFully";
      })
      .addCase(CreateCoinLabel.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Create Coin Label";
      })

      .addCase(SingleCoinLabel.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Sigle Coin Label..";
      })
      .addCase(SingleCoinLabel.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.singleData = action.payload;
        state.message = "Sigle Coin Label  SuccessFully";
      })
      .addCase(SingleCoinLabel.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Sigle Coin Label";
      })

      .addCase(EditCoinLabel.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Sigle Coin Label..";
      })
      .addCase(EditCoinLabel.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.singleData = action.payload;
        state.message = "Sigle Coin Label  SuccessFully";
      })
      .addCase(EditCoinLabel.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Sigle Coin Label";
      })

      .addCase(DeleteCoinLabel.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Delete Coin Label..";
      })
      .addCase(DeleteCoinLabel.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.singleData = action.payload;
        state.message = "Delete Coin Label  SuccessFully";
      })
      .addCase(DeleteCoinLabel.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Delete Coin Label";
      })

  },
});

export default CoinLabelSlice.reducer;

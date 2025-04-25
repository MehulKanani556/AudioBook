import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";
const token = localStorage.getItem("token")

export const SubSellData = createAsyncThunk(
  "SubSellData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/getAllSubScriptionSell`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
      );
      // console.log("SubSellData" , response);
      return response?.data?.data
      
    } catch (error) {
      console.error("Get SubSell Error:", error.message);
       if(error.status === 404){
         console.error("Get Coin Label Error:", error.status);
         let data =[];
         return data;
      }
      else{
       alert("Get SubSell" , error.message)
      }
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

// export const CreateCoinLabel = createAsyncThunk(
//     "CreateCoinLabel",
//     async (label, { rejectWithValue }) => {
//       try {
//         const response = await axios.post(
//           `${API_URL}/createCoinLabel`,
//           {
//             labelName:label?.labelNameVal
//           },
//           {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("CoinLabelData" , response);
//         return response?.data?.data
//       } catch (error) {
//         console.error("Create Coin Label Error:", error.message);
//         alert("Create Coin Label" , error.message)
//         return rejectWithValue(
//           error.response?.data || { message: "Unexpected error occurred" }
//         );
//       }
//     }
//   );

//   export const SingleCoinLabel = createAsyncThunk(
//     "SingleCoinLabel",
//     async (labelId, { rejectWithValue }) => {
//       try {
//         const response = await axios.get(
//           `${API_URL}/getCoinLabel/${labelId}`,
//           {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         // console.log("SingleLabelData" , response);
//         return response?.data?.data
//       } catch (error) {
//         console.error("Single Coin Label Error:", error.message);
//         alert("Single Coin Label" , error.message)
//         return rejectWithValue(
//           error.response?.data || { message: "Unexpected error occurred" }
//         );
//       }
//     }
//   );

//   export const EditCoinLabel = createAsyncThunk(
//     "EditCoinLabel",
//     async ({values , EditId}, { rejectWithValue }) => {
      
//       try {
//         const response = await axios.put(
//           `${API_URL}/updateCoinLabel/${EditId}`,
//           {
//             labelName:values?.editLabelName
//           },
//           {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("EditCoinLabel" , response);
//         return response?.data?.data
//       } catch (error) {
//         console.error("Edit Coin Label Error:", error.message);
//         alert("Edit Coin Label" , error.message)
//         return rejectWithValue(
//           error.response?.data || { message: "Unexpected error occurred" }
//         );
//       }
//     }
//   );

//   export const DeleteCoinLabel = createAsyncThunk(
//     "DeleteCoinLabel",
//     async (EditId, { rejectWithValue }) => {
//       console.log("BNBNBNBNB" , EditId);
      
//       try {
//         const response = await axios.delete(
//           `${API_URL}/deleteCoinLabel/${EditId}`,
//           {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("DeleteCoinLabel" , response);
//         return response?.data?.data
//       } catch (error) {
//         console.error("Delete Coin Label Error:", error.message);
//         alert("Delete Coin Label" , error.message)
//         return rejectWithValue(
//           error.response?.data || { message: "Unexpected error occurred" }
//         );
//       }
//     }
//   );


const subscriptionSellSlice = createSlice({
  name: "SubSell",
  initialState: {
    subSellDat:[],
    loading: false,
    success: false,
    message: "",
    adminEmail:""
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(SubSellData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting SubSell...";
      })
      .addCase(SubSellData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subSellDat = action.payload;
        state.message = "SubSell SuccessFully";
      })
      .addCase(SubSellData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To SubSell";
      })
  },
});

export default subscriptionSellSlice.reducer;

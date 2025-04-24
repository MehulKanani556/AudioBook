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
    //   console.log("CoinLabelData" , response);
      return response?.data?.data
      
    } catch (error) {
      console.error("Get Coin Label Error:", error.message);
      alert("Get Coin Label" , error.message)
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
        return response?.data?.data
      } catch (error) {
        console.error("Create Coin Label Error:", error.message);
        alert("Create Coin Label" , error.message)
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
        console.log("SingleLabelData" , response);
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
    async (label, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `${API_URL}/updateCoinLabel`,
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
        return response?.data?.data
      } catch (error) {
        console.error("Create Coin Label Error:", error.message);
        alert("Create Coin Label" , error.message)
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
      }
    }
  );


// export const hi = createAsyncThunk(
//     "LoginAdmin",
//     async (loginData, { rejectWithValue }) => {
//       try {
//         const response = await axios.post(
//           `${API_URL}/adminLogin`,
//           {
//             email:loginData.email,
//             password:loginData.password
//           }
//         );
//         console.log("Resposnse" , response);
        
//         localStorage.setItem("token" , response?.data?.token)
//         localStorage.setItem("adminId" , response?.data?.data?._id)
//         alert("SignUp SuccessFully")
//         return response.data.data
        
//       } catch (error) {
//         console.error("LoginAdmin Error:", error.message);
//         alert("Login" , error.message)
//         return rejectWithValue(
//           error.response?.data || { message: "Unexpected error occurred" }
//         );
//       }
//     }
//   );



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
        state.coinLaData = action.payload;
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

  },
});

export default CoinLabelSlice.reducer;

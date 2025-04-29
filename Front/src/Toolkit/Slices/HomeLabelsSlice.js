import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";
const token = localStorage.getItem("token")

export const HomeLabelData = createAsyncThunk(
  "HomeLabelData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/getAllHomeLabel`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
      );
    //   console.log("HomeLabelData" , response.data.data);
      return response?.data?.data
      
    } catch (error) {
      console.error("Get HomeLabel Data Error:", error.message);
      if(error.status === 404){
         console.error("Get HomeLabel Error:", error.status);
         let data =[];
         return data;
      }
      else{
        alert("Get HomeLabel" , error.message)
      }
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );

    }
  }
);

export const CreateHomeLabel = createAsyncThunk(
    "CreateHomeLabel",
    async (values, { rejectWithValue , dispatch }) => {

      try {
        const response = await axios.post(
          `${API_URL}/createHomeLabel`,
          {
             labelName: values?.labelName
          },
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                },
          }
        );
        console.log("CreateHomeLabel" , response.data.data);
        dispatch(HomeLabelData())
        return response?.data?.data
        
      } catch (error) {
        console.error("Create HomeLabel Error:", error.message);
        if(error.status === 404){
           console.error("Create HomeLabel Error:", error.status);
           let data =[];
           return data;
        }
        else{
          alert("Get Create HomeLabel" , error.message)
        }
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
  
      }
    }
);





const HomeLabelSlice = createSlice({
  name: "HomeLabelSlice",
  initialState: {
    homeLabelData:[],
    loading: false,
    success: false,
    message: "",
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(HomeLabelData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Genre..";
      })
      .addCase(HomeLabelData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.homeLabelData = action.payload;
        state.message = "HomeLabel Get SuccessFully";
      })
      .addCase(HomeLabelData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To HomeLabel";
      })

      .addCase(CreateHomeLabel.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Create HomeLabel..";
      })
      .addCase(CreateHomeLabel.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.homeLabelData = action.payload;
        state.message = "Create HomeLabel SuccessFully";
      })
      .addCase(CreateHomeLabel.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Create HomeLabel";
      })


  },
});

export default HomeLabelSlice.reducer;

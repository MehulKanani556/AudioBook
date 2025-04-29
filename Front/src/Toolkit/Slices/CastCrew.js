import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const getCastCrew = createAsyncThunk(
    "getCastCrew",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_URL}/getAllCrew`); 
        console.log("Resposnse" , response.data.data);
        if(response.data.success){
          return response.data.data ;
        }
        else {
          return[];
        }
      } catch (error) {
        console.error("LoginAdmin Error:", error.message);
        if(error.status === 404){
          console.error("Get Coin Label Error:", error.status);
          var data =[];
          return data;
          }
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
      }
    }
  );

export const addCastCrewFunc = createAsyncThunk(
    'addCastCrew',
    async(castCrewData,{rejectWithValue})=>{
        console.log('data data',castCrewData)
        const formData = new FormData();
        formData.append("audiBookId", castCrewData.audiBookId);
        formData.append("name", castCrewData.name);
        formData.append("roleId", castCrewData.roleId);
        formData.append("crewImage", castCrewData.crewImage); // it's a File
        try {
        const response = await axios.post(`${API_URL}/createCrew`,
            formData
        );
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

export const deleteCastCrew = createAsyncThunk(
    'deleteCastCrew',
    async(id,{rejectWithValue})=>{
        try {
            const response = await axios.delete(`${API_URL}/deleteCrew/`+id);
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

export const updateCastCrew = createAsyncThunk(
    "updateCastCrew",
    async ({castCrewData,id}, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append("audiBookId", castCrewData.audiBookId);
        formData.append("name", castCrewData.name);
        formData.append("roleId", castCrewData.roleId);
        formData.append("crewImage", castCrewData.crewImage); // it's a File
        const response = await axios.put(`${API_URL}/updateCrew/`+id,formData);
        console.log("Resposnse" , response.data.data);
        return response.data ;
      } catch (error) {
        console.error("LoginAdmin Error:", error.message);
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
      }
    }
  );

const CastCrewAdminSlice = createSlice({
  name: "CastCrew",
  initialState: {
    castCrew:[],
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCastCrew.fulfilled, (state,action) => {
        state.castCrew = action.payload;
      })
      },
});

export default CastCrewAdminSlice.reducer;

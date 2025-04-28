import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";
const token = localStorage.getItem("token")

export const GenreData = createAsyncThunk(
  "GenreData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/getAllGenre`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
      );
    //   console.log("GenreData" , response.data.data);
      return response?.data?.data
      
    } catch (error) {
      console.error("Get Genre Error:", error.message);
      if(error.status === 404){
         console.error("Get Genre Error:", error.status);
         let data =[];
         return data;
      }
      else{
        alert("Get Genre" , error.message)
      }
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );

    }
  }
);

export const CreateGenreData = createAsyncThunk(
    "CreateGenreData",
    async ({values , file}, { rejectWithValue }) => {

        const formData = new FormData();
        formData.append('generImage', file);
        formData.append('name', values.name);
        console.log("hihihih" , formData);

      try {
        const response = await axios.post(
          `${API_URL}/createGenre`,
             formData,
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data', 
                },
          }
        );
        console.log("createGenre" , response.data.data);
        return response?.data?.data
        
      } catch (error) {
        console.error("Create Genre Error:", error.message);
        if(error.status === 404){
           console.error("Create Genre Error:", error.status);
           let data =[];
           return data;
        }
        else{
          alert("Get Create" , error.message)
        }
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
  
      }
    }
);



const GenreSlice = createSlice({
  name: "genreSlice",
  initialState: {
    genreData:[],
    loading: false,
    success: false,
    message: "",
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(GenreData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Genre..";
      })
      .addCase(GenreData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.genreData = action.payload;
        state.message = "Genre Get SuccessFully";
      })
      .addCase(GenreData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Genre";
      })

      .addCase(CreateGenreData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Create Genre..";
      })
      .addCase(CreateGenreData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.genreData = action.payload;
        state.message = "Genre Create SuccessFully";
      })
      .addCase(CreateGenreData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Genre Create";
      })
  },
});

export default GenreSlice.reducer;

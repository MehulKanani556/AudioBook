import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";
const token = localStorage.getItem("token")

export const EpisodeData = createAsyncThunk(
  "EpisodeData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/getAllEpisodes`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
      );
      console.log("Episode" , response.data);
      return response?.data?.data
      
    } catch (error) {
      console.error("Get Episode Error:", error.message);
      if(error.status === 404){
         console.error("Get Episode Error:", error.status);
         let data =[];
         return data;
      }
      else{
        alert("Get Episode" , error.message)
      }
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );

    }
  }
);

export const CreateEpisode = createAsyncThunk(
    "CreateEpisode",
    async ({values , file}, { rejectWithValue  , dispatch}) => {
      console.log("nnnnnnnnnnnnn" ,values , file);
      
      const formData = new FormData()
      formData.append("audioBookId" , values.audioBookId)
      formData.append("audioFile" , file)
      formData.append("premium" , values.premium)
      formData.append("duration" , values.duration)

      try {
        const response = await axios.post(
          `${API_URL}/createEpisodes`,
           formData,
          {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', 
            },
          }
        );
        console.log("Create Episode" , response);
        dispatch(EpisodeData())
        return response?.data?.data
      } catch (error) {
        if(error.status === 404){
            console.error("Create Episode Error:", error.status);
            let data =[];
            return data;
         }
         else if(error.status === 409){
          alert(error.message)
         }
         else{
           alert("Create Episode" , error.message)
         }
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
      }
    }
);

export const DeleteEpisode = createAsyncThunk(
    "DeleteEpisode",
    async (id, { rejectWithValue  , dispatch}) => {

      try {
        const response = await axios.delete(
          `${API_URL}/deleteEpisode/${id}`,
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Delete Episode" , response);
        dispatch(EpisodeData())
        return response?.data?.data
      } catch (error) {
        if(error.status === 404){
            console.error("Delete Episode Error:", error.status);
            let data =[];
            return data;
         }
         else{
           alert("Delete Episode" , error.message)
         }
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
      }
    }
);

export const EditEpisode = createAsyncThunk(
    "EditEpisode",
    async (payload , { rejectWithValue  , dispatch}) => {
      console.log("ccccccccccc" , payload);
      
      const formData = new FormData()
      formData.append("audioBookId" , payload?.values.audioBookId)
      formData.append("audioFile" , payload?.audioFile)
      formData.append("premium" , payload?.values.premium)
      formData.append("duration" , payload?.values.duration)

      try {
        const response = await axios.put(
          `${API_URL}/updateEpisodes/${payload?.id}`,
           formData,
          {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', 
            },
          }
        );
        console.log("Edit Episode" , response);
        dispatch(EpisodeData())
        return response?.data?.data
      } catch (error) {
        if(error.status === 404){
            console.error("Edit Episode Error:", error.status);
            let data =[];
            return data;
         }
         else{
           alert("Edit Episode" , error.message)
         }
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
      }
    }
);


const EpisodeSlice = createSlice({
  name: "EpisodeSlice",
  initialState: {
    episodeData:[],
    loading: false,
    success: false,
    message: "",
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(EpisodeData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Episode..";
      })
      .addCase(EpisodeData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.episodeData = action.payload;
        state.message = "Episode Get SuccessFully";
      })
      .addCase(EpisodeData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Episode";
      })

      .addCase(CreateEpisode.pending, (state) => {
        state.loading = true;
        state.message = "Create Episode..";
      })
      .addCase(CreateEpisode.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.episodeData = action.payload;
        state.message = "Create Episode Get SuccessFully";
      })
      .addCase(CreateEpisode.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To CreateEpisode";
      })

      .addCase(DeleteEpisode.pending, (state) => {
        state.loading = true;
        state.message = "Delete Episode..";
      })
      .addCase(DeleteEpisode.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.episodeData = action.payload;
        state.message = "Delete Episode Get SuccessFully";
      })
      .addCase(DeleteEpisode.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To DeleteEpisode";
      })

      .addCase(EditEpisode.pending, (state) => {
        state.loading = true;
        state.message = "Edit Episode..";
      })
      .addCase(EditEpisode.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.episodeData = action.payload;
        state.message = "Edit Episode Get SuccessFully";
      })
      .addCase(EditEpisode.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To EditEpisode";
      })
  },
});

export default EpisodeSlice.reducer;

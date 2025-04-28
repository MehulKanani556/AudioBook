import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const getAllAudioBookData = createAsyncThunk(
  "getAudioBook",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/getAllAudiobook`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      return response.data.data;
    } catch (error) {
      if (error.status === 404) {
        console.error("Get Coin Label Error:", error.status);
        var data = [];
        return data;
      }
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

export const addAudioBookData = createAsyncThunk(
  "addAudioBook",
  async (add, { rejectWithValue }) => {
    // console.log(add);

    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();

      formData.append("generId", add.genreId);
      formData.append("name", add.name);
      formData.append("description", add.description);
      formData.append("tags", add.tags);
      formData.append("language", add.language);

      if (add.sampleFile) {
        formData.append("sampleFile", add.sampleFile);
      }

      const response = await axios.post(
        `${API_URL}/createAudiobook`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

export const deleteAudioBookData = createAsyncThunk(
  "deleteAudioBook",
  async (deleteAudioBookId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${API_URL}/deleteAudiobook/${deleteAudioBookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

const AudioBookSlice = createSlice({
  name: "coinlabel",
  initialState: {
    audioBook: [],
    addAudioBook: [],
    deleteAudioBook: [],
    loading: false,
    success: false,
    message: "",
    singleData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAudioBookData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Coin Label..";
      })
      .addCase(getAllAudioBookData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.audioBook = action.payload;
        state.message = "Coin Label Get SuccessFully";
      })
      .addCase(getAllAudioBookData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Coin Label";
      })

      //   add audiobook
      .addCase(addAudioBookData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Coin Label..";
      })
      .addCase(addAudioBookData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.addAudioBook = action.payload;
        state.message = "Coin Label Get SuccessFully";
      })
      .addCase(addAudioBookData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Coin Label";
      })

      //  delete audiobook
      .addCase(deleteAudioBookData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Coin Label..";
      })
      .addCase(deleteAudioBookData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.deleteAudioBook = action.payload;
        state.message = "Coin Label Get SuccessFully";
      })
      .addCase(deleteAudioBookData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Coin Label";
      });
  },
});

export default AudioBookSlice.reducer;

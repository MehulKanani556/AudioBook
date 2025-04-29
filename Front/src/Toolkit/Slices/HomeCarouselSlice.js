import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const getAllHomeCarouselData = createAsyncThunk(
  "getHomeCarousel",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/getAllHomeCorousel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

export const addHomeCarouselData = createAsyncThunk(
  "addHomeCarousel",
  async (addHomeCarousel, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("homeCorouselImage", addHomeCarousel.image);
      const response = await axios.post(
        `${API_URL}/createHomeCorousel`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

export const editHomeCarouselData = createAsyncThunk(
  "editHomeCarousel",
  async (homeCarousel, { rejectWithValue }) => {
    console.log(homeCarousel);

    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("homeCorouselImage", homeCarousel.image);
      const response = await axios.put(
        `${API_URL}/updateHomeCorousel/${homeCarousel._id}`,
        formData,
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

export const deleteHomeCarousel = createAsyncThunk(
  "deleteHomeCarousel",
  async (deleteHomeCarousel, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${API_URL}/deleteHomeCorousel/${deleteHomeCarousel}`,
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

const HomeCarouselSlice = createSlice({
  name: "login",
  initialState: {
    homeCarousel: [],
    addHomeCarousel: [],
    editHomeCarousel: [],
    loading: false,
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // all home carousel
      .addCase(getAllHomeCarouselData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(getAllHomeCarouselData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.homeCarousel = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(getAllHomeCarouselData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      })

      // add home carousel
      .addCase(addHomeCarouselData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(addHomeCarouselData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.addHomeCarousel = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(addHomeCarouselData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      })

      // edit home carousel
      .addCase(editHomeCarouselData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(editHomeCarouselData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.editHomeCarousel = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(editHomeCarouselData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      });
  },
});

export default HomeCarouselSlice.reducer;

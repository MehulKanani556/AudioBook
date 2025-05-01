import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const allHomeLabelJoin = createAsyncThunk(
  "homeLabelJoin",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/getAllHomeLabelJoin`, {
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

export const addHomeLabelJoin = createAsyncThunk(
  "addHomeLabelJoin",
  async (values, { rejectWithValue }) => {
    console.log("valuesbjbjbjbjbjb", values);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API_URL}/createHomeLabelJoin`,
        {
          homeLabelId: values?.homeLabelId,
          audioBookId: values?.audioBookId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

export const editHomeLabelJoin = createAsyncThunk(
  "editHomeLabelJoin",
  async (editHomeLabelJoin, { rejectWithValue }) => {
    console.log(editHomeLabelJoin);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${API_URL}/updateHomeLabelJoin/${editHomeLabelJoin._id}`,
        {
          homeLabelId: editHomeLabelJoin.homeLabelId,
          audioBookId: editHomeLabelJoin.audioBookId,
        },
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

export const deleteHomeLabelJoin = createAsyncThunk(
  "deleteHomeLabelJoin",
  async (deleteHomeLabelJoin, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${API_URL}/deleteHomeLabelJoin/${deleteHomeLabelJoin}`,
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

const HomeLabelJoinSlice = createSlice({
  name: "login",
  initialState: {
    homeLabelJoin: [],
    editHomeLabelJoin: [],
    loading: false,
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // all homelabelJoin
      .addCase(allHomeLabelJoin.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(allHomeLabelJoin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.homeLabelJoin = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(allHomeLabelJoin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      })

      // edit homelabelJoin
      .addCase(editHomeLabelJoin.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(editHomeLabelJoin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.editHomeLabelJoin = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(editHomeLabelJoin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      });
  },
});

export default HomeLabelJoinSlice.reducer;

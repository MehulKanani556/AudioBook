import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000/api";

export const getAllSubscriptionData = createAsyncThunk(
  "getSubscription",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/allSubScription`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("LoginAdmin Error:", error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unexpected error occurred" }
      );
    }
  }
);

export const singleSubscriptionData = createAsyncThunk(
  "getSingleSubscription",
  async (subscriptionId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_URL}/getSubScription/${subscriptionId}`,
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

export const editSubscriptionData = createAsyncThunk(
  "editSubscription",
  async (subscription, { rejectWithValue }) => {
    console.log(subscription);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${API_URL}/updateSubScription/${subscription._id}`,
        {
          name: subscription.name,
          dicount: subscription.dicount,
          scratchPrice: subscription.scratchPrice,
          price: subscription.price,
          status: subscription.status,
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

const SubscriptionSlice = createSlice({
  name: "login",
  initialState: {
    subscription: [],
    singlesubscription: [],
    editSubscription: [],
    loading: false,
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // all subscription
      .addCase(getAllSubscriptionData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(getAllSubscriptionData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subscription = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(getAllSubscriptionData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      })

      //   single subscription
      .addCase(singleSubscriptionData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(singleSubscriptionData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.singlesubscription = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(singleSubscriptionData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      })

      // edit subscription
      .addCase(editSubscriptionData.pending, (state) => {
        state.loading = true;
        state.message = "Accepting Login Admin...";
      })
      .addCase(editSubscriptionData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.editSubscription = action.payload;
        state.message = "Login SuccessFully";
      })
      .addCase(editSubscriptionData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || "Failed To Login";
      });
  },
});

export default SubscriptionSlice.reducer;

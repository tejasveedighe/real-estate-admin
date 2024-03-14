import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../utils/helpers";

const initialState = {
  payments: [],
  loading: false,
  errors: {},
};

export const getAllPayments = createAsyncThunk(
  "payment/getAllPayments",
  async () => {
    try {
      const res = await Axios.get("/getAllPayments");
      return res.data;
    } catch (error) {
      throw new Error(error.message || "Error Occured");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPayments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPayments.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error;
    });
    builder.addCase(getAllPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.payments = action.payload;
    });
  },
});

export default paymentSlice.reducer;

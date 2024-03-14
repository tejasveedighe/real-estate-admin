import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../utils/helpers";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export const getDashBoardData = createAsyncThunk(
  "dashboard/getData",
  async () => {
    try {
      const res = await Axios.get("/adminDashboard");
      return res.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDashBoardData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDashBoardData.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getDashBoardData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
  },
});

export default dashboardSlice.reducer;

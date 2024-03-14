import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../utils/helpers";

const initialState = {
  offer: {},
  offers: [],
  loading: false,
  payLoading: false,
  payment: {},
  errors: {},
  lastAction: "",
};

export const sendOffer = createAsyncThunk("offer/sendOffer", async (offer) => {
  try {
    const res = await Axios.post("/sendOffer", offer);
    return res.data;
  } catch (error) {
    throw new Error(error.message || "Error occured");
  }
});

export const getOfferById = createAsyncThunk(
  "offer/getOfferById",
  async (payload) => {
    try {
      const res = await Axios.get("/getOfferById", {
        params: payload,
      });
      return res.data;
    } catch (error) {
      throw new Error(error.message || "Error occured");
    }
  }
);

export const getOfferByUserId = createAsyncThunk(
  "offer/getOfferByUserId",
  async (payload) => {
    try {
      const res = await Axios.get("/getOffersById", {
        params: payload,
      });
      return res.data;
    } catch (error) {
      throw new Error(error.message || "Error occured");
    }
  }
);

export const retryOffer = createAsyncThunk(
  "offer/retryOffer",
  async (payload) => {
    try {
      const res = await Axios.post("/Retry", payload);
      return res.data;
    } catch (error) {
      throw new Error(error.message || "Error occured");
    }
  }
);

export const buyProperty = createAsyncThunk(
  "offer/buyProperty",
  async (payload) => {
    try {
      const res = await Axios.post("/BuyProperty", payload);
      return res.data;
    } catch (error) {
      throw new Error(error.message || "Error Occured");
    }
  }
);

export const rentProperty = createAsyncThunk(
  "offer/rentProperty",
  async (payload) => {
    try {
      const res = await Axios.post("/RentProperty", payload);
      return res.data;
    } catch (error) {
      throw new Error(error.message || "Error Occured");
    }
  }
);

const offerSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    // send offer
    builder.addCase(sendOffer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendOffer.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error;
    });
    builder.addCase(sendOffer.fulfilled, (state, action) => {
      state.loading = false;
      state.offer = action.payload;
    });

    // get offer
    builder.addCase(getOfferById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOfferById.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error;
    });
    builder.addCase(getOfferById.fulfilled, (state, action) => {
      state.loading = false;
      state.offer = action.payload;
    });

    // get offers
    builder.addCase(getOfferByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOfferByUserId.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error;
    });
    builder.addCase(getOfferByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.offers = action.payload;
    });

    // retry offer
    builder.addCase(retryOffer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(retryOffer.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error;
    });
    builder.addCase(retryOffer.fulfilled, (state, action) => {
      state.loading = false;
      state.offers = action.payload;
    });

    // pay offer
    builder.addCase(buyProperty.pending, (state) => {
      state.payLoading = true;
    });
    builder.addCase(buyProperty.rejected, (state, action) => {
      state.payLoading = false;
      state.errors = action.error;
    });
    builder.addCase(buyProperty.fulfilled, (state, action) => {
      state.payLoading = false;
      state.payment = action.payload;
    });

    // rent offer
    builder.addCase(rentProperty.pending, (state) => {
      state.payLoading = true;
    });
    builder.addCase(rentProperty.rejected, (state, action) => {
      state.payLoading = false;
      state.errors = action.error;
    });
    builder.addCase(rentProperty.fulfilled, (state, action) => {
      state.payLoading = false;
      state.payment = action.payload;
    });
  },
});

export default offerSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../utils/helpers";

const initialState = {
  user: null,
  users: [],
  userDetails: {},
  userProperties: [],
  loading: false,
  status: "idle",
  errors: {},
};

export const loginUser = createAsyncThunk("user/login", async (payload) => {
  try {
    const res = await Axios.post("/login", payload);
    return res.data;
  } catch (error) {
    throw new Error(error.message || "Error occured");
  }
});

export const signupUser = createAsyncThunk("user/signup", async (payload) => {
  try {
    const res = await Axios.post("/AddUser", payload);
    return res.data;
  } catch (error) {
    throw new Error(error.message || "Error occured");
  }
});

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const res = await Axios.get("/user");
    return res.data;
  } catch (error) {
    throw new Error(error.message || "Error occured");
  }
});

export const deleteUserById = createAsyncThunk(
  "user/deleteUserById",
  async (userId) => {
    try {
      const res = await Axios.delete(`/delete/${userId}`);
      return res.data;
    } catch (error) {
      throw new Error(error.message || "Error occured");
    }
  }
);

export const getUserPropertiesById = createAsyncThunk(
  "properties/getUserPropertiesById",
  async (userId) => {
    try {
      const res = await Axios.get(`/user/${userId}`);
      return res.data;
    } catch (error) {
      throw new Error(error.message || "Error occured");
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId) => {
    try {
      const res = await Axios.get(`/userDetails/${userId}`);
      return res.data;
    } catch (error) {
      throw new Error(error.message || "Error occured");
    }
  }
);

export const getOwnedProperties = createAsyncThunk(
  "user/getOwnedProperties",
  async (buyerId) => {
    try {
      const res = await Axios.get(`/getOwnedProperties/${buyerId}`);
      return res.data;
    } catch (error) {
      throw new Error(error.message || "Error occured");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.user = action.payload;
    });

    // sign up
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.user = action.payload;
    });

    // get all users
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.users = action.payload;
    });

    // delete user by id
    builder.addCase(deleteUserById.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(deleteUserById.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
    });

    // get user properties by id
    builder.addCase(getUserPropertiesById.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(getUserPropertiesById.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(getUserPropertiesById.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.userProperties = action.payload;
    });

    // get user by id
    builder.addCase(getUserById.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.userDetails = action.payload;
    });

    // get user owned properties
    builder.addCase(getOwnedProperties.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(getOwnedProperties.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(getOwnedProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.userProperties = action.payload;
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://localhost:3000";

// Login Thunk
export const loginUser = createAsyncThunk(
  "userInfo/loginUser",
  async (log, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Register Thunk
export const registerUser = createAsyncThunk(
  "userRegister/registerUser",
  async (userReg, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userReg),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Register failed");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch User
export const fetchUser = createAsyncThunk(
  "userInfo/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/api/auth/fetchUser`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch user");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "userInfo/DeleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/api/auth/delUser/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Delete failed");
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


// ----------------------------
// User Slice
// ----------------------------
const userSlices = createSlice({
  name: "userInfo",
  initialState: {
    user: [],
    isAuthenticated: false,
    username: "",
    userId: "",
    isLoading: false,
    error: "",
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "";
      state.userId = ""; // ✅ CLEAR userId on logout
      state.user = [];
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.username = action.payload.username;
        state.userId = action.payload.userId;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = state.user.filter((u) => u._id !== action.payload);
        state.successMessage="Product Deleted"
      });
  },
});

// ----------------------------
// User Register Slice
// ----------------------------
const userRegisterSlices = createSlice({
  name: "userRegister",
  initialState: {
    isRegister: false,
    error: "",
    user: null,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRegister = true;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegister = false;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isRegister = false;
      });
  },
});

// ----------------------------
// Exports
// ----------------------------
export const { logout, login } = userSlices.actions;
export const { resetRegisterState } = userRegisterSlices.actions;

export const registerReducer = userRegisterSlices.reducer;
export const userReducer = userSlices.reducer;

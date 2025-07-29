import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const base_url = "http://localhost:3000";

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ userId, items, totalAmount }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${base_url}/api/order/create`, {
        userId,
        orderItems: items, // backend expects orderItems key
        totalAmount,
      });
      return res.data;
    } catch (err) {
      // Handle both server errors and client errors
      const message =
        err.response?.data?.message || err.message || "Order creation failed";
      return rejectWithValue(message);
    }
  }
);

export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${base_url}/api/order/getOrder`);
      return res.data; // Assuming the response contains an array of orders
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch orders";
      return rejectWithValue(message);
    }
  }
);
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${base_url}/api/order/getOrder/${userId}`);
      return res.data; // Assuming the response contains an array of orders
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch orders";
      return rejectWithValue(message);
    }
  }
);

export const updateStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${base_url}/api/order/updateOrderStatus/${id}`, 
        {status,id}
      );
      return res.data; // Assuming the response contains the updated order
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to update order status";
      return rejectWithValue(message);
    }
  }
)

// Slice for order management
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],          // Changed from "order" to "orders" (plural, consistent with array)
    loading: false,
    error: null,
    successMessage: null
  },
  reducers: {
   

    clearOrderState: (state) => {
      state.loading = false;  
      state.error = null;
      state.orders = [];
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload); // Push new order into orders array
        state.successMessage = "Order placed successfully!";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Set orders to fetched data
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Set orders to fetched data
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.orders = state.orders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
        state.loading = false;
        state.successMessage = "Order status updated successfully!";
      })
      // Example inside extraReducers


      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });   
  }
});

export const { clearOrderState } = orderSlice.actions; // Useful for resetting after toast

export default orderSlice.reducer;
export const orderReducer=orderSlice.reducer;
// slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const base_url = "http://localhost:3000";

// ✅ Fetch cart items for a user
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${base_url}/api/cart/${userId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch cart");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Add product to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${base_url}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");
      return data.cartItem;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Update quantity of cart item
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${base_url}/api/cart/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update quantity");
      return data.item;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Delete item from cart
export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${base_url}/api/cart/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete item");
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Clear entire cart


// ✅ Slice setup
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    clearCart:(state)=>    
    {
        state.items= [],
        state.loading= false,
        state.error= null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i._id !== action.payload);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })

  }
});

export default cartSlice.reducer;
export const{clearCart}=cartSlice.actions;
export const cartReducer = cartSlice.reducer;

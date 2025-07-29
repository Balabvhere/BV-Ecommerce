import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const base_url = "http://localhost:3000";

// ✅ Add Product
export const addingProduct = createAsyncThunk(
  "product/addingProduct",
  async (product, { rejectWithValue }) => {
    try {
      const res = await fetch(`${base_url}/api/auth/product`, {
        method: "POST",
        body: product,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Add Product Failed");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// ✅ Fetch Products

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (id, { rejectWithValue }) => {
    try {
  
      const res = await fetch(`${base_url}/api/auth/getProduct?${id}`);

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch products");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Get Product by ID
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${base_url}/api/auth/getProduct/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Fetch failed");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Update Product (with FormData)
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ _id, formData }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${base_url}/api/auth/updateProduct/${_id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Delete Product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${base_url}/api/auth/delProduct/${id}`, {
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

// ✅ Product Slice
const productSlice = createSlice({
  name: "addProduct",
  initialState: {
    products: [],
    isLoading: false,
    error: "",
    successMessage: "",
    selectedProduct:null,
  },
  reducers: {
    success: (state) => {
      state.successMessage = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addingProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addingProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload.product);
        state.successMessage = action.payload.message;
      })
      .addCase(addingProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.selectedProduct=action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
        state.successMessage="Product Deleted"
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.successMessage = "Product updated successfully";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { success } = productSlice.actions;
export const addProductReducer = productSlice.reducer;


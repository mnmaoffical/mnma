import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const fetchadminproduct = createAsyncThunk(
  "adminproducts/fetchproduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/product`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createproduct = createAsyncThunk(
  "adminproducts/createproduct",
  async (productdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/product`,
        productdata,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateproduct = createAsyncThunk(
  "adminproducts/updateproducts",
  async ({ id, productdata }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/product/${id}`,
        productdata,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteproduct = createAsyncThunk(
  "adminproducts/deleteproduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/product/${id}`, {
        headers: getAuthHeader(),
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminproductslice = createSlice({
  name: "adminproducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchadminproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchadminproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchadminproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateproduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(updateproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminproductslice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchproductbyfilters = createAsyncThunk(
  "products/fetchbyfilters",
  async (
    { collection, size, color, gender, minprice, maxprice, sortby, search, category, material, brand, limit },
    { rejectWithValue }
  ) => {
    try {
      const query = new URLSearchParams();
      if (collection) query.append("collection", collection);
      if (size) query.append("size", size);
      if (color) query.append("color", color);
      if (gender) query.append("gender", gender);
      if (minprice) query.append("minprice", minprice);
      if (maxprice) query.append("maxprice", maxprice);
      if (sortby) query.append("sortby", sortby);
      if (search) query.append("search", search);
      if (category) query.append("category", category);
      if (material) query.append("material", material);
      if (brand) query.append("brand", brand);
      if (limit) query.append("limit", limit);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);

export const fetchproductdetails = createAsyncThunk(
  "products/fetchproductsdetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch product details");
    }
  }
);

export const updateproduct = createAsyncThunk(
  "products/updateproduct",
  async ({ id, productdata }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        productdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update product");
    }
  }
);

export const fetchsimilarproducts = createAsyncThunk(
  "products/fetchsimilarproducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/similar/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch similar products");
    }
  }
);

export const fetchNewArrivals = createAsyncThunk(
  "products/fetchNewArrivals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch new arrivals");
    }
  }
);

const productslice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedproduct: null,
    similarproducts: [],
    newArrivals: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      brand: "",
      minprice: "",
      maxprice: "",
      sortby: "",
      search: "",
      material: "",
      collection: "",
    },
  },
  reducers: {
    setfilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearfilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        brand: "",
        minprice: "",
        maxprice: "",
        sortby: "",
        search: "",
        material: "",
        collection: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchproductbyfilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproductbyfilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchproductbyfilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })

      .addCase(fetchproductdetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproductdetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedproduct = action.payload;
      })
      .addCase(fetchproductdetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product details";
      })

      .addCase(updateproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateproduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedproduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updatedproduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedproduct;
        }
      })
      .addCase(updateproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update product";
      })

      .addCase(fetchsimilarproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchsimilarproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarproducts = action.payload;
      })
      .addCase(fetchsimilarproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch similar products";
      })

      .addCase(fetchNewArrivals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.loading = false;
        state.newArrivals = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchNewArrivals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch new arrivals";
      });
  },
});

export const { setfilters, clearfilters } = productslice.actions;
export default productslice.reducer;
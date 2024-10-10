import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchCategories = createAsyncThunk('admin/fetchCategories', async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
});
export const fetchProductsByCategory = createAsyncThunk(
  'admin/fetchProductsByCategory',
  async (category) => {
    const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    return response.data;
  }
);
export const addNewProduct = createAsyncThunk('admin/addNewProduct', async (product) => {
  const response = await axios.post('https://fakestoreapi.com/products', product);
  return response.data;
});

export const updateProduct = createAsyncThunk('admin/updateProduct', async ({ id, product }) => {
  const response = await axios.put(`https://fakestoreapi.com/products/${id}`, product);
  return response.data;
});

export const deleteProduct = createAsyncThunk('admin/deleteProduct', async (id) => {
  const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
  return id; 
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    categories: [],
    products: [],
    carts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default adminSlice.reducer;

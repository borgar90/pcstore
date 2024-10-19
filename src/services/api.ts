import axios, { AxiosError } from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Helper function to handle API errors
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message);
  } else {
    console.error('Unknown Error:', error);
    throw new Error('An unknown error occurred');
  }
};

// Auth
export const login = (credentials: { email: string; password: string }) => api.post('/auth/login', credentials);
export const register = (userData: any) => api.post('/auth/register', userData);
export const logout = () => api.post('/auth/logout');

// Products
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const createProduct = (productData: any) => api.post('/products', productData);
export const updateProduct = (id: string, productData: any) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id: string) => api.delete(`/products/${id}`);

// Categories
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const createCategory = (categoryData: any) => api.post('/categories', categoryData);
export const updateCategory = (id: string, categoryData: any) => api.put(`/categories/${id}`, categoryData);
export const deleteCategory = (id: string) => api.delete(`/categories/${id}`);

// Orders
export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const updateOrderStatus = (id: string, status: string) => api.put(`/orders/${id}/status`, { status });

// Invoices
export const getInvoices = async () => {
  try {
    const response = await api.get('/invoices');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const updateInvoiceStatus = (id: string, status: string) => api.put(`/invoices/${id}/status`, { status });

// Cart
export const getCart = () => api.get('/carts');
export const addToCart = (productId: string, quantity: number) => api.post('/carts/add', { productId, quantity });
export const removeFromCart = (productId: string) => api.delete(`/carts/remove/${productId}`);
export const updateCartItemQuantity = (productId: string, quantity: number) => api.put(`/carts/update/${productId}`, { quantity });
export const clearCart = () => api.delete('/carts/clear');

// Custom PC
export const createCustomPc = (customPcData: any) => api.post('/custom-pcs', customPcData);

// Users
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const updateUser = (id: string, userData: any) => api.put(`/users/${id}`, userData);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);
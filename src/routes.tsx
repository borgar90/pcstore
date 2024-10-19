import React from 'react';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ComputerBuilder from './pages/ComputerBuilder';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminCategories from './pages/AdminCategories';
import AdminOrders from './pages/AdminOrders';
import AdminInvoices from './pages/AdminInvoices';
import AdminUsers from './pages/AdminUsers';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';

interface RouteConfig {
  path: string;
  element: React.ReactElement;
}

export const publicRoutes: RouteConfig[] = [
  { path: '/', element: <Home /> },
  { path: '/shop', element: <Shop /> },
  { path: '/builder', element: <ComputerBuilder /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
];

export const protectedRoutes: RouteConfig[] = [
  { path: '/cart', element: <Cart /> },
  { path: '/checkout', element: <Checkout /> },
  { path: '/dashboard', element: <UserDashboard /> },
];

export const adminRoutes: RouteConfig[] = [
  { path: '/admin', element: <AdminDashboard /> },
  { path: '/admin/products', element: <AdminProducts /> },
  { path: '/admin/categories', element: <AdminCategories /> },
  { path: '/admin/orders', element: <AdminOrders /> },
  { path: '/admin/invoices', element: <AdminInvoices /> },
  { path: '/admin/users', element: <AdminUsers /> },
];
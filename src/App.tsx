import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ComputerBuilder from './pages/ComputerBuilder';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import GDPRWarning from './components/GDPRWarning';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminCategories from './pages/AdminCategories';
import AdminOrders from './pages/AdminOrders';
import AdminInvoices from './pages/AdminInvoices';
import AdminUsers from './pages/AdminUsers';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';

const ProtectedRoute: React.FC<{ element: React.ReactElement; adminOnly?: boolean }> = ({ element, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return element;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/builder" element={<ComputerBuilder />} />
              <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
              <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
              <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} adminOnly />} />
              <Route path="/admin/products" element={<ProtectedRoute element={<AdminProducts />} adminOnly />} />
              <Route path="/admin/categories" element={<ProtectedRoute element={<AdminCategories />} adminOnly />} />
              <Route path="/admin/orders" element={<ProtectedRoute element={<AdminOrders />} adminOnly />} />
              <Route path="/admin/invoices" element={<ProtectedRoute element={<AdminInvoices />} adminOnly />} />
              <Route path="/admin/users" element={<ProtectedRoute element={<AdminUsers />} adminOnly />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute element={<UserDashboard />} />} />
            </Routes>
          </main>
          <Footer />
          <GDPRWarning />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
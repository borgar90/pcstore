import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories, getOrders, getInvoices } from '../services/api';

const AdminDashboard: React.FC = () => {
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [products, categories, orders, invoices] = await Promise.all([
        getProducts(),
        getCategories(),
        getOrders(),
        getInvoices(),
      ]);
      setProductCount(products.length);
      setCategoryCount(categories.length);
      setOrderCount(orders.length);
      setInvoiceCount(invoices.length);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to fetch dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Products" count={productCount} link="/admin/products" />
        <DashboardCard title="Categories" count={categoryCount} link="/admin/categories" />
        <DashboardCard title="Orders" count={orderCount} link="/admin/orders" />
        <DashboardCard title="Invoices" count={invoiceCount} link="/admin/invoices" />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  count: number;
  link: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, count, link }) => {
  return (
    <Link to={link} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{count}</p>
    </Link>
  );
};

export default AdminDashboard;
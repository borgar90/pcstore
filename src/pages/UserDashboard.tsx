import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getOrders, getInvoices } from '../services/api';
import { Link } from 'react-router-dom';

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface Invoice {
  _id: string;
  invoiceNumber: string;
  totalAmount: number;
  status: string;
  dueDate: string;
}

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, invoicesResponse] = await Promise.all([
          getOrders(),
          getInvoices(),
        ]);
        setOrders(ordersResponse.data);
        setInvoices(invoicesResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
            <Link to="/edit-profile" className="text-blue-500 hover:underline mt-4 inline-block">
              Edit Profile
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <div className="bg-white shadow rounded-lg p-6">
            {orders.length > 0 ? (
              <ul>
                {orders.slice(0, 5).map((order) => (
                  <li key={order._id} className="mb-2">
                    <Link to={`/order/${order._id}`} className="text-blue-500 hover:underline">
                      Order #{order._id.slice(-6)}
                    </Link>
                    <span className="ml-2">- {order.status}</span>
                    <span className="ml-2">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent orders</p>
            )}
            <Link to="/orders" className="text-blue-500 hover:underline mt-4 inline-block">
              View All Orders
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Invoices</h2>
        <div className="bg-white shadow rounded-lg p-6">
          {invoices.length > 0 ? (
            <ul>
              {invoices.slice(0, 5).map((invoice) => (
                <li key={invoice._id} className="mb-2">
                  <Link to={`/invoice/${invoice._id}`} className="text-blue-500 hover:underline">
                    Invoice #{invoice.invoiceNumber}
                  </Link>
                  <span className="ml-2">- {invoice.status}</span>
                  <span className="ml-2">Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent invoices</p>
          )}
          <Link to="/invoices" className="text-blue-500 hover:underline mt-4 inline-block">
            View All Invoices
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
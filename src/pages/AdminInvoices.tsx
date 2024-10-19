import React, { useState, useEffect } from 'react';
import { getInvoices, updateInvoiceStatus } from '../services/api';

interface Invoice {
  _id: string;
  invoiceNumber: string;
  order: {
    _id: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  totalAmount: number;
  status: string;
  dueDate: string;
}

const AdminInvoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await getInvoices();
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInvoiceStatus = async (id: string, status: string) => {
    try {
      await updateInvoiceStatus(id, status);
      fetchInvoices();
    } catch (error) {
      console.error('Error updating invoice status:', error);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Invoices</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Invoice Number</th>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Total Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Due Date</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id} className="border-b">
                <td className="py-3 px-4">{invoice.invoiceNumber}</td>
                <td className="py-3 px-4">{invoice.order._id}</td>
                <td className="py-3 px-4">
                  {`${invoice.order.user.firstName} ${invoice.order.user.lastName}`}
                  <br />
                  <span className="text-sm text-gray-500">{invoice.order.user.email}</span>
                </td>
                <td className="py-3 px-4">{invoice.totalAmount} kr</td>
                <td className="py-3 px-4">{invoice.status}</td>
                <td className="py-3 px-4">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <select
                    value={invoice.status}
                    onChange={(e) => handleUpdateInvoiceStatus(invoice._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInvoices;
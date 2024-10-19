import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminLayout: React.FC = () => {
  return (
    <div>
      <AdminNavbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
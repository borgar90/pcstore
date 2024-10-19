import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/admin" end className={({ isActive }) => isActive ? "font-bold" : ""}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? "font-bold" : ""}>
            Brukere
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? "font-bold" : ""}>
            Produkter
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" className={({ isActive }) => isActive ? "font-bold" : ""}>
            Kategorier
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "font-bold" : ""}>
            Bestillinger
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/invoices" className={({ isActive }) => isActive ? "font-bold" : ""}>
            Fakturaer
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
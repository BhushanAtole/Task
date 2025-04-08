import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SidebarLinks = ({ role }) => {
  const links = {
    admin: [
      { to: '/admin', label: 'Dashboard' },
      { to: '/payroll', label: 'Payroll' },
    ],
    superuser: [
      { to: '/superuser', label: 'Dashboard' },
      { to: '/payroll', label: 'Payroll' },
    ],
    user: [
      { to: '/user', label: 'Dashboard' },
    ],
  };

  return (
    <nav className="flex flex-col space-y-3">
      {links[role]?.map((link) => (
        <NavLink key={link.to} to={link.to} className= {({ isActive }) =>
        isActive ? 'text-indigo-200 font-bold' : 'text-white'
      }>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const role = user?.role || 'user';

  const titles = {
    admin: 'Admin Panel',
    superuser: 'Superuser Panel',
    user: 'User Panel',
  };

  return (
    <div className="min-h-screen flex font-serif bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#046169] text-white px-6 py-8 space-y-6">
        <div className="text-2xl font-bold mb-4">{titles[role]}</div>
        <SidebarLinks role={role} />
        <button
          onClick={logout}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md p-4"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;

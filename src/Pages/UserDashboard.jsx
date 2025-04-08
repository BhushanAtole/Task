import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import DashboardLayout from '../Layout/DashboardLayout';

const UserDashboard = () => {
  const { user, logout } = useAuth();

  // Static data for demonstration
  const recentActivities = [
    { id: 1, activity: 'Updated profile information', time: '2 hours ago' },
    { id: 2, activity: 'Changed account password', time: '1 day ago' },
    { id: 3, activity: 'Viewed payroll details', time: '3 days ago' },
  ];

  const notifications = [
    { id: 1, message: 'Your password will expire in 5 days.', time: '1 hour ago' },
    { id: 2, message: 'New policy updates available.', time: '2 days ago' },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h2>
        <p className="text-gray-600">Logged in as: {user.email}</p>

        {/* User Profile Overview */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Profile Overview</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more profile details as needed */}
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
          <div className="flex space-x-4">
            <Link
              to="/update-profile"
              className="bg-[#046169] text-white px-4 py-2 rounded-lg shadow hover:bg-[#02474d]"
            >
              Update Profile
            </Link>
            <Link
              to="/settings"
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
            >
              Account Settings
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activities</h3>
          <ul className="space-y-3">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="text-gray-700">
                {activity.activity} <span className="text-gray-500 text-sm">({activity.time})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notifications */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Notifications</h3>
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li key={notification.id} className="text-gray-700">
                {notification.message} <span className="text-gray-500 text-sm">({notification.time})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;

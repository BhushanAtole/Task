import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import DashboardLayout from '../Layout/DashboardLayout';

const SuperUserDashboard = () => {
  const { user } = useAuth();

  // Static data for demonstration
  const systemStats = [
    { id: 1, name: 'Total Users', value: 1500 },
    { id: 2, name: 'Active Sessions', value: 300 },
    { id: 3, name: 'System Uptime', value: '99.9%' },
  ];

  const recentActivities = [
    { id: 1, activity: 'User JohnDoe updated profile', time: '2 hours ago' },
    { id: 2, activity: 'Admin added new role', time: '1 day ago' },
    { id: 3, activity: 'System maintenance completed', time: '3 days ago' },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Welcome, Super User!</h2>
        <p className="text-gray-600">Logged in as: {user.email}</p>

        {/* System Statistics Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">System Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {systemStats.map((stat) => (
              <div key={stat.id} className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-md font-medium text-gray-600">{stat.name}</h4>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activities</h3>
          <ul className="bg-white p-4 rounded-lg shadow space-y-3">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="text-gray-700">
                {activity.activity} <span className="text-gray-500 text-sm">({activity.time})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link
            to="/payroll"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
          >
            Go to Payroll
          </Link>
          <Link
            to="/user-management"
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            Manage Users
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperUserDashboard;

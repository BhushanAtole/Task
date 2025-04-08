import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import StepperForm from '../components/StepperForm';
import { Users, FileClock, ShieldCheck } from 'lucide-react';
import CountUp from 'react-countup';
import DashboardLayout from '../Layout/DashboardLayout';

const AdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Users',
      value: 128,
      icon: <Users className="w-8 h-8 text-indigo-600" />,
    },
    {
      label: 'Pending Payrolls',
      value: 15,
      icon: <FileClock className="w-8 h-8 text-yellow-500" />,
    },
    {
      label: 'Admins',
      value: 3,
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Welcome, Admin</h1>
          <p className="text-sm text-gray-500">
            Logged in as: <span className="font-medium">{user?.email}</span>
          </p>
        </div>

        {/* Stats with Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border flex items-center gap-4"
            >
              {stat.icon}
              <div>
                <div className="text-sm text-gray-500">{stat.label}</div>
                {/* <div className="text-2xl font-bold text-gray-800">{stat.value}</div> */}
                <CountUp duration={3} className="counter" end={stat.value} />
              </div>
            </div>
          ))}
        </div>

        {/* Stepper Form */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New User</h2>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <StepperForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

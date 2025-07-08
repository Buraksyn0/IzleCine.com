import React from 'react';
import { Users, UserPlus, UserCheck } from 'lucide-react';

const UserStats = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '12,345',
      icon: Users,
      color: 'bg-blue-600',
    },
    {
      title: 'Active Users',
      value: '8,765',
      icon: UserCheck,
      color: 'bg-green-600',
    },
    {
      title: 'New Signups',
      value: '234',
      icon: UserPlus,
      color: 'bg-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">User Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`${stat.color} p-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white opacity-80">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <Icon className="w-12 h-12 text-white opacity-80" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder for future charts */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">User Growth</h2>
        <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Chart visualization coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats; 
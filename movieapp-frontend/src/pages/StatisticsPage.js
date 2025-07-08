import React from 'react';

const StatisticsPage = () => {
  // Mock veriler
  const statistics = {
    totalUsers: 1250,
    totalMovies: 850,
    averageTimeSpent: '45 dakika',
    dailyActiveUsers: 320,
    totalReviews: 2500,
    averageRating: 4.2,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Genel İstatistikler</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
          <h3 className="text-xl font-semibold mb-2 text-gray-300">Toplam Kullanıcı</h3>
          <p className="text-3xl font-bold text-blue-400">{statistics.totalUsers}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
          <h3 className="text-xl font-semibold mb-2 text-gray-300">Toplam Film</h3>
          <p className="text-3xl font-bold text-green-400">{statistics.totalMovies}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
          <h3 className="text-xl font-semibold mb-2 text-gray-300">Ortalama Zaman</h3>
          <p className="text-3xl font-bold text-purple-400">{statistics.averageTimeSpent}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
          <h3 className="text-xl font-semibold mb-2 text-gray-300">Günlük Aktif Kullanıcı</h3>
          <p className="text-3xl font-bold text-orange-400">{statistics.dailyActiveUsers}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
          <h3 className="text-xl font-semibold mb-2 text-gray-300">Toplam İnceleme</h3>
          <p className="text-3xl font-bold text-red-400">{statistics.totalReviews}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
          <h3 className="text-xl font-semibold mb-2 text-gray-300">Ortalama Puan</h3>
          <p className="text-3xl font-bold text-yellow-400">{statistics.averageRating}</p>
        </div>
      </div>

      {/* Grafik Bölümü */}
      <div className="mt-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Kullanıcı Aktivitesi</h2>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Grafik görselleştirmesi yakında eklenecek</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage; 
import React from 'react';

const SystemLogsPage = () => {
  // Mock log verileri
  const logs = [
    {
      id: 1,
      timestamp: '2024-04-20 10:15:23',
      type: 'INFO',
      message: 'Kullanıcı başarıyla giriş yaptı: user123',
    },
    {
      id: 2,
      timestamp: '2024-04-20 10:16:45',
      type: 'WARNING',
      message: 'Başarısız giriş denemesi: unknown@example.com',
    },
    {
      id: 3,
      timestamp: '2024-04-20 10:20:12',
      type: 'ERROR',
      message: 'Film yükleme hatası: ID 12345',
    },
    {
      id: 4,
      timestamp: '2024-04-20 10:25:30',
      type: 'INFO',
      message: 'Yeni film eklendi: The Matrix',
    },
    {
      id: 5,
      timestamp: '2024-04-20 10:30:15',
      type: 'INFO',
      message: 'Kullanıcı profili güncellendi: user456',
    },
  ];

  const getLogTypeColor = (type) => {
    switch (type) {
      case 'INFO':
        return 'bg-blue-100 text-blue-800';
      case 'WARNING':
        return 'bg-yellow-100 text-yellow-800';
      case 'ERROR':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sistem Logları</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zaman
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tip
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mesaj
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getLogTypeColor(log.type)}`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemLogsPage; 
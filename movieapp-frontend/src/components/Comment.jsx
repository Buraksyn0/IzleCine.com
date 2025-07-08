import React, { useState } from 'react';
import { Flag, Trash2, EyeOff } from 'lucide-react';

const Comment = ({ comment, onReport, onDelete, onHide, isAdmin }) => {
  const [isReported, setIsReported] = useState(false);

  const handleReport = async () => {
    try {
      await onReport(comment._id);
      setIsReported(true);
    } catch (error) {
      console.error('Rapor oluşturulurken hata:', error);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={comment.user.profileImage || '/default-avatar.png'}
              alt={comment.user.username}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/30"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>
          <div>
            <h3 className="font-semibold text-white">{comment.user.username}</h3>
            <p className="text-sm text-gray-400">
              {new Date(comment.createdAt).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        {comment.status === 'reported' && (
          <span className="px-3 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
            Rapor Edildi
          </span>
        )}
      </div>
      
      <div className="bg-gray-700/30 rounded-lg p-4 mb-4">
        <p className="text-gray-200 leading-relaxed">{comment.content}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        {!isAdmin && !isReported && (
          <button
            onClick={handleReport}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-red-400 transition-colors duration-200 hover:bg-red-500/10 rounded-lg"
          >
            <Flag className="w-4 h-4 mr-2" />
            <span>Raporla</span>
          </button>
        )}
        
        {isAdmin && (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onDelete(comment._id)}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-red-400 transition-colors duration-200 hover:bg-red-500/10 rounded-lg"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              <span>Sil</span>
            </button>
            <button
              onClick={() => onHide(comment._id)}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200 hover:bg-yellow-500/10 rounded-lg"
            >
              <EyeOff className="w-4 h-4 mr-2" />
              <span>Gizle</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment; 
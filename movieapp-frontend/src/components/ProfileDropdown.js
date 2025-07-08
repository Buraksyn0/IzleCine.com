import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaUser, FaHeart, FaComment, FaSignOutAlt, FaCog, FaList } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import userImage from '../assets/user.png';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('userChanged'));
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    console.log('Toggle dropdown clicked, current state:', isOpen);
    setIsOpen(!isOpen);
  };

  console.log('ProfileDropdown rendered, isOpen:', isOpen);

  return (
    <div className="profile-dropdown-container relative" ref={dropdownRef}>
      <div
        className="profile-dropdown-trigger w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-purple-500/50 transition-all duration-300"
        onClick={toggleDropdown}
      >
        <img
          src={userImage}
          alt="Profile"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Failed to load user image');
            e.target.style.display = 'none';
          }}
        />
      </div>

      {isOpen && (
        <div className="profile-dropdown-menu">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
            <h2 className="text-lg font-semibold text-white">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <IoClose className="text-xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-2 space-y-1">
            <Link
              to="/user-profile"
              className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <FaUser className="text-sm" />
              <span className="text-sm">Profile</span>
            </Link>
            
            <Link
              to="/watchlist"
              className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <FaList className="text-sm" />
              <span className="text-sm">Watchlist</span>
            </Link>

            <Link
              to="/favorites"
              className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <FaHeart className="text-sm" />
              <span className="text-sm">Favorites</span>
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <FaCog className="text-sm" />
              <span className="text-sm">Settings</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-700/50 p-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
            >
              <FaSignOutAlt className="text-sm" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown; 
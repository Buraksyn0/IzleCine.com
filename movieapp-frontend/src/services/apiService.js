import axios from 'axios';

// Create a dedicated axios instance for user profile requests to local backend
const apiAxios = axios.create({
  baseURL: '/api', // This will be proxied to http://localhost:5000/api
  headers: {
    'Content-Type': 'application/json'
  }
});

const apiService = {
  // User profile endpoints
  getUserProfile: async (token) => {
    try {
      const response = await apiAxios.get('/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Authentication failed');
      } else {
        throw new Error('Failed to fetch user profile');
      }
    }
  },

  updateUserProfile: async (token, profileData) => {
    try {
      const response = await apiAxios.put('/users/profile', profileData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'Profile update failed');
      } else {
        throw new Error('Profile update failed');
      }
    }
  },

  // Check if user profile is complete
  checkProfileComplete: async (token) => {
    try {
      const userProfile = await apiService.getUserProfile(token);
      return !!(userProfile.firstName && userProfile.lastName);
    } catch (error) {
      console.error('Error checking profile completion:', error);
      return false;
    }
  }
};

export default apiService; 
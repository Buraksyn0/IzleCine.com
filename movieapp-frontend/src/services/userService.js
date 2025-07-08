import axios from 'axios';

const API_BASE_URL = '/api';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.dispatchEvent(new Event('userChanged'));
        }
        return Promise.reject(error);
      }
    );
  }

  // Get user profile data
  async getUserProfile() {
    try {
      console.log('Calling getUserProfile');
      const response = await this.api.get('/users/profile');
      console.log('getUserProfile response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }

  // Get user's liked movies
  async getLikedMovies() {
    try {
      console.log('Calling getLikedMovies');
      const response = await this.api.get('/users/liked-movies');
      console.log('getLikedMovies response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching liked movies:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch liked movies');
    }
  }

  // Get user's comments
  async getUserComments() {
    try {
      console.log('Calling getUserComments');
      const response = await this.api.get('/users/comments');
      console.log('getUserComments response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user comments:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user comments');
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await this.api.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await this.api.put('/users/change-password', passwordData);
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  }

  // Delete account
  async deleteAccount() {
    try {
      const response = await this.api.delete('/users/account');
      return response.data;
    } catch (error) {
      console.error('Error deleting account:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete account');
    }
  }

  // Get user watchlist
  async getWatchlist() {
    try {
      const response = await this.api.get('/users/watchlist');
      return response.data;
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch watchlist');
    }
  }

  // Add movie to watchlist
  async addToWatchlist(movieId) {
    try {
      const response = await this.api.post('/users/watchlist', { movieId });
      return response.data;
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      throw new Error(error.response?.data?.message || 'Failed to add to watchlist');
    }
  }

  // Remove movie from watchlist
  async removeFromWatchlist(movieId) {
    try {
      const response = await this.api.delete(`/users/watchlist/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      throw new Error(error.response?.data?.message || 'Failed to remove from watchlist');
    }
  }

  // Get user statistics
  async getUserStats() {
    try {
      const response = await this.api.get('/users/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user statistics');
    }
  }
}

export default new UserService(); 
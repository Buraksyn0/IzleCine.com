import axios from 'axios';

// Create a dedicated axios instance for authentication requests to local backend
const authAxios = axios.create({
  baseURL: '/api/users', // This will be proxied to http://localhost:5000/api/users
  headers: {
    'Content-Type': 'application/json'
  }
});

const authService = {
  register: async ({ username, email, password }) => {
    try {
      const response = await authAxios.post('', { username, email, password });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Server error');
      }
    }
  },
  login: async ({ email, password }) => {
    try {
      const response = await authAxios.post('/login', { email, password });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Login failed!');
      }
    }
  },
  forgotPassword: async ({ email }) => {
    try {
      const response = await authAxios.post('/forgot-password', { email });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error(error.response.data.message);
      } else if (error.response && error.response.status === 404) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Şifre sıfırlama işlemi başarısız!');
      }
    }
  },
  resetPassword: async ({ token, newPassword }) => {
    try {
      const response = await authAxios.post('/reset-password', { token, newPassword });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Şifre sıfırlama işlemi başarısız!');
      }
    }
  }
};

export default authService; 
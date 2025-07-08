import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Provider } from 'react-redux';
import store from './store/store'; // ✅ Default import!
import './i18n';

// Remove global axios configuration to prevent conflicts with authentication requests
// Each service should use its own axios instance with appropriate base URL

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

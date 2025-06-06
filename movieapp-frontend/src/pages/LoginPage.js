import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <p>Hesabınıza giriş yaparak film dünyasına adım atın.</p>

      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        
        <div className="form-group">
          <label htmlFor="email">E-posta Adresiniz:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Şifre:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">Giriş Yap</button>
        <Link to="/signup" className="register-button">Kayıt Ol</Link>
        
        <div className="forgot-password">
          <Link to="/password-reset">Şifrenizi mi unuttunuz?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

import supabase from '../../supabaseClient'; // Assuming this is used elsewhere in your code

import './landing-page.css'; // Ensure the CSS file is imported for styling

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      console.log('Login successful!');
      navigate('/seller/home'); // Navigate to the seller home page
    } else {
      alert('Please enter a valid email and password.');
    }
  };

  return (
    <div className="wrapper">
      <div className="card">
        <div className="card-header">
          <div className="logo">
            <img src="/images/tori_logo2.png" alt="Logo" width={68} height={68} />
          </div>
          <h1 className="title">Sign In</h1>
        </div>
        <div className="card-content">
          <div>
            <label htmlFor="email" className="label">Email address</label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="input-container">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="input-field password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Link to="#" className="link">Forgot password?</Link>
          </div>
          <button className="button button-primary" onClick={handleLogin}>
            Log in
          </button>
        </div>
        <div className="text">
          Don't have an account?{' '}
          <Link to="/register" className="link" style={{ fontWeight: '600' }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;

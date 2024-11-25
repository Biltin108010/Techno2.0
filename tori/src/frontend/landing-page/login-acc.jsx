import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Keep these for the eye icon toggle
import 'font-awesome/css/font-awesome.min.css';

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
      navigate('/choose-ur-plan'); // Navigate to the seller home page
    } else {
      alert('Please enter a valid email and password.');
    }
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img src="/images/tori_logo2.png" alt="Logo" width={68} height={68} />
      </div>
      <h1 className="signintitle">Sign In</h1>
      <div className="container">
        <div>
          <label htmlFor="email" className="label">Email Address</label>
          <input
            id="email"
            type="email"
            className="signininput-field"
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
              className="signininput-field password-input"
              placeholder="must be 8 characters"
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
          <Link to="#" className="forgotpasslink">Forgot password?</Link>
        </div>
        <button className="button button-primary" onClick={handleLogin}>
          Log in
        </button>

        {/* Or login with section */}
        <div className="or-login-with">
          <div className="divider">
            <span className="divider-text">Or Login with</span>
          </div>
          <div className="social-icons">
            <div className="social-icon facebook">
              <i className="fab fa-facebook-f"></i>
            </div>
            <div className="social-icon google">
              <i className="fab fa-google"></i>
            </div>
            <div className="social-icon apple">
              <i className="fab fa-apple"></i>
            </div>
          </div>
        </div>



        <div className="signuptext">
          Don't have an account?{' '}
          <Link to="/register" className="signuplink">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;

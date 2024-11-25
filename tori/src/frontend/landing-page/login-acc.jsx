import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Eye, EyeOff } from 'lucide-react';
import supabase from '../../backend/supabaseClient'; // Ensure this is correctly set up
=======
import { Eye, EyeOff } from 'lucide-react'; // Keep these for the eye icon toggle
import 'font-awesome/css/font-awesome.min.css';

import supabase from '../../supabaseClient'; // Assuming this is used elsewhere in your code

>>>>>>> ff01174b3217167f35e019a5e0e3caa6ae655ca7
import './landing-page.css'; // Ensure the CSS file is imported for styling

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    if (!email || !password) {
      alert('Please enter a valid email and password.');
      return;
    }

    setLoading(true);
    setErrorMessage(''); // Reset error message

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Display alert message on successful login
      alert('Login successful! Welcome back.');

      console.log('Login successful:', data);
      navigate('/choose-ur-plan'); // Navigate to the appropriate page after login
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(error.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
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
<<<<<<< HEAD
        <div className="card-content">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div>
            <label htmlFor="email" className="label">Email address</label>
=======
        <div>
          <label htmlFor="password" className="label">Password</label>
          <div className="input-container">
>>>>>>> ff01174b3217167f35e019a5e0e3caa6ae655ca7
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
<<<<<<< HEAD
          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="input-container">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="input-field password-input"
                placeholder="Enter your password"
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
            <Link to="/forgot-password" className="link">Forgot password?</Link>
          </div>
          <button
            className="button button-primary"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
=======
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
>>>>>>> ff01174b3217167f35e019a5e0e3caa6ae655ca7
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

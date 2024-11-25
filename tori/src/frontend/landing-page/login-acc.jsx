import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Eye icons for toggle
import 'font-awesome/css/font-awesome.min.css';
import supabase from '../../backend/supabaseClient'; // Ensure this is your Supabase client configuration
import './landing-page.css'; // Ensure the CSS file is imported for styling

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMessage(error.message); // Display the error message to the user
        } else {
          console.log('Login successful:', data);
          navigate('/choose-ur-plan'); // Navigate to the desired page upon successful login
        }
      } catch (err) {
        console.error('Login error:', err);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } else {
      setErrorMessage('Please enter both email and password.');
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
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
      </div >
    </div >
  );
}

export default SignInForm;

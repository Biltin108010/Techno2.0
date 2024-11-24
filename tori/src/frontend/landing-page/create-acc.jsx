'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure you're using BrowserRouter in the root
import { Eye, EyeOff } from 'lucide-react';
import './landing-page.css';

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="wrapper">
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <img
            src="/images/tori_logo2.png"
            alt="Logo"
            width={48}
            height={48}
            className="dark:invert"
          />
        </div>

        {/* Heading */}
        <h1 className="heading">Sign Up</h1>

        {/* Form */}
        <form className="form">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              required
              className="input-field"
            />
          </div>

          {/* Role Input */}
          <div>
            <label htmlFor="role" className="label">
              Role
            </label>
            <input
              id="role"
              type="text"
              placeholder="Enter role"
              required
              className="input-field"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="label">
              Create a password
            </label>
            <div className="input-container">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Must be 8 characters"
                required
                className="input-field password-input"
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirm-password" className="label">
              Confirm password
            </label>
            <div className="input-container">
              <input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Repeat password"
                required
                className="input-field password-input"
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="button primary">
            Create Account
          </button>
        </form>

        {/* Social Login */}
        <div className="divider-text">Or Register with</div>
        <div className="social-buttons">
          <button className="social-button">
            {/* Facebook SVG */}
            <svg
              className="w-5 h-5 text-[#1877F2]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
            </svg>
          </button>
          <button className="social-button">
            {/* Google SVG */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
              />
              <path
                fill="#34A853"
                d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
              />
              <path
                fill="#4A90E2"
                d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
              />
              <path
                fill="#FBBC05"
                d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
              />
            </svg>
          </button>
          <button className="social-button">
            {/* Apple SVG */}
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.365 1.43c.126 1.28-.477 2.523-1.24 3.31-.834.88-2.094 1.563-3.33 1.47-.145-1.23.506-2.563 1.26-3.326.866-.874 2.325-1.535 3.31-1.454zM19.965 15.373c-.654 1.48-.934 2.083-1.74 3.31-1.115 1.68-2.685 3.755-4.735 3.765-1.735.015-2.178-1.12-4.505-1.12-2.342 0-2.86 1.11-4.588 1.14-1.845.03-3.33-2-4.395-3.675-3.01-4.735-3.21-10.53-1.46-13.395 1.015-1.695 2.655-2.755 4.44-2.755 2.035 0 3.32 1.155 4.505 1.155 1.135 0 2.99-1.41 5.05-1.2.87.035 3.31.35 4.785 2.615-.125.09-2.915 1.705-2.78 4.735.1 2.67 3.14 3.665 3.225 3.7-.08.25-.505 1.48-1.42 2.95z" />
            </svg>
          </button>
        </div>

        {/* Login Link */}
        <div className="already-account-text">
          Already have an account?{' '}
          <Link to="/login" className="login-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;

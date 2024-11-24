// SignupPage.js
import React, { useState } from 'react';
import supabase from '../../supabaseClient'; // Import Supabase client

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller'); // Default to seller role
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create user in Supabase Auth
      const { user, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      // Insert user data into 'users' table without providing the 'id'
      const { data, error: dbError } = await supabase
        .from('users')
        .insert([{ username, email, role }]);

      if (dbError) {
        throw new Error(dbError.message);
      }

      alert('Signup successful!');
      // Redirect to login or dashboard
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
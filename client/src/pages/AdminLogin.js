import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './admin.css';

export const Adminlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: username,
          Password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;
        console.log('Access Token:', accessToken);

        // Save the token in local storage
        localStorage.setItem('accessToken', accessToken);

        // Redirect to the BookingsList component
        navigate('/bookings'); // Use navigate instead of history.push
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
        setError(errorData.message); // Set error state
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('Unexpected error occurred.'); // Set a generic error message
    }
  };

  return (
    <div className="login-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

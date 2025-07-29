import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../Utilities/api';
import store from '../../Utilities/data-storage';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.post('/login', formData);
      const { success, data, message: responseMessage } = response.data;

      if (success) {
        if (data.user.role === 'assistant') {
          store.set('token', data.token);
          setMessage({ text: 'Login successful', type: 'success' });
          navigate('/');
        } else {
          setMessage({ text: 'You do not have assistant privileges to access the Assistant Dashboard', type: 'error' });
        }
      } else {
        setMessage({ text: responseMessage, type: 'error' });
      }
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Login failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {loading && <h2>Loading...</h2>}
      <form onSubmit={handleSubmit}>
        {message.text && (
          <h3 className={message.type === 'error' ? 'error' : 'success'}>
            {message.text}
          </h3>
        )}
        <label>
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          Login
        </button>
        <button
          type="button"
          onClick={() => setFormData({ email: '', password: '' })}
        >
          Reset
        </button>
        <Link to="/register">Go to Register</Link>
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../Utilities/api';

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });
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

    if (formData.password !== formData.confirm_password) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.post('/register', formData);
      const { success, message: responseMessage } = response.data;

      if (success) {
        setMessage({ text: 'Registration successful', type: 'success' });
        navigate('/login');
      } else {
        setMessage({ text: responseMessage, type: 'error' });
      }
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Registration failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {loading && <h2>Loading...</h2>}
      <form onSubmit={handleSubmit}>
        {message.text && (
          <h3 className={message.type === 'error' ? 'error' : 'success'}>
            {message.text}
          </h3>
        )}
        <label>
          <p>First Name</p>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </label>
        <label>
          <p>Last Name</p>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </label>
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
          <p>Phone</p>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
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
        <label>
          <p>Confirm Password</p>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          Register
        </button>
        <button
          type="button"
          onClick={() => setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            password: '',
            confirm_password: '',
          })}
        >
          Reset
        </button>
        <Link to="/login">Go to Login</Link>
      </form>
    </div>
  );
}
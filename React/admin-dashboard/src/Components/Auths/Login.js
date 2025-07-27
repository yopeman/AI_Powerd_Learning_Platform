import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../Utilities/api';
import store from '../../Utilities/data-storage';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Form submitted:', formData);

    try {
      const response = await authApi.post('/login', formData);
      if (response.data.success) {
      setSuccess('Login successful');
      setError(undefined);
      store.set('token', response.data.data.token);
      navigate('/');
      } else {
      setError(response.data.message);
      setSuccess(undefined);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setSuccess(undefined);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <h3>{JSON.stringify(error)}</h3>
        <h3>{JSON.stringify(success)}</h3>
        <p>Email</p>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
        <p>Password</p>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
        /><br />
        <button type="submit">Login</button>
        <button type="reset" onClick={() => setFormData({
          email: '',
          password: ''
        })}>
          Reset
        </button>
        <Link to="/register"> Go to Register </Link>
      </form>
    </div>
  )
}

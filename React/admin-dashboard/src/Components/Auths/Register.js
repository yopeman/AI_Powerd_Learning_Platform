import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../Utilities/api';
import store from '../../Utilities/data-storage';

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Form submitted:', formData);

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.post('/register', formData);
      if (response.data.success) {
      setSuccess('Registration successful');
      setError(undefined);
      store.set('token', response.data.data.token);
      navigate('/');
      } else {
      setError(response.data.message);
      setSuccess(undefined);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess(undefined);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <h3>{JSON.stringify(error)}</h3>
        <h3>{JSON.stringify(success)}</h3>
        <p>First Name</p>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          placeholder="First Name"
        />
        <p>Last Name</p>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          placeholder="Last Name"
        />
        <p>Email</p>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
        <p>Phone</p>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Phone"
        />
        <p>Password</p>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
        />
        <p>Confirm Password</p>
        <input
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
          placeholder="Confirm Password"
        /><br />
        <button type="submit">Register</button>
        <button type="reset" onClick={() => setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          password: '',
          confirm_password: ''
        })}>
          Reset
        </button>
        <Link to="/login"> Go to Login </Link>
      </form>
    </div>
  )
}

import React, { useState } from 'react';
import { api } from "../../Utilities/api";

export default function CreateUsers() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    role: 'admin' // Default to 'admin'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/users', formData);
      if (response.data.success) {
        setSuccess('Registration successful');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
      role: 'admin',
    });
    setError(null);
    setSuccess(null);
  };

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>Create Users</h1>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      {success && <h3 style={{ color: 'green' }}>{success}</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          <br/> First Name <br/>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </label>
        <label>
          <br/> Last Name <br/>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </label>
        <label>
          <br/> Email Address <br/>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          <br/> Phone Number <br/>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          <br/> Password <br/>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>
          <br/> Confirm Password <br/>
          <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
        </label>
        <label>
          <br/> User Role <br/>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="assistant">Assistant</option>
            <option value="student">Student</option>
          </select>
        </label><br/>
        <button type="submit">Register New User</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
}
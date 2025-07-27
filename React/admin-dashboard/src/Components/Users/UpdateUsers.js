import React, { useEffect, useState } from 'react';
import { api } from "../../Utilities/api";
import { useParams } from "react-router-dom";

export default function UpdateUsers() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    role: 'admin', // Default role
  });

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/users/${id}`);
        if (response.data.success) {
          delete response.data.data.password;
          setFormData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

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
      delete formData.password;
      delete formData.confirm_password;
    } else {
      delete formData.confirm_password;
    }

    try {
      const response = await api.put(`/users/${id}`, formData); // Use PUT for updates
      if (response.data.success) {
        setSuccess('User updated successfully');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
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
      <h1>Update User</h1>
      {error && <h3>Error: {error}</h3>}
      {success && <h3>Success: {success}</h3>}
      <form onSubmit={handleSubmit}>
        {['first_name', 'last_name', 'email', 'phone', 'password', 'confirm_password'].map((field) => {
          const isPassword = field.includes('password');
          const inputType = isPassword ? 'password' : field === 'email' ? 'email' : 'text';

          return (
            <label key={field}>
              <div>{field.replace('_', ' ').toUpperCase()}</div>
              <input
                type={inputType}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={!isPassword} // Only mark as required for non-password fields
              />
            </label>
          );
        })}
        <label>
          <div>User Role</div>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="assistant">Assistant</option>
            <option value="student">Student</option>
          </select>
        </label>
        <div>
          <button type="submit">Update User</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}
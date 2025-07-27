import React, { useEffect, useState } from 'react';
import { api } from "../../Utilities/api";

export default function CreateAssistants() {
  const [formData, setFormData] = useState({
    userId: '',
    fieldId: '',
  });
  const [users, setUsers] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    const fetchFields = async () => {
      try {
        const response = await api.get("/fields");
        setFields(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load fields');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    fetchFields();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post('/assistants', formData);
      if (response.data.success) {
        setSuccess('Assistant creation successful');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Assistant creation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      userId: '',
      fieldId: '',
    });
    setError(null);
    setSuccess(null);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Create Assistants</h1>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      {success && <h3 style={{ color: 'green' }}>{success}</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Users</p>
          <select name="userId" value={formData.userId} onChange={handleChange} required>
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <p>Fields</p>
          <select name="fieldId" value={formData.fieldId} onChange={handleChange} required>
            <option value="">Select a field</option>
            {fields.map(field => (
              <option key={field.id} value={field.id}>
                {field.title}
              </option>
            ))}
          </select>
        </label>
        <div>
          <button type="submit">Assign New Assistant</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}
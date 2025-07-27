import React, { useEffect, useState } from 'react';
import { api } from "../../Utilities/api";
import { useParams } from "react-router-dom";

export default function UpdateAssistants() {
  const [formData, setFormData] = useState({
    userId: '',
    fieldId: '',
  });
  const [users, setUsers] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [assistantResponse, usersResponse, fieldsResponse] = await Promise.all([
          api.get(`/assistants/${id}`),
          api.get("/users"),
          api.get("/fields"),
        ]);

        setFormData(assistantResponse.data.data);
        setUsers(usersResponse.data.data);
        setFields(fieldsResponse.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

    try {
      const response = await api.put(`/assistants/${id}`, formData);
      if (response.data.success) {
        setSuccess('Assistant updated successfully');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Assistant update failed');
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
      <h1>Update Assistants</h1>
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
          <button type="button" onClick={handleSubmit}>Update Assistant</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}
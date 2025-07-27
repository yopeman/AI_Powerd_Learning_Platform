import React, { useState } from 'react';
import { api } from "../../Utilities/api";

export default function CreateFields() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    years_length: 0,
    isFree: false,
    number_of_free_topics: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'isFree' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post('/fields', formData);
      if (response.data.success) {
        setSuccess('Field created successfully');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Field creation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      years_length: 0,
      isFree: false,
      number_of_free_topics: 0,
    });
    setError(null);
    setSuccess(null);
  };

  return (
    <div>
      <h1>Create Fields</h1>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      {success && <h3 style={{ color: 'green' }}>{success}</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Title</p>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <p>Description</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={7}
            style={{ width: '90%' }}
            required
          />
        </label>

        <label>
          <p>Years Length</p>
          <input
            type="number"
            name="years_length"
            value={formData.years_length}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <p>Is Free</p>
          <select
            name="isFree"
            value={formData.isFree}
            onChange={handleChange}
            required
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>

        <label>
          <p>Number Of Free Topics</p>
          <input
            type="number"
            name="number_of_free_topics"
            value={formData.number_of_free_topics}
            onChange={handleChange}
            required
          />
        </label>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Fields'}
          </button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}
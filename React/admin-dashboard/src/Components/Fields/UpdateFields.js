import React, { useEffect, useState } from 'react';
import { api } from "../../Utilities/api";
import { useParams } from "react-router-dom";

export default function UpdateFields() {
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
  const { id } = useParams();

  useEffect(() => {
    const fetchField = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/fields/${id}`);
        if (response.data.success) {
          setFormData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch field');
      } finally {
        setLoading(false);
      }
    };

    fetchField();
  }, [id]);

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
      const response = await api.put(`/fields/${id}`, formData);
      if (response.data.success) {
        setSuccess('Field updated successfully');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Field update failed');
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
      <h1>Update Fields</h1>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      {success && <h3 style={{ color: 'green' }}>{success}</h3>}
      <form onSubmit={handleSubmit}>
        {[
          { name: 'title', type: 'text', label: 'Title' },
          { name: 'description', type: 'textarea', label: 'Description', rows: 7 },
          { name: 'years_length', type: 'number', label: 'Years Length' },
          { name: 'number_of_free_topics', type: 'number', label: 'Number Of Free Topics' },
        ].map(({ name, type, label, rows }) => (
          <label key={name}>
            <p>{label}</p>
            {type === 'textarea' ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                rows={rows}
                style={{ width: '90%' }}
                required
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
              />
            )}
          </label>
        ))}

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

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Fields'}
          </button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}
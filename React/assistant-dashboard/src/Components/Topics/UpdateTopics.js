import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { api } from "../../Utilities/api";
import { InputField } from "../Courses/CreateCourses";

export default function UpdateTopics() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [initialValue, setInitialValue] = useState('');

  useEffect(() => {
    const fetchTopic = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/topics/${id}`);
        if (response.data.success) {
          const topic = response.data.data;
          setFormData({ title: topic.title });
          setInitialValue(topic.title);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch topic');
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
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
      const response = await api.put(`/topics/${id}`, formData);
      if (response.data.success) {
        setSuccess(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Topic update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ title: initialValue });
    setError(null);
    setSuccess(null);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Update Topic</h1>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      {success && <h3 style={{ color: 'green' }}>{success}</h3>}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Topic Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit" disabled={loading}>Update Topic</button>
        <button type="button" onClick={handleReset} disabled={loading}>Reset</button>
      </form>
    </div>
  );
}
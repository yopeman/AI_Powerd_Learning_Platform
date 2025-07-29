import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {api} from "../../Utilities/api";
import {InputField, SelectField} from "../Courses/CreateCourses";

export default function UpdateChapters() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/chapters/${id}`);
        if (response.data.success) {
          const { courseId, ...chapterData } = response.data.data; // Destructure to remove courseId
          setFormData(chapterData);
          setInitialValues(chapterData);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch chapter');
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
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
      const response = await api.put(`/chapters/${id}`, formData);
      if (response.data.success) {
        setSuccess(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Chapter update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialValues);
    setError(null);
    setSuccess(null);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Update Chapter</h1>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      {success && <h3 style={{ color: 'green' }}>{success}</h3>}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Chapter Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <InputField
          label="Chapter Description"
          type="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Update Chapter</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
}
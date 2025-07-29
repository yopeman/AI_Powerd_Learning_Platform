import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from "../../Utilities/api";
import { InputField, SelectField } from './CreateCourses';

export default function UpdateCourses() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: 0,
    semester: 1,
    chapters_length: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/courses/${id}`);
        if (response.data.success) {
          const { fieldId, ...courseData } = response.data.data; // Destructure to remove fieldId
          setFormData(courseData);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
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
      const response = await api.put(`/courses/${id}`, formData);
      if (response.data.success) {
        setSuccess(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Course update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      year: 0,
      semester: 1,
      chapters_length: 0,
    });
    setError(null);
    setSuccess(null);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Update Course</h1>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      {success && <h3 style={{ color: 'green' }}>{success}</h3>}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Course Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <InputField
          label="Course Description"
          type="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <InputField
          label="Year"
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <SelectField
          label="Semester"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          options={[
            { id: 1, title: 'Semester - I' },
            { id: 2, title: 'Semester - II' },
            { id: 3, title: 'Semester - III' },
            { id: 4, title: 'Semester - IV' },
            { id: 5, title: 'Semester - V' },
          ]}
        />
        <InputField
          label="Chapters Length"
          type="number"
          name="chapters_length"
          value={formData.chapters_length}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Update Course</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
}
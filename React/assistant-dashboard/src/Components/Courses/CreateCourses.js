import React, { useState } from 'react';
import { api } from '../../Utilities/api';
import {useParams} from "react-router-dom";

export default function CreateCourses() {
  const { fieldId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fieldId: fieldId,
    year: 0,
    semester: 1,
    chapters_length: 0,
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

    try {
      const response = await api.post('/courses', formData);
      if (response.data.success) {
        setSuccess('Course creation successful');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Course creation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      fieldId: fieldId,
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
      <h1>Create Courses</h1>
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
        /><br/>
        <button type="submit">Register New Course</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
}

// Reusable Input Field Component
export const InputField = ({ label, type, name, value, onChange, required }) => (
  <label>
    <br /> {label} <br />
    {type === 'textarea' ? (
      <textarea name={name} value={value} onChange={onChange} required={required}></textarea>
    ) : (
      <input type={type} name={name} value={value} onChange={onChange} required={required} />
    )}
  </label>
);

// Reusable Select Field Component
export const SelectField = ({ label, name, value, onChange, options }) => (
  <label>
    <br /> {label} <br />
    <select name={name} value={value} onChange={onChange}>
      <option value="" disabled>Select {label}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>{option.title}</option>
      ))}
    </select>
  </label>
);
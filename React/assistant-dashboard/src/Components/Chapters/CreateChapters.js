import React, { useEffect, useState } from 'react';
import { api } from "../../Utilities/api";
import { useParams } from "react-router-dom";

export const FormConstructor = ({ chapters, handleChange, handleSubmit, handleReset }) => (
  <div>
    <form onSubmit={handleSubmit}>
      {chapters.map((chapter, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <label>
            <strong>Chapter {index + 1}</strong>
            <br />
            Title:
            <input
              type="text"
              value={chapter.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              value={chapter.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              required
            />
          </label>
        </div>
      ))}
      <button type="submit">Create New Chapters</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  </div>
);

const CreateChapters = () => {
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/courses/${courseId}`);
        if (response.data.success) {
          setCourse(response.data.data);
          setChapters(Array.from({ length: response.data.data.chapters_length }, (_, index) => ({
            order: index + 1,
            title: '',
            description: '',
          })));
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleChange = (index, field, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);
  };

  const handleReset = () => {
    setChapters(Array.from({ length: course.chapters_length }, (_, index) => ({
      order: index + 1,
      title: '',
      description: '',
    })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post('/chapters', { courseId, chapters });
      if (response.data.success) {
        setSuccess(response?.data?.message || 'Chapters creation successful');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Chapters creation failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Create Chapters</h1>
      { success && <h3>{success}</h3>}
      { error && <h3 style={{color: 'red'}}>{error}</h3>}
      {course && <FormConstructor chapters={chapters} handleChange={handleChange} handleSubmit={handleSubmit} handleReset={handleReset} />}
    </div>
  );
};

export default CreateChapters;
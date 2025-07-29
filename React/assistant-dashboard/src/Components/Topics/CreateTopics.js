import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {api} from "../../Utilities/api";

export default function CreateTopics() {
  const [topics, setTopics] = useState(['']); // Initialize with one input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);


  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/chapters/${chapterId}`);
        if (response.data.success) {
          setChapter(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [chapterId]);


  const handleInputChange = (index, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index] = value;
    setTopics(updatedTopics);
  };

  const handleAddTopic = () => {
    setTopics([...topics, '']); // Add an empty string for a new input
  };

  const handleRemoveTopic = () => {
    if (topics.length > 1) {
      const updatedTopics = topics.slice(0, -1); // Remove the last topic
      setTopics(updatedTopics);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted Topics:', topics);
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post('/topics', { chapterId, titles: topics });
      if (response.data.success) {
        setSuccess(response?.data?.message || 'Topics creation successful');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Topics creation failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (!chapter) return <h1>Chapter not found</h1>;

  return (
    <div>
      <h1>Create Topics</h1>
      <h3>{success}</h3>
      <h3>{error}</h3>
      <form onSubmit={handleSubmit}>
        {topics.map((topic, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={topic}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Topic ${index + 1}`}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddTopic}>Add Topic</button>
        <button type="button" onClick={handleRemoveTopic} disabled={topics.length <= 1}>Remove Topic</button>
        <button type="submit">Save Topics</button>
      </form>
    </div>
  );
}
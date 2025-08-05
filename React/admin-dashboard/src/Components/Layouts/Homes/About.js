import React, {useState} from 'react'
import {api} from "../../../Utilities/api";

export default function About() {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(3);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await api.post('/feedbacks', { content, rating });
      if (response.data.success) {
        setSuccess('Feedback successfully submitted');
        setContent('');
        setRating(3);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Feedback submition failed');
    } finally {
      setLoading(false);
    }
  }

  const handleReset = () => {
    setContent('');
    setRating(3);
    setError(null);
    setSuccess(null);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>About Us</h1>
      <p>This is AiPLP learning platform.</p>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <textarea value={content} onChange={e => setContent(e.target.value)} required/>
      <select value={rating} onChange={e => setRating(e.target.value)} required>
        <option value={1}>*</option>
        <option value={2}>**</option>
        <option value={3}>***</option>
        <option value={4}>****</option>
        <option value={5}>*****</option>
      </select>
      <button type='button' onClick={handleSubmit}>Submit</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </div>
  )
}

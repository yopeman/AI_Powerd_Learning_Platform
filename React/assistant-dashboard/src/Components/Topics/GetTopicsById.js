import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {api} from "../../Utilities/api";

export default function GetTopicsById() {
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTopic = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/topics/${id}`);
        if (response.data.success) {
          setTopic(response.data.data);
          console.log(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch topics');
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  if (!topic) return <h1>Topics not found</h1>;

  return (
    <div>
      <h1>Topics Details</h1>
      <ul>
        <li><b>Title</b>: {topic.title}</li>
        <li><strong>Created At</strong>: {new Date(topic.createdAt).toLocaleString()}</li>
        <li><strong>Updated At</strong>: {new Date(topic.updatedAt).toLocaleString()}</li>
        <li><Link to={`/chapters/get/${topic.chapterId}`}>Chapters Details</Link></li>
      </ul>
    </div>
  )
}


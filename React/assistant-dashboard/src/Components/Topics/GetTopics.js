import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { api } from "../../Utilities/api";

export default function GetTopics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 15;
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [topicsResponse, chapterResponse] = await Promise.all([
          api.get(`/chapters/${chapterId}/topics`),
          api.get(`/chapters/${chapterId}`)
        ]);

        setTopics(topicsResponse.data.data);
        if (chapterResponse.data.success) {
          setChapter(chapterResponse.data.data);
        } else {
          setError(chapterResponse.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chapterId]);

  const paginatedTopics = () => topics.slice(offset, offset + limit);

  const handleNextPage = () => {
    if (offset + limit < topics.length) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1>Get Topics</h1>
      {chapter && (
        <ul>
          <li><strong>Order</strong>: Chapter - {chapter.order}</li>
          <li><strong>Title</strong>: {chapter.title}</li>
          <li><strong>Description</strong>: {chapter.description}</li>
          <li><strong>Created At</strong>: {new Date(chapter.createdAt).toLocaleString()}</li>
          <li><strong>Updated At</strong>: {new Date(chapter.updatedAt).toLocaleString()}</li>
          <li><Link to={`/courses/get/${chapter.courseId}`}>Course Details</Link></li>
        </ul>
      )}
      <table border={1}>
        <caption>
          <span style={{ float: 'right' }}>
            <Link to={`/topics/create/${chapterId}`}>Create New Topics</Link>
          </span>
        </caption>
        <thead>
        <tr>
          <th>Title</th>
          <th>Detail</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {paginatedTopics().length > 0 ? (
          paginatedTopics().map((topic) => (
            <tr key={topic.id}>
              <td>{topic.title}</td>
              <td><Link to={`/topics/get/${topic.id}`}>Detail</Link></td>
              <td><Link to={`/topics/update/${topic.id}`}>Update</Link></td>
              <td><Link to={`/topics/delete/${topic.id}`}>Delete</Link></td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>No topics available</td>
          </tr>
        )}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={offset === 0}>&lt;</button>
        <button onClick={handleNextPage} disabled={offset + limit >= topics.length}>&gt;</button>
      </div>
    </div>
  );
}
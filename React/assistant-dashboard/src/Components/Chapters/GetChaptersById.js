import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {api} from "../../Utilities/api";

export default function GetChaptersById() {
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/chapters/${id}`);
        if (response.data.success) {
          setChapter(response.data.data);
          console.log(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch chapters');
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  if (!chapter) return <h1>Chapters not found</h1>;

  return (
    <div>
      <h1>Chapters Details</h1>
      <ul>
        <li><b>Order</b>: Chapter - {chapter.order}</li>
        <li><b>Title</b>: {chapter.title}</li>
        <li><b>Description</b>: {chapter.description}</li>
        <li><strong>Created At</strong>: {new Date(chapter.createdAt).toLocaleString()}</li>
        <li><strong>Updated At</strong>: {new Date(chapter.updatedAt).toLocaleString()}</li>
        <li><Link to={`/courses/get/${chapter.courseId}`}>Courses Details</Link></li>
      </ul>
    </div>
  )
}

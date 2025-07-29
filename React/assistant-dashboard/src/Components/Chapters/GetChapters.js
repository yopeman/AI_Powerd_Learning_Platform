import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {api} from "../../Utilities/api";

export default function GetChapters() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 15;
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/courses/${courseId}/chapters`);
        setChapters(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load chapters');
      } finally {
        setLoading(false);
      }
    };

    const fetchCourse = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/courses/${courseId}`);
        if (response.data.success) {
          setCourse(response.data.data);
          console.log(response.data.data);
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
    fetchChapters();
  }, [courseId]);

  const paginatedChapters = () => chapters.slice(offset, offset + limit);

  const handleNextPage = () => {
    if (offset + limit < chapters.length) {
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
      <h1>Get Chapters</h1>
      <ul>
        <li><b>Title</b>: {course.title}</li>
        <li><b>Description</b>: {course.description}</li>
        <li><b>Year</b>: {course.year}</li>
        <li><b>Semester</b>: {course.semester}</li>
        <li><b>Chapters Length</b>: {course.chapters_length}</li>
        <li><strong>Created At</strong>: {new Date(course.createdAt).toLocaleString()}</li>
        <li><strong>Updated At</strong>: {new Date(course.updatedAt).toLocaleString()}</li>
        <li><Link to={`/fields/get/${course.fieldId}`}>Field Details</Link></li>
      </ul>
      <table border={1}>
        <caption>
          {/*<span style={{ float: 'right' }}><Link to={`/chapters/create/${courseId}`}>Create New Chapters</Link></span>*/}
        </caption>
        <thead>
        <tr>
          <th>Order</th>
          <th>Title</th>
          <th>Detail</th>
          <th>Update</th>
          <th>Delete</th>
          <th>Topics</th>
          <th>New Topics</th>
        </tr>
        </thead>
        <tbody>
        {paginatedChapters().length && paginatedChapters().map((chapter) => (
          <tr key={chapter.id}>
            <td>Chapter - {chapter.order}</td>
            <td>{chapter.title}</td>
            <td><Link to={`/chapters/get/${chapter.id}`}>Detail</Link></td>
            <td><Link to={`/chapters/update/${chapter.id}`}>Update</Link></td>
            <td><Link to={`/chapters/delete/${chapter.id}`}>Delete</Link></td>
            <td><Link to={`/topics/list/${chapter.id}`}>Topics</Link></td>
            <td><Link to={`/topics/create/${chapter.id}`}>Create Topics</Link></td>
          </tr>
        ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={offset === 0}>&lt;</button>
        <button onClick={handleNextPage} disabled={offset + limit >= chapters.length}>&gt;</button>
      </div>
    </div>
  )
}

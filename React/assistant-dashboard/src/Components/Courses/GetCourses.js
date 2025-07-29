import React, {useEffect, useState} from 'react'
import {api} from "../../Utilities/api";
import {Link, useParams} from "react-router-dom";

export default function GetCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 15;
  const { fieldId } = useParams();
  const [field, setField] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/fields/${fieldId}/courses`);
        setCourses(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    const fetchField = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/fields/${fieldId}`);
        if (response.data.success) {
          setField(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch fields');
      } finally {
        setLoading(false);
      }
    };

    fetchField();
    fetchCourses();
  }, [fieldId]);

  const paginatedCourses = () => courses.slice(offset, offset + limit);

  const handleNextPage = () => {
    if (offset + limit < courses.length) {
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
      <h1>Get Courses</h1>
      <ul>
        <li><b>Title</b>: {field.title}</li>
        <li><b>Description</b>: {field.description}</li>
        <li><b>Years Length</b>: {field.years_length}</li>
        <li><b>Is Free</b>: {`${field.isFree}`}</li>
        <li><b>Number Of Free Topics</b>: {field.number_of_free_topics}</li>
        <li><Link to={`/fields/get/${fieldId}`}>Field Details</Link></li>
      </ul>
      <table border={1}>
        <caption>
          <span style={{ float: 'right' }}><Link to={`/courses/create/${fieldId}`}>Create New Courses</Link></span>
        </caption>
        <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Semester</th>
          <th>Chapters Length</th>
          <th>Detail</th>
          <th>Update</th>
          <th>Delete</th>
          <th>Chapters</th>
          <th>New Chapters</th>
        </tr>
        </thead>
        <tbody>
        {paginatedCourses().length && paginatedCourses().map((course) => (
          <tr key={course.id}>
            <td>{course.title}</td>
            <td>{course.year}</td>
            <td>{course.semester}</td>
            <td>{course.chapters_length}</td>
            <td><Link to={`/courses/get/${course.id}`}>Detail</Link></td>
            <td><Link to={`/courses/update/${course.id}`}>Update</Link></td>
            <td><Link to={`/courses/delete/${course.id}`}>Delete</Link></td>
            <td><Link to={`/chapters/list/${course.id}`}>Chapters</Link></td>
            <td><Link to={`/chapters/create/${course.id}`}>Create Chapters</Link></td>
          </tr>
        ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={offset === 0}>&lt;</button>
        <button onClick={handleNextPage} disabled={offset + limit >= courses.length}>&gt;</button>
      </div>
    </div>
  )
}

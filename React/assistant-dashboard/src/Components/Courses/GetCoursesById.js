import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {api} from "../../Utilities/api";

export default function GetCoursesById() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/courses/${id}`);
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

    fetchCourses();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  if (!course) return <h1>Courses not found</h1>;

  return (
    <div>
      <h1>Courses Details</h1>
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
    </div>
  )
}

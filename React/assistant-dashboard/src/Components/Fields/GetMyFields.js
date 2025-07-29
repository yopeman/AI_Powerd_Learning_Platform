import React, {useEffect, useState} from 'react'
import {api} from "../../Utilities/api";
import {Link} from "react-router-dom";

export default function GetMyFields() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 15;

  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/assistants/me/fields");
        setFields(response.data.data.fields);
        console.log(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load fields');
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, []);

  const paginatedFields = () => fields.slice(offset, offset + limit);

  const handleNextPage = () => {
    if (offset + limit < fields.length) {
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
      <h1>Get My Fields</h1>
      <table border={1}>
        <thead>
        <tr>
          <th>Title</th>
          <th>Years Length</th>
          <th>Number Of Free Topics</th>
          <th>isFree</th>
          <th>Detail</th>
          <th>Courses</th>
          <th>New Courses</th>
        </tr>
        </thead>
        <tbody>
        {paginatedFields().length && paginatedFields().map((field) => (
          <tr key={field.id}>
            <td>{field.title}</td>
            <td>{field.years_length}</td>
            <td>{field.number_of_free_topics}</td>
            <td>{`${field.isFree}`}</td>
            <td><Link to={`/fields/get/${field.id}`}>Detail</Link></td>
            <td><Link to={`/courses/list/${field.id}`}>Courses</Link></td>
            <td><Link to={`/courses/create/${field.id}`}>Create Courses</Link></td>
          </tr>
        ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={offset === 0}>&lt;</button>
        <button onClick={handleNextPage} disabled={offset + limit >= fields.length}>&gt;</button>
      </div>
    </div>
  )
}

import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {api} from "../../Utilities/api";

export default function GetFieldsById() {
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchField = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/fields/${id}`);
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
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  if (!field) return <h1>Field not found</h1>;

  return (
    <div>
      <h1>Get Fields</h1>
      <ul>
        <li><b>Title</b>: {field.title}</li>
        <li><b>Description</b>: {field.description}</li>
        <li><b>Years Length</b>: {field.years_length}</li>
        <li><b>Is Free</b>: {`${field.isFree}`}</li>
        <li><b>Number Of Free Topics</b>: {field.number_of_free_topics}</li>
        <li><strong>Created At</strong>: {new Date(field.createdAt).toLocaleString()}</li>
        <li><strong>Updated At</strong>: {new Date(field.updatedAt).toLocaleString()}</li>
        <li><Link to={`/fields/subscription/${field.id}`}>Subscription Status</Link></li>
        <li><Link to={`/fields/update/${field.id}`}>Update Field</Link></li>
        <li><Link to={`/fields/delete/${field.id}`}>Delete Field</Link></li>
      </ul>
    </div>
  )
}

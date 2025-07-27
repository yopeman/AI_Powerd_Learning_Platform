import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { api } from "../../Utilities/api";

export default function GetAssistantsById() {
  const [assistant, setAssistant] = useState(null);
  const [user, setUser] = useState(null);
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const assistantResponse = await api.get(`/assistants/${id}`);
        if (assistantResponse.data.success) {
          const assistantData = assistantResponse.data.data;
          setAssistant(assistantData);

          const userResponse = await api.get(`/users/${assistantData.userId}`);
          if (userResponse.data.success) {
            setUser(userResponse.data.data);
          } else {
            setError(userResponse.data.message);
            return;
          }

          const fieldResponse = await api.get(`/fields/${assistantData.fieldId}`);
          if (fieldResponse.data.success) {
            setField(fieldResponse.data.data);
          } else {
            setError(fieldResponse.data.message);
          }
        } else {
          setError(assistantResponse.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  if (!user) return <h1>User not found</h1>;
  if (!field) return <h1>Field not found</h1>;

  return (
    <div>
      <h1>Field Assistants Details</h1>
      <h3>User Details</h3>
      <ul>
        <li><strong>Full Name</strong>: {user.first_name} {user.last_name}</li>
        <li><strong>Email</strong>: {user.email}</li>
        <li><strong>Phone Number</strong>: {user.phone}</li>
        <li><strong>Role</strong>: {user.role}</li>
        <li><strong>Created At</strong>: {new Date(user.createdAt).toLocaleString()}</li>
        <li><strong>Updated At</strong>: {new Date(user.updatedAt).toLocaleString()}</li>
        <li><Link to={`/users/update/${user.id}`}>Update User</Link></li>
        <li><Link to={`/users/delete/${user.id}`}>Delete User</Link></li>
      </ul>
      <h3>Field Details</h3>
      <ul>
        <li><strong>Title</strong>: {field.title}</li>
        <li><strong>Description</strong>: {field.description}</li>
        <li><strong>Years Length</strong>: {field.years_length}</li>
        <li><strong>Is Free</strong>: {field.isFree ? 'Yes' : 'No'}</li>
        <li><strong>Number Of Free Topics</strong>: {field.number_of_free_topics}</li>
        <li><strong>Created At</strong>: {new Date(field.createdAt).toLocaleString()}</li>
        <li><strong>Updated At</strong>: {new Date(field.updatedAt).toLocaleString()}</li>
        <li><Link to={`/fields/subscription/${field.id}`}>Subscription Status</Link></li>
        <li><Link to={`/fields/update/${field.id}`}>Update Field</Link></li>
        <li><Link to={`/fields/delete/${field.id}`}>Delete Field</Link></li>
      </ul>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { api } from "../../Utilities/api";
import { Link, useParams } from "react-router-dom";

export default function GetUsersById() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/users/${id}`);
        if (response.data.success) {
          setUser(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  if (!user) return <h1>User not found</h1>;

  return (
    <div>
      <h1>User Details</h1>
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
    </div>
  );
}
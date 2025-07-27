import React, { useEffect, useState } from 'react';
import { api } from "../../Utilities/api";
import {Link} from "react-router-dom";

export default function GetUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 15;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/users");
        setUsers(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const paginatedUsers = () => users.slice(offset, offset + limit);

  const handleNextPage = () => {
    if (offset + limit < users.length) {
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
      <h1>Get Users</h1>
      <table border={1}>
        <thead>
        <tr>
          <th>Full Name</th>
          <th>Role</th>
          <th>Detail</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {paginatedUsers().length && paginatedUsers().map((user) => (
          <tr key={user.id}>
            <td>{user.first_name} {user.last_name}</td>
            <td>{user.role}</td>
            <td><Link to={`/users/get/${user.id}`}>Detail</Link></td>
            <td><Link to={`/users/update/${user.id}`}>Update</Link></td>
            <td><Link to={`/users/delete/${user.id}`}>Delete</Link></td>
          </tr>
        ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={offset === 0}>&lt;</button>
        <button onClick={handleNextPage} disabled={offset + limit >= users.length}>&gt;</button>
      </div>
    </div>
  );
}
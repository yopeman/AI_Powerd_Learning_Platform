import React, { useEffect, useState } from 'react';
import { api } from "../../Utilities/api";
import {Link, useParams} from "react-router-dom";

export default function SubscriptionFields() {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 15;
  const { id } = useParams();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/fields/${id}/subscriptions`);
        const data = response.data.data;
        console.log(data);
        setUsers(data.users);
        setSubscriptions(data.subscriptions);
        setField(data.field);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load field subscription status');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const paginatedUsersAndSubscriptions = () => {
    const paginatedUsers = users.slice(offset, offset + limit);
    const paginatedSubscriptions = subscriptions.slice(offset, offset + limit);

    return paginatedUsers.map((user, index) => ({
      user,
      subscription: paginatedSubscriptions[index],
    }));
  };

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
      <h1>Subscription Fields</h1>
      {field && (
        <ul>
          <li><b>Field Title</b>: {field.title}</li>
          <li><b>Field Description</b>: {field.description}</li>
          <li><Link to={`/fields/get/${field.id}`}>More</Link></li>
        </ul>
      )}
      <table border={1}>
        <thead>
        <tr>
          <th>Student Name</th>
          <th>Subscription Status</th>
          <th>Learned Topic Numbers</th>
          <th>Student Detail</th>
        </tr>
        </thead>
        <tbody>
        {paginatedUsersAndSubscriptions().map(({ user, subscription }) => (
          <tr key={user.id}>
            <td>{user.first_name} {user.last_name}</td>
            <td>{subscription?.status || 'N/A'}</td>
            <td>{subscription?.learned_topic_numbers || 0}</td>
            <td><Link to={`/users/get/${user.id}`}>Detail</Link></td>
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
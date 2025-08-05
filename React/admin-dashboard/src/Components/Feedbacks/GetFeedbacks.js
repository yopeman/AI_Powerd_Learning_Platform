import React, {useEffect, useState} from 'react'
import {api} from "../../Utilities/api";
import {Link} from "react-router-dom";

export default function GetFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 15;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [feedbacksResponse, usersResponse] = await Promise.all([
          api.get("/feedbacks"),
          api.get("/users"),
        ]);

        setFeedbacks(feedbacksResponse.data.data);
        setUsers(usersResponse.data.data);
        console.log(feedbacksResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const paginatedFeedbacks = () => feedbacks.slice(offset, offset + limit);

  const getUserById = (uid) => users.find((user) => user.id === uid);
  const handleNextPage = () => {
    if (offset + limit < feedbacks.length) {
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
      <h1>Get Feedbacks</h1>
      <table border={1}>
        <thead>
        <tr>
          <th>User Name</th>
          <th>User Detail</th>
          <th>Rating</th>
          <th>Detail</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {paginatedFeedbacks().map((feedback) => {
          const user = getUserById(feedback.userId);
          return (
            <tr key={feedback.id}>
              <td>{user ? `${user.first_name} ${user.last_name}` : 'Unknown User'}</td>
              <td>
                {user && <Link to={`/users/get/${user.id}`}>User Detail</Link>}
              </td>
              <td>
                {feedback.rating}
              </td>
              <td>
                <Link to={`/feedbacks/get/${feedback.id}`}>Detail</Link>
              </td>
              <td>
                <Link to={`/feedbacks/delete/${feedback.id}`}>Delete</Link>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={offset === 0}>&lt;</button>
        <button onClick={handleNextPage} disabled={offset + limit >= feedbacks.length}>&gt;</button>
      </div>
    </div>
  );
}
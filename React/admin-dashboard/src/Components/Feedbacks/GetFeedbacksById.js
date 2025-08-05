import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {api} from "../../Utilities/api";

export default function GetFeedbacksById() {
  const [feedback, setFeedback] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const feedbackResponse = await api.get(`/feedbacks/${id}`);
        if (feedbackResponse.data.success) {
          const feedbackData = feedbackResponse.data.data;
          setFeedback(feedbackData);

          const userResponse = await api.get(`/users/${feedbackData.userId}`);
          if (userResponse.data.success) {
            setUser(userResponse.data.data);
          } else {
            setError(userResponse.data.message);
            return;
          }
        } else {
          setError(feedbackResponse.data.message);
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

  return (
    <div>
      <h1>Feedbacks Details</h1>
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
      <h3>Feedbacks Details</h3>
      <ul>
        <li><strong>Contents</strong>: {feedback.content}</li>
        <li><strong>Rating</strong>: {feedback.rating}</li>
        <li><strong>Created At</strong>: {new Date(feedback.createdAt).toLocaleString()}</li>
        <li><strong>Updated At</strong>: {new Date(feedback.updatedAt).toLocaleString()}</li>
      </ul>
    </div>
  );
}
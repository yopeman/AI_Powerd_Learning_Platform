import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";
import Loader from '../Loader';

export default function DeleteUsers() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAndDelete = async () => {
      try {
        // First get user details
        const userResponse = await api.get(`/users/${id}`);
        if (userResponse.data.success) {
          setUser(userResponse.data.data);
          
          // Then delete the user
          const deleteResponse = await api.delete(`/users/${id}`);
          if (deleteResponse.data.success) {
            setSuccess('User deleted successfully');
          } else {
            setError(deleteResponse.data.message);
          }
        } else {
          setError(userResponse.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user');
      } finally {
        setLoading(false);
      }
    };

    fetchAndDelete();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Delete User</h1>
      </div>
      
      <div className="card-body">
        {success ? (
          <div>
            <div className="success-message">{success}</div>
            {user && (
              <div className="user-info">
                <div className="user-name">{user.first_name} {user.last_name}</div>
                <div className="user-email">{user.email}</div>
              </div>
            )}
            <div className="button-group">
              <button 
                className="primary-btn"
                onClick={() => navigate('/users/get')}
              >
                Back to User List
              </button>
            </div>
          </div>
        ) : (
          <div className="error-message">User deletion failed: {error}</div>
        )}
      </div>
    </div>
  );
}
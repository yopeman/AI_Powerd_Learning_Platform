import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {api} from "../../Utilities/api";

export default function DeleteFeedbacks() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { id } = useParams();
  let isOnes = false;

  useEffect(() => {
    if (isOnes) return;
    isOnes = true;

    const deleteFeedback = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.delete(`/feedbacks/${id}`);
        if (response.data.success) {
          setSuccess(response.data.message);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete feedback');
      } finally {
        setLoading(false);
      }
    };

    deleteFeedback();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1>Delete Feedback</h1>
      {success && <h3>{success}</h3>}
    </div>
  );
}
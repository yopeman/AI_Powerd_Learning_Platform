import React, {useEffect, useState} from 'react';
import {api} from "../../Utilities/api";

export default function FeedbackAnalytics() {
  const [analytic, setAnalytic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytic = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/analytics/feedbacks`);
        if (response.data.success) {
          setAnalytic(response.data.data);
          console.log(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch analytic data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytic();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  if (!analytic) return <h1>Analytic not found</h1>;

  return (
    <div>
      <h1>Feedback Analytics</h1>
      <ul>
        <li><b>Total Feedbacks</b>: {analytic.totalFeedbacks}</li>
        <li><b>Average Rating</b>: {analytic.averageRating}</li>
      </ul>
    </div>
  )
}

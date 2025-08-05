import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {api} from "../../Utilities/api";

export default function SubscriptionAnalytics() {
  const [analytic, setAnalytic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytic = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/analytics/subscriptions`);
        if (response.data.success) {
          setAnalytic(response.data.data);
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
      <h1>Subscription Analytics</h1>
      <ul>
        <li><b>Total Subscriptions</b>: {analytic.totalSubscriptions}</li>
        <li><b>Active Subscriptions</b>: {analytic.activeSubscriptions}</li>
        <li><b>Inactive Subscriptions</b>: {analytic.inactiveSubscriptions}</li>
        <li><b>Average Learned Topics</b>: {analytic.avgLearnedTopics}</li>
      </ul>
    </div>
  )
}

import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {api} from "../../Utilities/api";

export default function FieldAnalytics() {
  const [analytic, setAnalytic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytic = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/analytics/payments`);
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
      <h1>Payment Analytics</h1>
      <ul>
        <li><b>Total Payments</b>: {analytic.totalPayments}</li>
        <li><b>Completed Payments</b>: {analytic.completedPayments}</li>
        <li><b>Pending Payments</b>: {analytic.pendingPayments}</li>
        <li><b>Failed Payments</b>: {analytic.failedPayments}</li>
        <li><b>Total Revenue</b>: {analytic.totalRevenue}</li>
      </ul>
    </div>
  )
}

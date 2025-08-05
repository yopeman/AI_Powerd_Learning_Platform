import React, {useEffect, useState} from 'react';
import {api} from "../../Utilities/api";

export default function CertificationAnalytics() {
  const [analytic, setAnalytic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytic = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/analytics/certifications`);
        if (response.data.success) {
          setAnalytic(response.data.data);
          console.log(response.data);
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
      <h1>Certification Analytics</h1>
      <ul>
        <li><b>Total Results</b>: {analytic.totalResults}</li>
        <li><b>Average Score</b>: {analytic.averageScore}</li>
      </ul>
    </div>
  )
}

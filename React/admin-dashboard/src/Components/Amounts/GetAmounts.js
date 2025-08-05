import React, { useEffect, useState } from 'react';
import { api } from '../../Utilities/api';

export default function GetAmounts() {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const response = await api.get('/amounts');
        setAmount(response.data.data.amount);
        console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAmount();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Get Amounts</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <h3>
          <b>Amount = </b> {amount}
        </h3>
      )}
    </div>
  );
}
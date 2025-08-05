import React, {useEffect, useState} from 'react'
import {api} from "../../Utilities/api";

export default function UpdateAmounts() {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [initialValue, setInitialValue] = useState(0);

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const response = await api.get('/amounts');
        setAmount(response.data.data.amount);
        setInitialValue(response.data.data.amount);
        console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAmount();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await api.put('/amounts', { amount });
      if (response.data.success) {
        setSuccess('Amount successfully updated');
        setInitialValue(amount);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Assistant creation failed');
    } finally {
      setLoading(false);
    }
  }

  const handleReset = () => {
    setAmount(initialValue);
    setError(null);
    setSuccess(null);
  };




  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Update Amounts</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          {success && (<p>{success}</p>)}
          <input type='number' value={amount} onChange={e => setAmount(e.target.value)} />
          <button type='button' onClick={handleSubmit}>Update</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </>
      )}
    </div>
  );
}
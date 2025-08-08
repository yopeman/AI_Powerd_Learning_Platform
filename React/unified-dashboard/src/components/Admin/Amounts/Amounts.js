import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { api } from '../../../utils/api';
import LoadingSpinner from '../../Common/LoadingSpinner';
import Message from '../../Common/Message';
import { FiDollarSign, FiSave, FiRefreshCw } from 'react-icons/fi';

export default function Amounts() {
  const [amount, setAmount] = useState(0);
  const [originalAmount, setOriginalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { theme } = useTheme();

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const response = await api.get('/amounts');
        if (response.data.success) {
          setAmount(response.data.data.amount);
          setOriginalAmount(response.data.data.amount);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load amount');
      } finally {
        setLoading(false);
      }
    };

    fetchAmount();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.put('/amounts', { amount: parseFloat(amount) });
      if (response.data.success) {
        setSuccess('Payment amount updated successfully!');
        setOriginalAmount(amount);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update amount');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setAmount(originalAmount);
    setError('');
    setSuccess('');
  };

  const isDirty = parseFloat(amount) !== parseFloat(originalAmount);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">
              <FiDollarSign size={24} />
              Payment Settings
            </h1>
            <p className="card-subtitle">
              Configure the default payment amount for premium content
            </p>
          </div>

          <div className="card-body">
            {error && <Message type="error">{error}</Message>}
            }
            {success && <Message type="success">{success}</Message>}
            }

            {/* Current Amount Display */}
            <div 
              className="text-center p-8 rounded-lg mb-8"
              style={{ backgroundColor: theme.colors.surfaceHover }}
            >
              <p className="text-sm font-medium mb-2" style={{ color: theme.colors.textSecondary }}>
                Current Payment Amount
              </p>
              <p 
                className="text-4xl font-bold"
                style={{ color: theme.colors.primary }}
              >
                ${originalAmount.toLocaleString()}
              </p>
            </div>

            {/* Update Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="form-group">
                <label className="form-label">New Amount (USD)</label>
                <div className="relative">
                  <span 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 font-medium"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-input pl-8"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="btn-group">
                <button
                  type="submit"
                  disabled={saving || !isDirty}
                  className="btn btn-primary"
                >
                  {saving ? (
                    <>
                      <div className="spinner-sm" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <FiSave size={20} />
                      Update Amount
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!isDirty}
                  className="btn btn-secondary"
                >
                  <FiRefreshCw size={20} />
                  Reset
                </button>
              </div>

              {isDirty && (
                <p className="text-sm mt-4 text-center" style={{ color: theme.colors.warning }}>
                  You have unsaved changes
                </p>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
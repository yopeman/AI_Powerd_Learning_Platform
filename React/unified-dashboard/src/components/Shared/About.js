import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { api } from '../../utils/api';
import Message from '../Common/Message';
import { FiInfo, FiStar, FiSend, FiLoader } from 'react-icons/fi';

export default function About() {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/feedbacks', { 
        content: feedback, 
        rating 
      });
      
      if (response.data.success) {
        setSuccess('Thank you for your feedback!');
        setFeedback('');
        setRating(5);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map(star => (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        className="p-1 transition-colors"
        style={{
          color: star <= rating ? '#f59e0b' : theme.colors.border
        }}
      >
        <FiStar size={24} fill={star <= rating ? '#f59e0b' : 'none'} />
      </button>
    ));
  };

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
              <FiInfo size={24} />
              About AiPLP
            </h1>
          </div>

          <div className="card-body">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4" style={{ color: theme.colors.text }}>
                  Our Mission
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: theme.colors.textSecondary }}>
                  AiPLP is an innovative learning platform designed to provide high-quality education
                  through artificial intelligence-powered assistants. Our mission is to make education
                  accessible, personalized, and effective for everyone.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: theme.colors.text }}>
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Personalized learning paths',
                    'AI-powered teaching assistants',
                    'Interactive learning materials',
                    'Progress tracking and analytics',
                    'Industry-recognized certifications',
                    'Multi-platform accessibility'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <span style={{ color: theme.colors.text }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feedback Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <FiStar size={20} />
              Share Your Feedback
            </h2>
            <p className="card-subtitle">
              Help us improve the platform
            </p>
          </div>

          <div className="card-body">
            {error && <Message type="error">{error}</Message>}
            {success && <Message type="success">{success}</Message>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Your Feedback</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="form-textarea"
                  rows="4"
                  placeholder="Share your thoughts about the platform..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rating</label>
                <div className="flex items-center gap-2">
                  {renderStars()}
                  <span className="ml-3" style={{ color: theme.colors.textSecondary }}>
                    {rating} star{rating !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="btn-group">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin" size={20} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiSend size={20} />
                      Submit Feedback
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFeedback('');
                    setRating(5);
                    setError('');
                    setSuccess('');
                  }}
                  className="btn btn-secondary"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
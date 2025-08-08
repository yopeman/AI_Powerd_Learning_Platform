import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { api } from '../../../utils/api';
import LoadingSpinner from '../../Common/LoadingSpinner';
import { 
  FiBarChart2, FiUsers, FiBook, FiSubscript, 
  FiDollarSign, FiMessageSquare, FiAward 
} from 'react-icons/fi';

function AnalyticsOverview() {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchAllAnalytics = async () => {
      try {
        const [fields, users, subscriptions, payments, feedbacks, certifications] = await Promise.all([
          api.get('/analytics/fields'),
          api.get('/analytics/users'),
          api.get('/analytics/subscriptions'),
          api.get('/analytics/payments'),
          api.get('/analytics/feedbacks'),
          api.get('/analytics/certifications')
        ]);

        setAnalytics({
          fields: fields.data.data,
          users: users.data.data,
          subscriptions: subscriptions.data.data,
          payments: payments.data.data,
          feedbacks: feedbacks.data.data,
          certifications: certifications.data.data
        });
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAnalytics();
  }, []);

  if (loading) return <LoadingSpinner />;

  const analyticsCards = [
    {
      title: 'User Analytics',
      icon: <FiUsers size={24} />,
      color: theme.colors.primary,
      data: [
        { label: 'Total Users', value: analytics.users?.totalUsers || 0 },
        { label: 'Admins', value: analytics.users?.admin || 0 },
        { label: 'Assistants', value: analytics.users?.assistant || 0 },
        { label: 'Students', value: analytics.users?.student || 0 }
      ],
      link: '/analytics/users'
    },
    {
      title: 'Field Analytics',
      icon: <FiBook size={24} />,
      color: theme.colors.secondary,
      data: [
        { label: 'Total Fields', value: analytics.fields?.totalFields || 0 },
        { label: 'Free Fields', value: analytics.fields?.freeFields || 0 },
        { label: 'Paid Fields', value: analytics.fields?.paidFields || 0 }
      ],
      link: '/analytics/fields'
    },
    {
      title: 'Payment Analytics',
      icon: <FiDollarSign size={24} />,
      color: theme.colors.warning,
      data: [
        { label: 'Total Revenue', value: `$${analytics.payments?.totalRevenue || 0}` },
        { label: 'Completed', value: analytics.payments?.completedPayments || 0 },
        { label: 'Pending', value: analytics.payments?.pendingPayments || 0 },
        { label: 'Failed', value: analytics.payments?.failedPayments || 0 }
      ],
      link: '/analytics/payments'
    },
    {
      title: 'Feedback Analytics',
      icon: <FiMessageSquare size={24} />,
      color: theme.colors.info,
      data: [
        { label: 'Total Feedback', value: analytics.feedbacks?.totalFeedbacks || 0 },
        { label: 'Avg Rating', value: `${analytics.feedbacks?.averageRating?.toFixed(1) || 0}/5` }
      ],
      link: '/analytics/feedbacks'
    }
  ];

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
              <FiBarChart2 size={24} />
              Analytics Overview
            </h1>
            <p className="card-subtitle">
              Platform performance and insights
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analyticsCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={card.link} className="block text-decoration-none">
              <div className="card hover:shadow-lg transition-all">
                <div className="card-header">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: card.color + '20', color: card.color }}
                    >
                      {card.icon}
                    </div>
                    <h2 className="card-title">{card.title}</h2>
                  </div>
                </div>
                <div className="card-body">
                  <div className="space-y-3">
                    {card.data.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span style={{ color: theme.colors.textSecondary }}>
                          {item.label}
                        </span>
                        <span className="font-semibold" style={{ color: theme.colors.text }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Analytics() {
  const location = useLocation();
  const { theme } = useTheme();

  const tabs = [
    { path: '/analytics', label: 'Overview', exact: true },
    { path: '/analytics/users', label: 'Users' },
    { path: '/analytics/fields', label: 'Fields' },
    { path: '/analytics/subscriptions', label: 'Subscriptions' },
    { path: '/analytics/payments', label: 'Payments' },
    { path: '/analytics/feedbacks', label: 'Feedbacks' },
    { path: '/analytics/certifications', label: 'Certifications' }
  ];

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="card">
        <div className="card-body p-0">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap text-decoration-none ${
                  isActive(tab.path, tab.exact)
                    ? 'border-current'
                    : 'border-transparent hover:border-current'
                }`}
                style={{
                  color: isActive(tab.path, tab.exact) ? theme.colors.primary : theme.colors.textSecondary,
                  borderColor: isActive(tab.path, tab.exact) ? theme.colors.primary : 'transparent'
                }}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <Routes>
        <Route path="/" element={<AnalyticsOverview />} />
        {/* Add other analytics routes here */}
      </Routes>
    </div>
  );
}
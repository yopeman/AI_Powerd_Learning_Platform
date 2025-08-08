import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { api, authApi } from '../../../utils/api';
import LoadingSpinner from '../../Common/LoadingSpinner';
import Pagination from '../../Common/Pagination';
import Message from '../../Common/Message';
import { FiAward, FiExternalLink, FiTrash2 } from 'react-icons/fi';

export default function Certificates() {
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resultsRes, usersRes] = await Promise.all([
          api.get('/certifications/results'),
          api.get('/users')
        ]);

        if (resultsRes.data.success) {
          setResults(resultsRes.data.data);
        }
        if (usersRes.data.success) {
          setUsers(usersRes.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserById = (id) => users.find(user => user.id === id);

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = results.slice(startIndex, startIndex + itemsPerPage);

  const getScoreBadge = (score) => {
    if (score >= 90) return <span className="badge badge-success">{score}%</span>;
    if (score >= 70) return <span className="badge badge-warning">{score}%</span>;
    return <span className="badge badge-error">{score}%</span>;
  };

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
              <FiAward size={24} />
              Certificate Records
            </h1>
            <p className="card-subtitle">
              Monitor certification results and achievements
            </p>
          </div>

          <div className="card-body">
            {error && <Message type="error">{error}</Message>}
            }

            {/* Results Table */}
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Score</th>
                    <th>Date</th>
                    <th>Certificate</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedResults.map((result) => {
                    const user = getUserById(result.userId);
                    return (
                      <motion.tr
                        key={result.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td>
                          {user ? (
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: theme.colors.primary }}
                              >
                                <span className="text-white text-sm font-medium">
                                  {user.first_name[0]}{user.last_name[0]}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium" style={{ color: theme.colors.text }}>
                                  {user.first_name} {user.last_name}
                                </p>
                                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <span style={{ color: theme.colors.textSecondary }}>Unknown User</span>
                          )}
                        </td>
                        <td>{getScoreBadge(result.value)}</td>
                        <td style={{ color: theme.colors.textSecondary }}>
                          {new Date(result.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <a
                            href={`${authApi.defaults.baseURL}/results/${result.id}/link`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-sm"
                          >
                            <FiExternalLink size={16} />
                            View
                          </a>
                        </td>
                        <td>
                          <Link
                            to={`/certificates/${result.id}/delete`}
                            className="btn btn-danger btn-sm"
                            title="Delete Certificate"
                          >
                            <FiTrash2 size={16} />
                          </Link>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={results.length}
                />
              </div>
            )}

            {results.length === 0 && !loading && (
              <div className="text-center py-12">
                <FiAward size={48} style={{ color: theme.colors.textSecondary }} className="mx-auto mb-4" />
                <p style={{ color: theme.colors.textSecondary }}>
                  No certificates found.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
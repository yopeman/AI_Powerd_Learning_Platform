import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { api } from '../../../utils/api';
import LoadingSpinner from '../../Common/LoadingSpinner';
import Pagination from '../../Common/Pagination';
import Message from '../../Common/Message';
import { FiBook, FiPlus, FiSearch, FiEye, FiEdit, FiTrash2, FiUsers } from 'react-icons/fi';

export default function Fields() {
  const [fields, setFields] = useState([]);
  const [filteredFields, setFilteredFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const { theme } = useTheme();

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await api.get('/fields');
        if (response.data.success) {
          setFields(response.data.data);
          setFilteredFields(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load fields');
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  useEffect(() => {
    const filtered = fields.filter(field =>
      field.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFields(filtered);
    setCurrentPage(1);
  }, [searchTerm, fields]);

  const totalPages = Math.ceil(filteredFields.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFields = filteredFields.slice(startIndex, startIndex + itemsPerPage);

  const getAccessBadge = (isFree) => {
    return isFree ? (
      <span className="badge badge-success">Free</span>
    ) : (
      <span className="badge badge-warning">Premium</span>
    );
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
            <div className="flex items-center justify-between">
              <h1 className="card-title">
                <FiBook size={24} />
                Field Management
              </h1>
              <Link to="/fields/create" className="btn btn-primary">
                <FiPlus size={20} />
                Add Field
              </Link>
            </div>
          </div>

          <div className="card-body">
            {error && <Message type="error">{error}</Message>}
            }

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <FiSearch 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: theme.colors.textSecondary }}
                />
                <input
                  type="text"
                  placeholder="Search fields by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>

            {/* Fields Table */}
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Access</th>
                    <th>Duration</th>
                    <th>Free Topics</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFields.map((field) => (
                    <motion.tr
                      key={field.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td>
                        <div>
                          <p className="font-medium" style={{ color: theme.colors.text }}>
                            {field.title}
                          </p>
                          <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                            {field.description?.substring(0, 60)}...
                          </p>
                        </div>
                      </td>
                      <td>{getAccessBadge(field.isFree)}</td>
                      <td style={{ color: theme.colors.textSecondary }}>
                        {field.years_length} years
                      </td>
                      <td style={{ color: theme.colors.textSecondary }}>
                        {field.number_of_free_topics}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/fields/${field.id}/subscriptions`}
                            className="btn btn-secondary btn-sm"
                            title="View Subscriptions"
                          >
                            <FiUsers size={16} />
                          </Link>
                          <Link
                            to={`/fields/${field.id}`}
                            className="btn btn-secondary btn-sm"
                            title="View Details"
                          >
                            <FiEye size={16} />
                          </Link>
                          <Link
                            to={`/fields/${field.id}/edit`}
                            className="btn btn-secondary btn-sm"
                            title="Edit Field"
                          >
                            <FiEdit size={16} />
                          </Link>
                          <Link
                            to={`/fields/${field.id}/delete`}
                            className="btn btn-danger btn-sm"
                            title="Delete Field"
                          >
                            <FiTrash2 size={16} />
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
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
                  totalItems={filteredFields.length}
                />
              </div>
            )}

            {filteredFields.length === 0 && !loading && (
              <div className="text-center py-12">
                <FiBook size={48} style={{ color: theme.colors.textSecondary }} className="mx-auto mb-4" />
                <p style={{ color: theme.colors.textSecondary }}>
                  {searchTerm ? 'No fields found matching your search.' : 'No fields found.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
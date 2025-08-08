import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { api } from '../../../utils/api';
import LoadingSpinner from '../../Common/LoadingSpinner';
import Pagination from '../../Common/Pagination';
import { FiUsers, FiPlus, FiSearch, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        if (response.data.success) {
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const getRoleBadge = (role) => {
    const roleStyles = {
      admin: 'badge-error',
      assistant: 'badge-warning',
      student: 'badge-info'
    };
    return <span className={`badge ${roleStyles[role] || 'badge-info'}`}>{role}</span>;
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
                <FiUsers size={24} />
                User Management
              </h1>
              <Link to="/users/create" className="btn btn-primary">
                <FiPlus size={20} />
                Add User
              </Link>
            </div>
          </div>

          <div className="card-body">
            {error && (
              <div className="message message-error mb-6">
                {error}
              </div>
            )}

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
                  placeholder="Search users by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme.colors.primary }}
                          >
                            <span className="text-white font-medium">
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
                      </td>
                      <td>{getRoleBadge(user.role)}</td>
                      <td style={{ color: theme.colors.textSecondary }}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/users/${user.id}`}
                            className="btn btn-secondary btn-sm"
                            title="View Details"
                          >
                            <FiEye size={16} />
                          </Link>
                          <Link
                            to={`/users/${user.id}/edit`}
                            className="btn btn-secondary btn-sm"
                            title="Edit User"
                          >
                            <FiEdit size={16} />
                          </Link>
                          <Link
                            to={`/users/${user.id}/delete`}
                            className="btn btn-danger btn-sm"
                            title="Delete User"
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
                  totalItems={filteredUsers.length}
                />
              </div>
            )}

            {filteredUsers.length === 0 && !loading && (
              <div className="text-center py-12">
                <FiUsers size={48} style={{ color: theme.colors.textSecondary }} className="mx-auto mb-4" />
                <p style={{ color: theme.colors.textSecondary }}>
                  {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
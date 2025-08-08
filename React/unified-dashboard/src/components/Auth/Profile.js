import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { api } from '../../utils/api';
import { FiUser, FiLoader, FiEye, FiEyeOff, FiSave, FiRefreshCw } from 'react-icons/fi';

export default function Profile() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/me');
        if (response.data.success) {
          const { password, ...userData } = response.data.data;
          setFormData({ ...userData, password: '', confirm_password: '' });
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    if (formData.password && formData.password !== formData.confirm_password) {
      setError("Passwords don't match");
      setSaving(false);
      return;
    }

    const updateData = { ...formData };
    if (!updateData.password) {
      delete updateData.password;
      delete updateData.confirm_password;
    } else {
      delete updateData.confirm_password;
    }

    try {
      const response = await api.put('/users/me', updateData);
      if (response.data.success) {
        setSuccess('Profile updated successfully');
        setFormData(prev => ({ ...prev, password: '', confirm_password: '' }));
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">
              <FiUser size={24} />
              Profile Settings
            </h1>
            <p className="card-subtitle">
              Manage your account information and preferences
            </p>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="message message-error"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="message message-success"
                >
                  {success}
                </motion.div>
              )}

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.text }}>
                  Personal Information
                </h3>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              {/* Security */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.text }}>
                  Change Password
                </h3>
                <p className="text-sm mb-4" style={{ color: theme.colors.textSecondary }}>
                  Leave blank to keep current password
                </p>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input pr-12"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div className="btn-group">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                >
                  {saving ? (
                    <>
                      <FiLoader className="animate-spin" size={20} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave size={20} />
                      Save Changes
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="btn btn-secondary"
                >
                  <FiRefreshCw size={20} />
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
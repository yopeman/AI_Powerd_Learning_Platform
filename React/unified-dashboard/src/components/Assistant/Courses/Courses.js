import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { api } from '../../../utils/api';
import LoadingSpinner from '../../Common/LoadingSpinner';
import Pagination from '../../Common/Pagination';
import Message from '../../Common/Message';
import { FiBookOpen, FiPlus, FiEye, FiEdit, FiTrash2, FiLayers } from 'react-icons/fi';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const { fieldId } = useParams();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fieldId) {
          const [coursesRes, fieldRes] = await Promise.all([
            api.get(`/fields/${fieldId}/courses`),
            api.get(`/fields/${fieldId}`)
          ]);

          if (coursesRes.data.success) {
            setCourses(coursesRes.data.data);
          }
          if (fieldRes.data.success) {
            setField(fieldRes.data.data);
          }
        } else {
          // Get all courses for assistant's fields
          const fieldsRes = await api.get('/assistants/me/fields');
          if (fieldsRes.data.success) {
            const allCourses = [];
            for (const field of fieldsRes.data.data.fields) {
              try {
                const coursesRes = await api.get(`/fields/${field.id}/courses`);
                if (coursesRes.data.success) {
                  allCourses.push(...coursesRes.data.data.map(course => ({
                    ...course,
                    fieldTitle: field.title
                  })));
                }
              } catch (err) {
                // Continue if some fields don't have courses
              }
            }
            setCourses(allCourses);
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fieldId]);

  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = courses.slice(startIndex, startIndex + itemsPerPage);

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
              <div>
                <h1 className="card-title">
                  <FiBookOpen size={24} />
                  {field ? `Courses in ${field.title}` : 'All Courses'}
                </h1>
                {field && (
                  <p className="card-subtitle">
                    {field.description}
                  </p>
                )}
              </div>
              {fieldId && (
                <Link to={`/courses/create/${fieldId}`} className="btn btn-primary">
                  <FiPlus size={20} />
                  Add Course
                </Link>
              )}
            </div>
          </div>

          <div className="card-body">
            {error && <Message type="error">{error}</Message>}

            {courses.length > 0 ? (
              <>
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Academic Period</th>
                        <th>Chapters</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedCourses.map((course) => (
                        <motion.tr
                          key={course.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td>
                            <div>
                              <p className="font-medium" style={{ color: theme.colors.text }}>
                                {course.title}
                              </p>
                              <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                                {course.description?.substring(0, 60)}...
                              </p>
                              {course.fieldTitle && (
                                <p className="text-xs mt-1" style={{ color: theme.colors.textMuted }}>
                                  Field: {course.fieldTitle}
                                </p>
                              )}
                            </div>
                          </td>
                          <td>
                            <div>
                              <p style={{ color: theme.colors.text }}>Year {course.year}</p>
                              <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                                Semester {course.semester}
                              </p>
                            </div>
                          </td>
                          <td style={{ color: theme.colors.textSecondary }}>
                            {course.chapters_length}
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/courses/${course.id}`}
                                className="btn btn-secondary btn-sm"
                                title="View Details"
                              >
                                <FiEye size={16} />
                              </Link>
                              <Link
                                to={`/courses/${course.id}/edit`}
                                className="btn btn-secondary btn-sm"
                                title="Edit Course"
                              >
                                <FiEdit size={16} />
                              </Link>
                              <Link
                                to={`/chapters/course/${course.id}`}
                                className="btn btn-primary btn-sm"
                                title="View Chapters"
                              >
                                <FiLayers size={16} />
                              </Link>
                              <Link
                                to={`/courses/${course.id}/delete`}
                                className="btn btn-danger btn-sm"
                                title="Delete Course"
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
                      totalItems={courses.length}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <FiBookOpen size={48} style={{ color: theme.colors.textSecondary }} className="mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.colors.text }}>
                  No Courses Found
                </h3>
                <p style={{ color: theme.colors.textSecondary }}>
                  {fieldId ? 'No courses created for this field yet.' : 'No courses found in your assigned fields.'}
                </p>
                {fieldId && (
                  <Link to={`/courses/create/${fieldId}`} className="btn btn-primary mt-4">
                    <FiPlus size={20} />
                    Create First Course
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
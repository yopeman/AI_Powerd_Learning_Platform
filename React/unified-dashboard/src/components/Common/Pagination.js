import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage = 10,
  totalItems = 0 
}) {
  const { theme } = useTheme();

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
        Showing {startItem}-{endItem} of {totalItems} results
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="btn btn-secondary btn-sm"
        >
          <FiChevronLeft size={16} />
          Previous
        </button>
        
        <span className="px-3 py-1 text-sm" style={{ color: theme.colors.text }}>
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="btn btn-secondary btn-sm"
        >
          Next
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
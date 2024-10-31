import React from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import './DataComponents.css';

const SortComponent = ({ onSort, sortOrder }) => {
  const handleSort = () => {
    if (sortOrder === 'asc') {
      onSort('desc');
    } else if (sortOrder === 'desc') {
      onSort(null);
    } else {
      onSort('asc');
    }
  };

  const getSortIcon = () => {
    switch (sortOrder) {
      case 'asc':
        return <ArrowUp size={18} />;
      case 'desc':
        return <ArrowDown size={18} />;
      default:
        return <ArrowUpDown size={18} />;
    }
  };

  return (
    <div className="sort-button-container">
      <button 
        onClick={handleSort} 
        className={`sort-button ${sortOrder ? `sort-button-${sortOrder}` : ''}`}
        title={`Sort ${sortOrder || 'none'}`}
      >
        {getSortIcon()}
      </button>
    </div>
  );
};

export default SortComponent;
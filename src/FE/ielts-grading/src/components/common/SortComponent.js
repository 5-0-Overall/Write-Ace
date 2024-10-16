import React from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

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
        return <ArrowUp size={20} />;
      case 'desc':
        return <ArrowDown size={20} />;
      default:
        return <ArrowUpDown size={20} />;
    }
  };

  return (
    <div className="sort-button-container">
      <button 
        onClick={handleSort} 
        className={`sort-button ${sortOrder ? `sort-button-${sortOrder}` : ''}`}
      >
        {getSortIcon()}
      </button>
    </div>
  );
};

export default SortComponent;
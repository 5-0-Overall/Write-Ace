import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchComponent = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
        {query && (
          <button type="button" className="clear-button" onClick={handleClear}>
            <X size={16} />
          </button>
        )}
        <button type="submit" className="search-button">
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;
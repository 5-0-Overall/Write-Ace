import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import debounce from 'lodash/debounce';
import './DataComponents.css';

const SearchComponent = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState('');
  const searchRef = useRef(
    debounce((value) => {
      onSearch(value);
    }, 300)
  ).current;

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchRef(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="search-input"
        />
        {query && (
          <button type="button" className="clear-button" onClick={handleClear}>
            <X size={16} />
          </button>
        )}
        <button type="submit" className="search-button">
          <Search size={18} />
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;
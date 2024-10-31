import React, { useState, useEffect } from "react";
import SearchComponent from "./SearchComponent";
import SortComponent from "./SortComponent";
import FilterComponent from "./FilterComponent";
import "./DataManipulator.css";

const DataManipulator = ({ onDataChange, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    task: "",
    topic: ""
  });

  useEffect(() => {
    onDataChange({
      searchQuery,
      sortOrder,
      filterCriteria
    });
  }, [searchQuery, sortOrder, filterCriteria, onDataChange]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (direction) => {
    setSortOrder(direction);
  };

  const handleFilter = (criteria) => {
    setFilterCriteria(criteria);
    onFilterChange?.(criteria);
  };

  return (
    <div className="data-manipulator">
      <SearchComponent onSearch={handleSearch} />
      <SortComponent onSort={handleSort} sortOrder={sortOrder} />
      <FilterComponent onFilter={handleFilter} />
    </div>
  );
};

export default DataManipulator;
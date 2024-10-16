import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import SortComponent from "./SortComponent";
import FilterComponent from "./FilterComponent";
import "./DataManipulator.css";

const DataManipulator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
    // Implement your search logic here
  };

  const handleSort = (direction) => {
    setSortOrder(direction);
    console.log("Sorting order:", direction);
    // Implement your sorting logic here
  };

  const handleFilter = (criteria) => {
    setFilterCriteria(criteria);
    console.log("Filtering by:", criteria);
    // Implement your filtering logic here
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

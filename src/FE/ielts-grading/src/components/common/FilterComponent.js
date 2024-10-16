import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

const FilterComponent = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskCriteria, setTaskCriteria] = useState('');
  const [topicCriteria, setTopicCriteria] = useState('');
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);

  const handleTaskChange = (e) => {
    setTaskCriteria(e.target.value);
    onFilter({ task: e.target.value, topic: topicCriteria });
  };

  const handleTopicChange = (e) => {
    setTopicCriteria(e.target.value);
    onFilter({ task: taskCriteria, topic: e.target.value });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const adjustDropdownPosition = () => {
      if (dropdownRef.current && buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
  
        if (buttonRect.left + dropdownRect.width > viewportWidth) {
          dropdownRef.current.style.left = 'auto';
          dropdownRef.current.style.right = '0';
        } else {
          dropdownRef.current.style.left = '0';
          dropdownRef.current.style.right = 'auto';
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', adjustDropdownPosition);

    if (isOpen) {
      adjustDropdownPosition();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', adjustDropdownPosition);
    };
  }, [isOpen]);

  return (
    <div className="filter-container" ref={containerRef}>
      <button ref={buttonRef} className="filter-button" onClick={toggleDropdown}>
        <Filter size={20} />
        <span>Filter</span>
        <ChevronDown size={16} className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>
      {isOpen && (
        <div ref={dropdownRef} className="filter-dropdown">
          <div className="filter-group">
            <label htmlFor="task-select">Task:</label>
            <select
              id="task-select"
              value={taskCriteria}
              onChange={handleTaskChange}
              className="filter-select"
            >
              <option value="">All</option>
              <option value="1">Task 1</option>
              <option value="2">Task 2</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="topic-select">Topic:</label>
            <select
              id="topic-select"
              value={topicCriteria}
              onChange={handleTopicChange}
              className="filter-select"
            >
              <option value="">All</option>
              <option value="education">Education</option>
              <option value="technology">Technology</option>
              <option value="environment">Environment</option>
              <option value="health">Health</option>
              <option value="society">Society</option>
              <option value="work">Work</option>
              <option value="culture">Culture</option>
              <option value="government">Government</option>
              <option value="crime">Crime</option>
              <option value="family">Family</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
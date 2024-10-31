import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import axios from 'axios';
import './DataComponents.css';

const FilterComponent = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskCriteria, setTaskCriteria] = useState('');
  const [topicCriteria, setTopicCriteria] = useState('');
  const [topics, setTopics] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tag');
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (type, value) => {
    if (type === 'task') {
      setTaskCriteria(value);
    } else {
      setTopicCriteria(value);
    }

    const newCriteria = {
      task: type === 'task' ? value : taskCriteria,
      topic: type === 'topic' ? value : topicCriteria
    };

    onFilter(newCriteria);
  };

  return (
    <div className="filter-container" ref={containerRef}>
      <button 
        className="filter-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter size={18} />
        <span>Filter</span>
        <ChevronDown 
          size={16} 
          className={`chevron ${isOpen ? 'open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="filter-dropdown">
          <div className="filter-group">
            <label htmlFor="task-select">Task</label>
            <select
              id="task-select"
              value={taskCriteria}
              onChange={(e) => handleChange('task', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Tasks</option>
              <option value="1">Task 1</option>
              <option value="2">Task 2</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="topic-select">Topic</label>
            <select
              id="topic-select"
              value={topicCriteria}
              onChange={(e) => handleChange('topic', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Topics</option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;

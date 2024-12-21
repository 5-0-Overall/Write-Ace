import React, { useState } from 'react';
import moment from 'moment';
import '../styles/ContributionChart.css';

function ContributionChart({ data }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { contributions = {}, total = 0 } = data;

  const generateCalendar = () => {
    const calendar = [];
    const startDate = moment().year(selectedYear).startOf('year');
    const endDate = moment().year(selectedYear).endOf('year');
    
    // Tính toán số tuần cần hiển thị
    let currentDate = startDate.clone();
    while (currentDate.isSameOrBefore(endDate)) {
      const week = [];
      // Mỗi tuần có 7 ngàyA
      for (let i = 0; i < 7; i++) {
        if (currentDate.isSameOrBefore(endDate)) {
          week.push({
            date: currentDate.format('YYYY-MM-DD'),
            count: contributions[currentDate.format('YYYY-MM-DD')] || 0,
            month: currentDate.month()
          });
        }
        currentDate.add(1, 'day');
      }
      calendar.push(week);
    }
    
    return calendar;
  };

  const getContributionLevel = (count) => {
    if (!count) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
  };

  const getMonthPositions = () => {
    const positions = [];
    const startDate = moment().year(selectedYear).startOf('year');
    const endDate = moment().year(selectedYear).endOf('year');
    
    let currentDate = startDate.clone();
    let weekIndex = 0;
    
    while (currentDate.isSameOrBefore(endDate)) {
      if (currentDate.date() === 1) {
        const dayOfWeek = currentDate.day();
        const position = weekIndex * 13;
        
        // Thêm khoảng cách giữa các tháng
        const monthWidth = 30; // Ước tính độ rộng của text tháng
        const prevPosition = positions.length > 0 ? positions[positions.length - 1].position : -monthWidth;
        
        // Nếu vị trí mới quá gần vị trí cũ, điều chỉnh để tránh đè nhau
        const adjustedPosition = Math.max(position, prevPosition + monthWidth + 10);
        
        positions.push({
          month: currentDate.format('MMM'),
          position: adjustedPosition
        });
      }
      if (currentDate.day() === 6) weekIndex++;
      currentDate.add(1, 'day');
    }
    
    return positions;
  };

  return (
    <div className="contribution-wrapper">
      <div className="contribution-header">
        <h3>{total} contributions in {selectedYear}</h3>
        <select 
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="year-selector"
        >
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
      </div>

      <div className="contribution-graph">
        <div className="months">
          {getMonthPositions().map((pos, index) => (
            <span 
              key={pos.month} 
              style={{ left: `${pos.position}px` }}
              className="month-label"
            >
              {pos.month}
            </span>
          ))}
        </div>

        <div className="graph">
          {generateCalendar().map((week, weekIndex) => (
            <div key={weekIndex} className="week">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`day level-${getContributionLevel(day.count)}`}
                  data-tooltip={`${day.count} contributions on ${moment(day.date).format('MMMM D, YYYY')}`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="legend">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(level => (
            <div key={level} className={`day level-${level}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default ContributionChart; 
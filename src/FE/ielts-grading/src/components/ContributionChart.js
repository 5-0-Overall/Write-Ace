import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../styles/ContributionChart.css';

function ContributionChart({ data }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { contributions = {}, total = 0 } = data;

  const generateCalendar = () => {
    const year = selectedYear;
    const startDate = moment().year(year).startOf('year');
    const endDate = moment().year(year).endOf('year');
    const calendar = [];
    
    // Tính toán ngày bắt đầu (Chủ nhật của tuần đầu tiên của năm)
    let currentDate = startDate.clone().startOf('week');
    
    while (currentDate.isSameOrBefore(endDate)) {
      const week = [];
      
      // Tạo 7 ngày cho mỗi tuần
      for (let i = 0; i < 7; i++) {
        const date = currentDate.clone();
        
        // Chỉ thêm ngày nếu thuộc năm được chọn
        if (date.year() === year) {
          week.push({
            date: date.format('YYYY-MM-DD'),
            count: contributions[date.format('YYYY-MM-DD')] || 0,
            isCurrentYear: true
          });
        } else {
          week.push({
            date: date.format('YYYY-MM-DD'),
            count: 0,
            isCurrentYear: false
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
        <div className="weekdays">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
          <span>Sun</span>
        </div>
        
        <div className="months">
          {moment.months().map(month => (
            <span key={month}>{month.substring(0, 3)}</span>
          ))}
        </div>

        <div className="graph">
          {generateCalendar().map((week, weekIndex) => (
            <div key={weekIndex} className="week">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`day ${day.isCurrentYear ? `level-${getContributionLevel(day.count)}` : 'outside-year'}`}
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
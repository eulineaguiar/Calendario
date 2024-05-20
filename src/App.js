import React, { useState } from 'react';
import './App.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return { firstDay, lastDay, days };
  };

  const renderDays = () => {
    const { firstDay, lastDay, days } = getDaysInMonth();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const prevMonthDays = [];
    for (let i = firstDayIndex; i > 0; i--) {
      const prevDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), -i + 1);
      prevMonthDays.push(prevDay);
    }

    const currentMonthDays = days;

    const nextMonthDays = [];
    for (let i = 1; i < 7 - lastDayIndex; i++) {
      const nextDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
      nextMonthDays.push(nextDay);
    }

    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    return allDays.map((day, index) => (
      <div key={index} className={`day ${day.getMonth() !== currentDate.getMonth() ? 'inactive' : ''}`}>
        {day.getDate()}
      </div>
    ));
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="dayNames">
        <div>Dom</div>
        <div>Seg</div>
        <div>Ter</div>
        <div>Qua</div>
        <div>Qui</div>
        <div>Sex</div>
        <div>Sáb</div>
      </div>
      <div className="days">
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;

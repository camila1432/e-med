import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay } from 'date-fns';

export default function Calendar({ selected, onSelect, locale }) {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());

  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale });
    const endDate = endOfWeek(monthEnd, { locale });

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const days = generateCalendarDays();

  const prevMonth = () => {
    setCurrentMonth(addDays(startOfMonth(currentMonth), -1));
  };

  const nextMonth = () => {
    setCurrentMonth(addDays(endOfMonth(currentMonth), 1));
  };

  const headerDate = format(currentMonth, 'MMMM yyyy', { locale });

  const weekDays = [];
  const startWeek = startOfWeek(new Date(), { locale });
  for (let i = 0; i < 7; i++) {
    weekDays.push(format(addDays(startWeek, i), 'EEEEE', { locale })); // Ex: S, T, Q...
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-md shadow-md p-4 select-none">
      {/* Cabeçalho com mês e botões */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="p-1 rounded hover:bg-gray-200"
          aria-label="Mês anterior"
          type="button"
        >
          ‹
        </button>
        <div className="font-semibold text-lg capitalize">{headerDate}</div>
        <button
          onClick={nextMonth}
          className="p-1 rounded hover:bg-gray-200"
          aria-label="Próximo mês"
          type="button"
        >
          ›
        </button>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-1">
        {weekDays.map((dayName, idx) => (
          <div key={idx}>{dayName}</div>
        ))}
      </div>

      {/* Dias do mês */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selected && isSameDay(day, selected);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(day)}
              disabled={!isCurrentMonth}
              className={`py-1 rounded 
                ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'} 
                ${!isCurrentMonth ? 'text-gray-300 cursor-default' : 'text-gray-700'}
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}

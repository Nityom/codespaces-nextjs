// components/CalendarPreview.js
import React from 'react';
import useDatePickerStore from '../hooks/useDatePickerStore';

const CalendarPreview = () => {
  const { startDate, endDate, recurrencePattern, recurrenceInterval, specificDays, nthDay, nthMonth } = useDatePickerStore();

  const calculateRecurringDates = () => {
    if (!startDate || !endDate) return [];

    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    switch (recurrencePattern) {
      case 'daily':
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + recurrenceInterval)) {
          dates.push(new Date(date));
        }
        break;

      case 'weekly':
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const selectedDays = Array.isArray(specificDays) ? specificDays.map(day => dayNames.indexOf(day)) : [];

        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
          const dayIndex = date.getDay();

          if (selectedDays.includes(dayIndex)) {
            dates.push(new Date(date));
          }
        }
        
        // Now apply the interval for weekly recurrences
        const uniqueDates = [];
        dates.forEach(date => {
          if (!uniqueDates.some(d => d.toDateString() === date.toDateString())) {
            uniqueDates.push(date);
          }
        });

        return uniqueDates.filter((date, index) => index % (recurrenceInterval * 7) === 0); // Adjust based on interval

      case 'monthly':
        for (let date = new Date(start); date <= end; date.setMonth(date.getMonth() + recurrenceInterval)) {
          if (nthDay) {
            const day = parseInt(nthDay);
            const nthDayDate = new Date(date.getFullYear(), date.getMonth(), day);
            if (nthDayDate <= end) {
              dates.push(nthDayDate);
            }
          }
        }
        break;

      case 'yearly':
        for (let date = new Date(start); date <= end; date.setFullYear(date.getFullYear() + recurrenceInterval)) {
          if (nthDay && nthMonth) {
            const month = parseInt(nthMonth) - 1; // Convert 1-12 to 0-11
            const day = parseInt(nthDay);
            const nthDate = new Date(date.getFullYear(), month, day);
            if (nthDate <= end) {
              dates.push(nthDate);
            }
          }
        }
        break;

      default:
        break;
    }

    return dates;
  };

  const recurringDates = calculateRecurringDates();

  return (
    <div className="mt-4">
      <h3 className="font-semibold bg-red-200 mb-2">Calendar Preview</h3>
      {recurringDates.length > 0 ? (
        <ul className="list-disc pl-5">
          {recurringDates.map((date, index) => (
            <li key={index}>
              {date.toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recurring dates available.</p>
      )}
    </div>
  );
};

export default CalendarPreview;

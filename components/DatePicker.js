// components/DatePicker.js
import React from 'react';
import RecurrenceOptions from './RecurrenceOptions';
import CalendarPreview from './CalendarPreview';
import useDatePickerStore from '../hooks/useDatePickerStore';

const DatePicker = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useDatePickerStore();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Select Recurring Dates</h2>
      <input
        type="date"
        value={startDate || ''}
        onChange={(e) => setStartDate(e.target.value)}
        className="mb-4 border rounded p-2"
      />
      <input
        type="date"
        value={endDate || ''}
        onChange={(e) => setEndDate(e.target.value)}
        className="mb-4 border rounded p-2"
      />
      <RecurrenceOptions />
      <CalendarPreview />
    </div>
  );
};

export default DatePicker;

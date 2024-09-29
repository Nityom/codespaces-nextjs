import React from 'react';
import useDatePickerStore from '../hooks/useDatePickerStore';

const RecurrenceOptions = () => {
  const {
    recurrencePattern,
    setRecurrencePattern,
    recurrenceInterval,
    setRecurrenceInterval,
    specificDays,
    setSpecificDays,
    nthDay,
    setNthDay,
    nthMonth,
    setNthMonth,
  } = useDatePickerStore();

  // Handle updating the selected days in one go
  const handleDayChange = (updatedDays) => {
    setSpecificDays(updatedDays);
  };

  const toggleDaySelection = (day) => {
    const currentDays = Array.isArray(specificDays) ? specificDays : [];
    const isChecked = currentDays.includes(day);
    const updatedDays = isChecked
      ? currentDays.filter(d => d !== day) // Uncheck the day
      : [...currentDays, day]; // Check the day

    handleDayChange(updatedDays);
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Recurrence Options</h3>
      
      <select
        value={recurrencePattern}
        onChange={(e) => setRecurrencePattern(e.target.value)}
        className="border rounded p-2 mb-2"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      
      <input
        type="number"
        value={recurrenceInterval}
        onChange={(e) => setRecurrenceInterval(Number(e.target.value))}
        className="border rounded p-2 mb-2"
        placeholder="Every X"
        min="1"
      />

      {recurrencePattern === 'weekly' && (
        <div>
          <h4 className="mt-2 mb-1">Select Days of the Week:</h4>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
            <label key={index} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={specificDays.includes(day)} // Ensure specificDays is always an array
                onChange={() => toggleDaySelection(day)} // Use updated toggle function
                className="mr-2"
              />
              {day}
            </label>
          ))}
        </div>
      )}

      {recurrencePattern === 'monthly' && (
        <input
          type="text"
          value={nthDay || ''}
          onChange={(e) => setNthDay(e.target.value)}
          className="border rounded p-2 mb-2"
          placeholder="Nth day of the month (e.g., '2nd')"
        />
      )}
      
      {recurrencePattern === 'yearly' && (
        <div>
          <h4 className="mt-2 mb-1">Select the Nth Month and Nth Day:</h4>
          <input
            type="number"
            value={nthMonth || ''}
            onChange={(e) => setNthMonth(e.target.value)} // Set month input
            className="border rounded p-2 mb-2"
            placeholder="Nth month (1-12)"
            min="1"
            max="12"
          />
          <input
            type="text"
            value={nthDay || ''}
            onChange={(e) => setNthDay(e.target.value)} // Set day input
            className="border rounded p-2 mb-2"
            placeholder="Nth day of the week (e.g., 'Tuesday')"
          />
        </div>
      )}
    </div>
  );
};

export default RecurrenceOptions;

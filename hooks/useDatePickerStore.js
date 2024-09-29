// hooks/useDatePickerStore.js
import {create} from 'zustand';
const useDatePickerStore = create((set) => ({
    startDate: null,
    endDate: null,
    recurrencePattern: 'daily',
    recurrenceInterval: 1,
    specificDays: [], // Ensure this is initialized as an array
    nthDay: null,
    nthMonth: null,
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),
    setRecurrencePattern: (pattern) => set({ recurrencePattern: pattern }),
    setRecurrenceInterval: (interval) => set({ recurrenceInterval: interval }),
    setSpecificDays: (days) => set({ specificDays: days }), // Ensure days is an array
    setNthDay: (day) => set({ nthDay: day }),
    setNthMonth: (month) => set({ nthMonth: month }),
  }));
  
  export default useDatePickerStore;

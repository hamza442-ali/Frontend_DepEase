import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSort, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import { CalendarFoucs } from './Calendar';



const SelectInput = ({ options, value, onChange }) => (
  <select
    className="w-full px-4 py-2 border rounded focus:outline-none"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >

<option value="">Select a project</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState('');
  const [type, setType] = useState('');
  const [span, setSpan] = useState(10); // Default span between start and end time in minutes

  const projectOptions = [
    { label: 'Project A', value: 'Project A' },
    { label: 'Project B', value: 'Project B' },
    { label: 'Project C', value: 'Project C' },
  ];

  const addSlot = () => {
    if (newSlot && type && span > 0 && newSlot.trim() !== '' && type.trim() !== '') {
      const slotStartTime = new Date(selectedDate);
      const slotEndTime = new Date(selectedDate);
      slotEndTime.setMinutes(slotEndTime.getMinutes() + span);

      setSlots([...slots, { id: Date.now(), start: slotStartTime, end: slotEndTime, content: newSlot, type: type }]);
      setNewSlot('');
      setType('');
    }
  };

  const deleteSelectedSlots = () => {
    const remainingSlots = slots.filter((slot) => !slot.selected);
    setSlots(remainingSlots);
  };

  const getFormattedDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const toggleSelect = (id) => {
    const updatedSlots = slots.map((slot) => (slot.id === id ? { ...slot, selected: !slot.selected } : slot));
    setSlots(updatedSlots);
  };

  const sortSlots = (criteria) => {
    const sortedSlots = [...slots].sort((a, b) => {
      if (criteria === 'start') {
        return a.start.getTime() - b.start.getTime();
      } 
      return 0;
    });
    setSlots(sortedSlots);
  };
  

  const selectAll = () => {
    const updatedSlots = slots.map((slot) => ({ ...slot, selected: true }));
    setSlots(updatedSlots);
  };

  return (
    <>
    <div className="container p-4 mx-auto my-8 bg-white rounded-lg shadow-lg ml-20 mt-14  ">
      <div className="flex items-center mb-4">
        <SelectInput options={projectOptions} value={newSlot} onChange={setNewSlot} />
        <input
          type="text"
          placeholder="Type"
          className="w-1/4 px-4 py-2 border rounded-l focus:outline-none"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Span (mins)"
          min="1"
          className="w-1/4 px-4 py-2 border focus:outline-none"
          value={span}
          onChange={(e) => setSpan(parseInt(e.target.value, 10))}
        />
        <input
          type="datetime-local"
          className="w-1/4 px-4 py-2 border rounded-r focus:outline-none"
          value={selectedDate.toISOString().slice(0, -8)}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
        <button
          className="w-1/4 px-6 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-600 focus:outline-none"
          onClick={addSlot}
        >
          <FontAwesomeIcon icon={faCheckSquare} className="mr-2" />
          Add Slot
        </button>
      </div>
      <div className="flex items-center mb-4 ">
        <button
          className="px-4 py-2 bg-gray-300 rounded-l hover:bg-gray-400 focus:outline-none"
          onClick={() => deleteSelectedSlots()}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Delete Selected
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded-r hover:bg-gray-400 focus:outline-none" onClick={() => sortSlots('start')}>
          <FontAwesomeIcon icon={faSort} className="mr-2" />
          Sort by Start Time
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Day</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2">
                <input type="checkbox" onChange={() => selectAll()} />
              </th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, index) => (
              <tr key={index} className={slot.selected ? 'bg-gray-100' : ''}>
                <td className="px-4 py-2">{slot.start.toLocaleDateString(undefined, { weekday: 'long' })}</td>
                <td className="px-4 py-2">{getFormattedDate(slot.start)}</td>
                <td className="px-4 py-2">{slot.start.toLocaleTimeString()}</td>
                <td className="px-4 py-2">{slot.end.toLocaleTimeString()}</td>
                <td className="px-4 py-2">{slot.type}</td>
                <td className="px-4 py-2">{slot.content}</td>
                <td className="px-4 py-2">
                  <input type="checkbox" onChange={() => toggleSelect(slot.id)} checked={slot.selected} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <h1 className='text-5xl ml-24' > Calender</h1>   
    <CalendarFoucs/>

    </>
  );
};

// export default Calendar;
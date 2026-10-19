import React from 'react'


const SelectInput = ({ label, value, onChange, options }) => (
    <div className="mb-4">
      <label htmlFor={label} className="block mb-2 font-semibold">
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  
  export default SelectInput;
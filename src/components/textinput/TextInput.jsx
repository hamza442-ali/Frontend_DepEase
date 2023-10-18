import React from 'react'

const TextInput = ({ label, value, onChange }) => (
    <div className="mb-4">
      <label htmlFor={label} className="block mb-2 font-semibold">
        {label}
      </label>
      <input
        type="text"
        id={label}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );

  export default TextInput;
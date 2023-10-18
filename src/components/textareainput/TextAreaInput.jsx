import React from 'react'

const TextAreaInput = ({ label, value, onChange, height }) => (
    <div className="mb-4">
      <label htmlFor={label} className="block mb-2 font-semibold">
        {label}
      </label>
      <textarea
        id={label}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border border-gray-300 rounded ${height ? `h-${height}` : ''}`}
      ></textarea>
    </div>
  );
  
  export default TextAreaInput;
  
 
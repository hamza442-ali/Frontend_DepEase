import React from 'react'


const FileInput = ({ label, onChange }) => (
    <div className="mb-4">
      <label htmlFor={label} className="block mb-2 font-semibold ">
        {label}
      </label>
      <div className='w-full   border border-gray-300 rounded'>  
      <input
        type="file"
        id={label}
        onChange={onChange}
        className=" p-2 "/>
         </div>
    </div>
  );

  export default FileInput;



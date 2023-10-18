import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

const Step4 = ({ data, onPrevious, onSubmit }) => {
  const [modules, setModules] = useState(['']);
  const [error, setError] = useState('');

  const handlePrevious = () => {
    onPrevious();
  };

  const handleSubmit = () => {
    const nonEmptyModules = modules.filter(module => module.trim() !== '');
    if (nonEmptyModules.length > 0) {
      onSubmit({ ...data, modules: nonEmptyModules });
      setError('');
    } else {
      setError('Please enter at least one module');
    }
  };

  return (
    <div className="text-center">
      <div className="mb-6">
      
        {modules.map((module, index) => (
          <textarea
            key={index}
            placeholder={`Module ${index + 1}`}
            value={module}
            onChange={(e) => {
              const newModules = [...modules];
              newModules[index] = e.target.value;
              setModules(newModules);
            }}
            className="w-full h-32 p-3 mb-3 border rounded focus:outline-none focus:border-blue-500"
          />
        ))}
        <button
          onClick={() => {
            setModules([...modules, '']);
          }}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Module
        </button>
      </div>
      <div className="flex justify-between">
        <button onClick={handlePrevious} className="px-4 py-2 text-white bg-blue-500 rounded">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Previous
        </button>
        <button onClick={handleSubmit} className="px-4 py-2 text-white bg-green-500 rounded">
          Submit <FontAwesomeIcon icon={faCheck} className="ml-2" />
        </button>
      </div>
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
};

export default Step4;

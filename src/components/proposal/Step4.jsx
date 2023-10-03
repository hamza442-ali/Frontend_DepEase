// Step4.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

const Step4 = ({ data, onPrevious, onSubmit }) => {
  const [modules, setModules] = useState('');
  const [error, setError] = useState('');

  const handlePrevious = () => {
    onPrevious();
  };

  const handleSubmit = () => {
    if (modules) {
      onSubmit({ ...data, modules });
      setError('');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="text-center">
      {/* <h2 className="mb-6 text-3xl font-semibold">Step 4: Modules</h2> */}
      <div className="mb-6">
        <textarea
          placeholder="Modules"
          value={modules}
          onChange={(e) => setModules(e.target.value)}
          className="w-full h-32 p-3 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex justify-between">
        <button onClick={onPrevious} className="px-4 py-2 text-white bg-blue-500 rounded">
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
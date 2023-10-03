// Step2.jsx (similar enhancements applied to Step2, Step3, and Step4)
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Step2 = ({ onNext, onPrevious }) => {
  const [problemSolution, setProblemSolution] = useState('');
  const [scope, setScope] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (problemSolution && scope) {
      onNext({ problemSolution, scope });
      setError('');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="text-center">
      {/* <h2 className="mb-6 text-3xl font-semibold">Step 2: Problem Solution and Scope</h2> */}
      <div className="mb-6">
        <textarea
          placeholder="Problem Solution"
          value={problemSolution}
          onChange={(e) => setProblemSolution(e.target.value)}
          className="w-full h-32 p-3 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <textarea
          placeholder="Scope"
          value={scope}
          onChange={(e) => setScope(e.target.value)}
          className="w-full h-32 p-3 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex justify-between">
        <button onClick={onPrevious} className="px-4 py-2 text-white bg-blue-500 rounded">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Previous
        </button>
        <button onClick={handleNext} className="px-4 py-2 text-white bg-blue-500 rounded">
          Next <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
      </div>
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
};

export default Step2;
// Step3.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Step3 = ({ onNext, onPrevious }) => {
  const [timeline, setTimeline] = useState('');
  const [technologyUsed, setTechnologyUsed] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (timeline && technologyUsed) {
      onNext({ timeline, technologyUsed });
      setError('');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="text-center">
      {/* <h2 className="mb-6 text-3xl font-semibold">Step 3: Timeline and Technology Used</h2> */}
      <div className="mb-6">
        <textarea
          placeholder="Timeline"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
          className="w-full h-32 p-3 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <textarea
          placeholder="Technology Used"
          value={technologyUsed}
          onChange={(e) => setTechnologyUsed(e.target.value)}
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

export default Step3;
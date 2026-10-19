import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Step3 = ({ onNext, onPrevious }) => {
  const [timeline, setTimeline] = useState(['', '', '', '']); // Initialize with 4 empty parts
  const [technologyUsed, setTechnologyUsed] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    const trimmedTimeline = timeline.map(part => part.trim());
    if (trimmedTimeline.every(part => part) && technologyUsed) {
      onNext({ timeline: trimmedTimeline, technologyUsed });
      setError('');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="text-center">
      <div className="grid grid-cols-2 gap-4 mb-6">
        {timeline.map((part, index) => (
          <div key={index}>
            <label className="block mb-1 text-left text-gray-700">{`Part ${index + 1}`}</label>
            <input
              placeholder={`(e.g., Jan-Feb)`}
              value={part}
              onChange={(e) => {
                const newTimeline = [...timeline];
                newTimeline[index] = e.target.value;
                setTimeline(newTimeline);
              }}
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
      </div>
      <div className="mb-6">
        <label className="block mb-1 text-left text-gray-700">Technology Used</label>
        <textarea
          placeholder="Describe the technologies used"
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

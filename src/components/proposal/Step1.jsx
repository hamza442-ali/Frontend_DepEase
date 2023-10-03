import React, { useState } from 'react';

const Step1 = ({ onNext }) => {
  const [title, setTitle] = useState('');
  const [timeline, setTimeline] = useState('');

  const handleNext = () => {
    if (title && timeline) {
      onNext({ title, timeline });
    } else {
      setError('Please fill in all fields');
    }
  };

  const [error, setError] = useState('');

  return (
    <div className="text-center">
      {/* <h2 className="mb-4 text-2xl font-semibold">Step 1: Title and Timeline</h2> */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Timeline"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <button onClick={handleNext} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Next
      </button>
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
};

export default Step1;
import React, { useState } from 'react';

const Step1 = ({ onNext }) => {
  const [title, setTitle] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [error, setError] = useState('');

  const supervisors = [
    { id: 1, name: 'Supervisor 1' },
    { id: 2, name: 'Supervisor 2' },
    // Add more supervisors if needed
  ];

  const teammates = [
    { id: 1, name: 'Ali Hamza', rollNo: '12345' },
    { id: 2, name: 'Mahad Rahat', rollNo: '67890' },
    // Add more teammates if needed
  ];

  const handleNext = () => {
    if (title && selectedSupervisor && problemStatement) {
      onNext({ title, supervisor: selectedSupervisor, problemStatement, teammates });
      setError('');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <label className="block mb-1 text-left text-gray-700">Project Title</label>
        <input
          type="text"
          placeholder="Enter project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-left text-gray-700">Select Supervisor</label>
        <select
          value={selectedSupervisor}
          onChange={(e) => setSelectedSupervisor(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a supervisor</option>
          {supervisors.map((supervisor) => (
            <option key={supervisor.id} value={supervisor.name}>
              {supervisor.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-left text-gray-700">Problem Statement</label>
        <textarea
          placeholder="Describe the problem statement"
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
          className="w-full h-32 p-3 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-left text-gray-700">Teammates</label>
        <div className="flex justify-between">
          <div>
            <strong>{teammates[0].name}</strong> (Roll No: {teammates[0].rollNo})
          </div>
          <div>
            <strong>{teammates[1].name}</strong> (Roll No: {teammates[1].rollNo})
          </div>
        </div>
      </div>
      <button onClick={handleNext} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Next
      </button>
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
};

export default Step1;

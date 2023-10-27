import React, { useState,useEffect } from 'react';
import axios from 'axios';
const Step1 = ({ onNext }) => {
  const [title, setTitle] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [teamLeadId, setTeamLeadId] = useState('');
  const [teammate1Id, setTeammate1Id] = useState('');
  const [teammate2Id, setTeammate2Id] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [error, setError] = useState('');
  const [ProjectType, setSelectedProjectType] = useState('');
  const supervisors = [
    { id: 1, name: 'Supervisor 1' },
    { id: 2, name: 'Supervisor 2' },
    // Add more supervisors if needed
  ];

  const projectTypes = ["Development", "Research and Development"];
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Fetch supervisors from the backend when the component mounts
  //   axios.get('/api/supervisors') // Replace '/api/supervisors' with the actual API endpoint
  //     .then(response => {
  //       setSupervisors(response.data); // Assuming the response contains an array of supervisors
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching supervisors:', error);
  //       setLoading(false);
  //     });
  // }, []); 

  
  const handleNext = () => {
    if (title && selectedSupervisor && problemStatement && teamLeadId && teammate1Id && teammate2Id && ProjectType) {
      onNext({
        title,
       supervisor:  selectedSupervisor,
        problemStatement,
        teamLeadId,
        teammate1Id,
        teammate2Id,
        ProjectType
      });
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
        <label className="block mb-1 text-left text-gray-700">Project Type</label>
        <select
          value={ProjectType}
          onChange={(e) => setSelectedProjectType(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
        >
          <option value="">Select project type</option>
          {projectTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
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
        <label className="block mb-1 text-left text-gray-700">Team Lead ID</label>
        <input
          type="text"
          placeholder="Enter Team Lead ID"
          value={teamLeadId}
          onChange={(e) => setTeamLeadId(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-left text-gray-700">Teammate 1 ID</label>
        <input
          type="text"
          placeholder="Enter Teammate 1 ID"
          value={teammate1Id}
          onChange={(e) => setTeammate1Id(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-left text-gray-700">Teammate 2 ID</label>
        <input
          type="text"
          placeholder="Enter Teammate 2 ID"
          value={teammate2Id}
          onChange={(e) => setTeammate2Id(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
        />
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
      <button onClick={handleNext} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Next
      </button>
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
};

export default Step1;

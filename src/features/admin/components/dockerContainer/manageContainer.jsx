import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Dummy data for containers
const dummyContainers = [
    { id: '1', name: 'Container 1', containerId: 'abc123' },
  { id: '2', name: 'Container 2', containerId: 'def456' },
  { id: '1', name: 'Container 1', containerId: 'abc123' },
  { id: '2', name: 'Container 2', containerId: 'def456' },
  { id: '3', name: 'Container 3', containerId: 'ghi789' },
  { id: '1', name: 'Container 1', containerId: 'abc123' },
  { id: '2', name: 'Container 2', containerId: 'def456' },
  { id: '3', name: 'Container 3', containerId: 'ghi789' },
];

export const ContainerManager = () => {
  const [selectedContainerId, setSelectedContainerId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [containers, setContainers] = useState(dummyContainers);
  const [visibleContainers, setVisibleContainers] = useState(3); // Number of containers to show initially
  const [filteredContainers, setFilteredContainers] = useState(containers.slice(0, visibleContainers));

  useEffect(() => {
    const filtered = searchTerm
      ? containers.filter(
          (container) =>
            container.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            container.containerId.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : containers;
    setFilteredContainers(filtered.slice(0, visibleContainers));
  }, [searchTerm, visibleContainers]);

  const handleAction = async (action) => {
    console.log(`Action: ${action} on containerId: ${selectedContainerId}`);
    // Here you would handle the stop/start/delete actions
  };

  const showMoreContainers = () => {
    setVisibleContainers((prevVisible) => prevVisible + 3);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-2">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Docker Containers</h2>

        <div className="mb-6">
          <input
            type="text"
            className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search containers by name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-4 mb-4">
          <button
            className="flex-1 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
            onClick={() => handleAction('stop')}
          >
            Stop
          </button>
          <button
            className="flex-1 px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-200"
            onClick={() => handleAction('start')}
          >
            Start
          </button>
          <button
            className="flex-1 px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
            onClick={() => handleAction('delete')}
          >
            Delete
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Containers List</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto" style={{ maxHeight: '50vh' }}>
            {filteredContainers.map((container, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg shadow">
                <h4 className="font-semibold text-lg">{container.name}</h4>
                <p className="text-gray-600">ID: {container.containerId}</p>
              </div>
            ))}
          </div>
          {visibleContainers < containers.length && searchTerm === '' && (
            <button
              className="mt-4 px-4 py-2 bg-blue-100 text-blue-800 rounded shadow"
              onClick={showMoreContainers}
            >
              Show more...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { AddStudentForm } from './AddStudentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

export const AddStudent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [panels, setPanels] = useState([
    {
      id: 1,
      name: 'Hamza Azam',
      degree: 'BSSE',
      gender: 'Male',
      section: 'BSE-203P',
      rollNumber: '20I-1881',
    },
    
    // Add more initial data as needed
  ]);
  const [originalPanels, setOriginalPanels] = useState([...panels]);

  useEffect(() => {
    // Update the original panels whenever panels change
    setOriginalPanels([...panels]);
  }, [panels]);

  const handleAddStudent = (newStudent) => {
    setPanels((prevPanels) => [...prevPanels, { id: prevPanels.length + 1, ...newStudent }]);
  };

  const handleSearch = () => {
    const filteredPanels = originalPanels.filter((panel) =>
      panel[searchCriteria].toLowerCase().includes(searchValue.toLowerCase())
    );
    setPanels(filteredPanels);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      setPanels([...originalPanels]);
    } else {
      handleSearch();
    }
  };

  return (
    <div className="p-8 ml-32">
      <h1 className="text-2xl font-bold">Student</h1>

      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold"></h1>
          <div>
            <button onClick={() => setShowPopup(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
              + Add new
            </button>
          </div>
        </div>
        
        <div className="flex justify-between mb-4 ">
          <div className="flex">
            <select
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              className="border rounded p-2 mr-2 bg-blue-500 text-white"
            >
              <option value="name">Name</option>
              <option value="rollNumber">Roll Number</option>
              <option value="degree">Degree</option>
              <option value="section">Section</option>
            </select>
            <input
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              placeholder="Search:"
              className="border rounded p-2"
            />
          </div>
        </div>
        <table className="w-full border-collapse border">
          <thead className="bg-table-blue text-white">
            <tr>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Roll Number</th>
              <th className="p-3 text-center">Degree</th>
              <th className="p-3 text-center">Section</th>
              <th className="p-3 text-center">Gender</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {panels.map((panel) => (
              <tr key={panel.id} className="border-t hover:bg-gray-100">
                <td className="p-3 text-center">{panel.name}</td>
                <td className="p-3 text-center">{panel.rollNumber}</td>
                <td className="p-3 text-center">{panel.degree}</td>
                <td className="p-3 text-center">{panel.section}</td>
                <td className="p-3 text-center">{panel.gender}</td>
                <td className="p-3 text-center">
                  <button className="text-red-500 mr-2">
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                  <button className="text-green-500">
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && <AddStudentForm onClose={() => setShowPopup(false)} onSubmit={handleAddStudent} />}
      </div>
    </div>
  );
};

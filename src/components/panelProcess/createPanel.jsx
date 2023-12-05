import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const PanelCreation = () => {
  const [panelId, setPanelId] = useState('');
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [createdPanel, setCreatedPanel] = useState(null);

  const simulatedTeacherList = [
    { id: 1, name: 'Syed Muhammad Ali' },
    { id: 2, name: 'Zaheer Sani' },
    { id: 3, name: 'Mudasar Hussain' },
    { id: 4, name: 'Hammad Abbas' },
    { id: 5, name: 'Hussam Ather' },
    { id: 6, name: 'Atif Iqbal' },
  ];

  useEffect(() => {
    setTeacherList(simulatedTeacherList);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredTeachers = simulatedTeacherList.filter((teacher) =>
      teacher.name.toLowerCase().includes(query.toLowerCase()) ||
      teacher.id.toString().includes(query)
    );
    setTeacherList(filteredTeachers);
  };

  const handleTeacherSelection = (teacher) => {
    if (selectedTeachers.some((selected) => selected.id === teacher.id)) {
      setSelectedTeachers(selectedTeachers.filter((selected) => selected.id !== teacher.id));
    } else {
      setSelectedTeachers([...selectedTeachers, teacher]);
    }
  };

  const openPopUp = () => {
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  const confirmPanelCreation = () => {
    const panelData = {
      id: panelId,
      teachers: selectedTeachers,
    };

    axios
      .post('http://localhost:3001/panel/createPanel', panelData)
      .then((response) => {
        console.log('Response from the server:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Close the popup
    setIsPopUpOpen(false);

    // Clear the selections
    setSelectedTeachers([]);
  };

  return (
    <div className="flex h-screen ml-32">
      <div className="w-1/4 p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create FYP Panel</h2>
        <input
          type="text"
          placeholder="Panel ID"
          value={panelId}
          onChange={(e) => setPanelId(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <p>Search for Teachers:</p>
        <div className="relative mb-4">
          <input
            type="search"
            className="relative block w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search by ID or Name"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button
          onClick={openPopUp}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Panel
        </button>
      </div>
      <div className="w-3/4 p-6 bg-white shadow-md">
        <p>Selected Teachers:</p>
        <table className="w-full border-collapse border border-solid border-neutral-300">
          <thead className="bg-table-blue text-white">
            <tr>
              <th className="border border-solid border-neutral-300 text-center px-4 py-2">ID</th>
              <th className="border border-solid border-neutral-300 text-center px-4 py-2">Name</th>
              <th className="border border-solid border-neutral-300 text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teacherList.map((teacher) => (
              <tr key={teacher.id}>
                <td className="border border-solid border-neutral-300 text-center px-4 py-2">{teacher.id}</td>
                <td className="border border-solid border-neutral-300 text-center px-4 py-2">{teacher.name}</td>
                <td className="border border-solid border-neutral-300 text-center px-4 py-2">
                  <button
                    onClick={() => handleTeacherSelection(teacher)}
                    className={`px-2 py-1 rounded ${
                      selectedTeachers.some((selected) => selected.id === teacher.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {selectedTeachers.some((selected) => selected.id === teacher.id)
                      ? 'Deselect'
                      : 'Select'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPopUpOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-4 shadow-md rounded text-center">
            <h3 className="text-2xl font-bold mb-2">Confirm Panel Creation</h3>
            <p>Panel ID: {panelId}</p>
            <p>Selected Teachers:</p>
            <table className="w-full border-collapse border border-solid border-neutral-300">
              <thead>
                <tr>
                  <th className="border border-solid border-neutral-300 text-center px-4 py-2">ID</th>
                  <th className="border border-solid border-neutral-300 text-center px-4 py-2">Name</th>
                </tr>
              </thead>
              <tbody>
                {selectedTeachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td className="border border-solid border-neutral-300 text-center px-4 py-2">{teacher.id}</td>
                    <td className="border border-solid border-neutral-300 text-center px-4 py-2">{teacher.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <button
                onClick={confirmPanelCreation}
                className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
              >
                Confirm
              </button>
              <button
                onClick={closePopUp}
                className="bg-red-500 text-white px-4 py-2 rounded mx-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

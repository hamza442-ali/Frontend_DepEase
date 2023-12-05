import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AssignPanel = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentSearch, setStudentSearch] = useState('');
  const [panelSearch, setPanelSearch] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/student/getAllStudents')
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
      });

    axios
      .get('http://localhost:3001/panel/getAllPanels')
      .then((response) => {
        setPanels(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching panels:', error);
        setLoading(false);
      });
  }, []);

  const assignStudentToPanel = async () => {
    if (selectedGroups.length === 0 || !selectedPanel) {
      alert('Please select a group and a panel to assign.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/panel/assignPanel', {
        studentIds: selectedGroups,
        panelId: selectedPanel,
      });

      setSelectedGroups([]);
      setSelectedPanel(null);

      alert('Students assigned to the panel successfully.');
    } catch (error) {
      console.error('Error assigning students:', error);
      alert('An error occurred while assigning students. Please try again.');
    }
  };

  const handleSelectGroup = (groupId) => {
    const newSelectedGroups = [...selectedGroups];

    if (newSelectedGroups.includes(groupId)) {
      newSelectedGroups.splice(newSelectedGroups.indexOf(groupId), 1);
    } else {
      newSelectedGroups.push(groupId);
    }

    setSelectedGroups(newSelectedGroups);
  };

  const isGroupSelected = (groupId) => {
    return selectedGroups.includes(groupId);
  };

  const assignPanel = (panelId) => {
    setSelectedPanel(selectedPanel === panelId ? null : panelId);
  };

  const filteredStudents = groups.filter((group) =>
    group.student_name && group.student_name.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const filteredPanels = panels.filter((panel) =>
    panel.id && panel.id.toLowerCase().includes(panelSearch.toLowerCase())
  );

  return (
    <div className="mx-32 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Panel Assignment</h1>
      <button
        onClick={assignStudentToPanel}
        className="bg-blue-500 text-white px-8 py-2 rounded float-right"
      >
        Assign Panel
      </button>

      <div className="grid grid-cols-2 gap-4 mb-4 ">
        <div>
          <h2 className="text-xl font-bold mb-4">Student Groups</h2>
          <input
            type="text"
            placeholder="Search for students..."
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4"
          />
          <table className="w-full border-collapse border border-solid border-neutral-300 rounded-lg shadow-lg">
            <thead className="bg-table-blue text-white">
              <tr>
                <th className="border border-solid border-neutral-300 px-4 py-2">Group Id</th>
                <th className="border border-solid border-neutral-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((group) => (
                <tr key={group.id} className="border-t hover:bg-gray-100">
                  <td className="border border-solid border-neutral-300 px-4 py-2">
                    {group.student_name}
                  </td>
                  <td className="border border-solid border-neutral-300 px-4 py-2">
                    <button
                      onClick={() => handleSelectGroup(group.email_address)}
                      className={
                        isGroupSelected(group.email_address)
                        ? 'bg-red-500 text-white px-4 py-2 rounded'
                        : 'bg-blue-500 text-white px-4 py-2 rounded'
                      }
                    >
                      {isGroupSelected(group.id) ? 'Unselect' : 'Select'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold mb-4">Panel List</h1>
          <input
            type="text"
            placeholder="Search for panels..."
            value={panelSearch}
            onChange={(e) => setPanelSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4"
          />
          <table className="w-full border-collapse border border-solid border-neutral-300 rounded-lg shadow-lg">
            <thead className="bg-table-blue text-white">
              <tr>
                <th className="border border-solid border-neutral-300 px-4 py-2">ID</th>
                <th className="border border-solid border-neutral-300 px-4 py-2">Teachers</th>
                <th className="border border-solid border-neutral-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPanels.map((panel) => (
                <tr key={panel.id} className="border-t hover:bg-gray-100">
                  <td className="border border-solid border-neutral-300 px-4 py-2 text-center">
                    {panel.id}
                  </td>
                  <td className="border border-solid border-neutral-300 px-4 py-2 text-center">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="border border-solid border-neutral-300 px-4 py-2">Name</th>
                          <th className="border border-solid border-neutral-300 px-4 py-2">ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {panel.teachers.map((teacher, index) => (
                          <tr key={index}>
                            <td className="border border-solid border-neutral-300 px-4 py-2 text-center">
                              {teacher.name}
                            </td>
                            <td className="border border-solid border-neutral-300 px-4 py-2 text-center">
                              {teacher.id}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td className="border border-solid border-neutral-300 px-4 py-2 text-center">
                    <button
                      onClick={() => assignPanel(panel.id)}
                      className={
                        selectedPanel === panel.id
                          ? 'bg-red-500 text-white px-4 py-2 rounded'
                          : 'bg-blue-500 text-white px-4 py-2 rounded'
                      }
                    >
                      {selectedPanel === panel.id ? 'Unselect' : 'Select'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

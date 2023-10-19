import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AssignPanel = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]); // Use an array to store selected group IDs
  const [selectedPanel, setSelectedPanel] = useState(null); // Use state to store the selected panel
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentSearch, setStudentSearch] = useState(''); // Search for students
  const [panelSearch, setPanelSearch] = useState(''); // Search for panels

  useEffect(() => {
    // Fetch the list of student groups from your backend.
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
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching panels:', error);
        setLoading(false);
      });
  }, []);

  const assignStudentToPanel = async () => {


    // console.log(selectedPanel,selectedGroups )
    if (selectedGroups.length === 0 || !selectedPanel) {
      // Ensure a group and panel are selected before assigning
      alert('Please select a group and a panel to assign.');
      return;
    }
  
    try {
 
      await axios.post('http://localhost:3001/panel/assignPanel', {
        studentIds: selectedGroups, 
        panelId: selectedPanel,     
      });
  
      // Reset the selectedGroups and selectedPanel state
      setSelectedGroups([]);
      setSelectedPanel(null);
  
      // Provide feedback to the user
      alert('Students assigned to the panel successfully.');
  
      // You can also reload the data if needed, e.g., fetch updated panels and students.
    } catch (error) {
      console.error('Error assigning students:', error);
      alert('An error occurred while assigning students. Please try again.');
    }
  };
  

  const handleSelectGroup = (groupId) => {
    // Create a new array that contains the selected group IDs
    const newSelectedGroups = [...selectedGroups];

    // Check if the group is already selected
    if (newSelectedGroups.includes(groupId)) {
      // Unselect the group by filtering it out of the selectedGroups array
      newSelectedGroups.splice(newSelectedGroups.indexOf(groupId), 1);
    } else {
      // Select the group by adding its ID to the selectedGroups array
      newSelectedGroups.push(groupId);
    }

    // Update the selectedGroups state with the new array
    setSelectedGroups(newSelectedGroups);
  };

  const isGroupSelected = (groupId) => {
    // Check if a group is selected by checking if its ID is in the selectedGroups array
    return selectedGroups.includes(groupId);
  };

  const assignPanel = (panelId) => {
    // Toggle the selected panel state
    setSelectedPanel(selectedPanel === panelId ? null : panelId);
  };

  const filteredStudents = groups.filter((group) =>
    group.student_name && group.student_name.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const filteredPanels = panels.filter((panel) =>
    panel.id && panel.id.toLowerCase().includes(panelSearch.toLowerCase())
  );

  return (
    <div className="ml-32 p-4">
        
      <h1 className="text-2xl font-bold mb-4">Panel Assignment</h1>
        <button
             onClick={assignStudentToPanel}
             className="bg-red-500 text-white px-8 py-2 rounded float-right">
             Assign Panel
        </button>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold mb-4">Student Groups</h2>
          <input
            type="text"
            placeholder="Search for students..."
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4"
          />
          <table className="w-full">
            <thead>
              <tr>
                <th className="border border-solid border-neutral-300 px-4 py-2">Student Name</th>
                <th className="border border-solid border-neutral-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((group) => (
                <tr key={group.id}>
                  <td className="border border-solid border-neutral-300 px-4 py-2">
                    {group.student_name}
                  </td>
                  <td className="border border-solid border-neutral-300 px-4 py-2">
                    <button
                      onClick={() => handleSelectGroup(group.email_address)}
                      className={
                        isGroupSelected(group.email_address)
                          ? 'text-red-500'
                          : 'text-blue-500'
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
          <table className="w-full border-collapse border border-solid border-neutral-300">
            <thead>
              <tr>
                <th className="border border-solid border-neutral-300 px-4 py-2">ID</th>
                <th className="border border-solid border-neutral-300 px-4 py-2">Teachers</th>
                <th className="border border-solid border-neutral-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPanels.map((panel) => (
                <tr key={panel.id}>
                  <td className="border border-solid border-neutral-300 px-4 py-2 text-center">{panel.id}</td>
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
                            <td className="border border-solid border-neutral-300 px-4 py-2 text-center">{teacher.name}</td>
                            <td className="border border-solid border-neutral-300 px-4 py-2 text-center">{teacher.id}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td className="border border-solid border-neutral-300 px-4 py-2 text-center">
                    <button
                      onClick={() => assignPanel(panel.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
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

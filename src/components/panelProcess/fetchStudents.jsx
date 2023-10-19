
// GroupList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const StudentList = ({ onSelectGroup, selectedGroups }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch the list of student groups from your backend.
    axios.get('http://localhost:3001/student/getAllStudents')
      .then((response) => {
        setGroups(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
      });
  }, []);

  const handleSelectGroup = (groupId) => {
    onSelectGroup(groupId);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Student Groups</h2>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            {group.name}{' '}
            {!selectedGroups.includes(group.id) ? (
              <button onClick={() => handleSelectGroup(group.id)} className="text-blue-500">
                Assign
              </button>
            ) : (
              <button onClick={() => handleSelectGroup(group.id)} className="text-red-500">
                Unassign
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// export default GroupList;

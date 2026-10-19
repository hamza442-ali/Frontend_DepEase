import React, { useState, useEffect } from 'react';

const ReschedulePresentations = () => {
  const [rejectedGroups, setRejectedGroups] = useState([]);
  const [rescheduledGroup, setRescheduledGroup] = useState(null);

  // Fetch the list of groups that were rejected during defense from the backend
  useEffect(() => {
    // Implement code to fetch rejected groups from the backend via an API request (e.g., using Axios).
    // Update the 'rejectedGroups' state with the fetched data.
  }, []);

  const handleReschedule = (group) => {
    setRescheduledGroup(group);
  };

  const handleSaveReschedule = () => {
    // Implement code to send the rescheduled group data to the backend for updating.
  };

  return (
    <div>
      <h1>Reschedule Presentations</h1>
      <p>Select a group to reschedule their presentation:</p>

      <ul>
        {rejectedGroups.map((group) => (
          <li key={group.id}>
            <span>{group.name}</span>
            <button onClick={() => handleReschedule(group)}>Reschedule</button>
          </li>
        ))}
      </ul>

      <div className="rescheduled-group">
        {rescheduledGroup ? (
          <div>
            <h2>Rescheduled Group:</h2>
            <p>{rescheduledGroup.name}</p>
            <button onClick={handleSaveReschedule}>Save Reschedule</button>
          </div>
        ) : (
          <p>No group currently rescheduled.</p>
        )}
      </div>
    </div>
  );
};

export default ReschedulePresentations;

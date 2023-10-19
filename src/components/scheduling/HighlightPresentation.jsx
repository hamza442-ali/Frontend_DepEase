import React, { useState, useEffect } from 'react';

const HighlightPresentation = () => {
  const [highlightedGroup, setHighlightedGroup] = useState(null);
  const [availableGroups, setAvailableGroups] = useState([]);

  // Fetch the list of available groups from the backend
  useEffect(() => {
    // Implement code to fetch available groups from the backend via an API request (e.g., using Axios).
    // Update the 'availableGroups' state with the fetched data.
  }, []);

  const handleHighlight = (group) => {
    setHighlightedGroup(group);
  };

  return (
    <div>
      <h1>Highlight Presentation</h1>
      <p>Select the group for the current presentation:</p>

      <div className="group-list">
        {availableGroups.map((group) => (
          <div key={group.id} className="group">
            <span>{group.name}</span>
            <button onClick={() => handleHighlight(group)}>Highlight</button>
          </div>
        ))}
      </div>

      <div className="highlighted-group">
        {highlightedGroup ? (
          <div>
            <h2>Highlighted Group:</h2>
            <p>{highlightedGroup.name}</p>
          </div>
        ) : (
          <p>No group currently highlighted.</p>
        )}
      </div>
    </div>
  );
};

export default HighlightPresentation;
 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const PanelList = () => {
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch panel data from the backend using Axios.
    axios.get('http://localhost:3001/panel/getAllPanels')
      .then((response) => {
        setPanels(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching panels:', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (panelId) => {
    // Implement the edit functionality here.
    console.log('Edit panel with ID', panelId);
  };

  const handleDelete = (panelId) => {
    // Confirm if the user really wants to delete the panel
    if (window.confirm('Are you sure you want to delete this panel?')) {
      // Make an Axios request to delete the panel
      axios
        .delete(`http://localhost:3001/panel/deletePanelbyID/${panelId}`)
        .then((response) => {
          if (response.status === 200) {
           
            setPanels((prevPanels) => prevPanels.filter((panel) => panel.id !== panelId));
          } else {
            console.error('Failed to delete panel.');
          }
        })
        .catch((error) => {
          console.error('Error deleting panel:', error);
        });
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-32">
      <h1 className="text-2xl font-bold mb-4">Panel List</h1>
      <table className="w-full border-collapse border border-solid border-neutral-300">
        <thead>
          <tr>
            <th className="border border-solid border-neutral-300 px-4 py-2">ID</th>
            <th className="border border-solid border-neutral-300 px-4 py-2">Teachers</th>
            <th className="border border-solid border-neutral-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
  {panels.map((panel) => (
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
          onClick={() => handleEdit(panel.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(panel.id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

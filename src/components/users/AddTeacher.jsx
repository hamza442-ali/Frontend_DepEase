import React, { useState } from 'react';
import imageP from '../../assets/images/myPicReduced.JPG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AddTeacherForm } from './AddTeacherForm';

export const AddTeacher = () => {
  const [panels, setPanels] = useState([
    {
      id: 1,
      name: 'Tiger Nixon',
      employeeID: 'emp1',
      gender: 'Male',
      education: 'M.COM., P.H.D.',
      mobile: '123 456 7890',
    },
    // Add more data as needed
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleAddTeacher = (newTeacher) => {
    setPanels((prevPanels) => [...prevPanels, { id: prevPanels.length + 1, ...newTeacher }]);
    setShowForm(false);
  };

  return (
    <div className="p-8 ml-32">
      <h1 className="text-2xl font-bold">Teachers</h1>
      <div className="p-8 ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold"></h1>
          <div>
            <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
              + Add new
            </button>
          </div>
        </div>
        {showForm && <AddTeacherForm onClose={() => setShowForm(false)} onSubmit={handleAddTeacher} />}
        <div className="flex justify-between mb-4">
          <div className="flex">
            <button className="bg-blue-500  text-white px-4 py-2 rounded mr-2">Search</button>
            <input type="text" placeholder="Search:" className="border rounded p-2" />
          </div>
          <div className="flex items-center"></div>
        </div>
        <table className="w-full border-collapse border">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Employee Id</th>
              <th className="p-3 text-center">Gender</th>
              <th className="p-3 text-center">Education</th>
              <th className="p-3 text-center">Mobile</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {panels.map((panel) => (
              <tr key={panel.id} className="border-t hover:bg-gray-100">
                <td className="p-3 text-center"> {panel.name} </td>
                <td className="p-3 text-center">{panel.employeeID}</td>
                <td className="p-3 text-center">{panel.gender}</td>
                <td className="p-3 text-center">{panel.education}</td>
                <td className="p-3 text-center">{panel.mobile}</td>
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
      </div>
    </div>
  );
};

// export default AddTeacher;

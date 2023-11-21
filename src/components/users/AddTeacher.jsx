import React, { useState } from 'react';
import imageP from '../../assets/images/myPicReduced.JPG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

export const AddTeacher = () => {
    // Sample data to manage panels
    const [panels, setPanels] = useState([
        {
            id: 1,
            name: 'Tiger Nixon',
            department: 'Architect',
            gender: 'Male',
            education: 'M.COM., P.H.D.',
            mobile: '123 456 7890',
            email: 'info@example.com',
            rollNumber: '2011/04/25',
        },
        {
            id: 1,
            name: 'Tiger Nixon',
            department: 'Architect',
            gender: 'Male',
            education: 'M.COM., P.H.D.',
            mobile: '123 456 7890',
            email: 'info@example.com',
            rollNumber: '2011/04/25',
        },
        {
            id: 1,
            name: 'Tiger Nixon',
            department: 'Architect',
            gender: 'Male',
            education: 'M.COM., P.H.D.',
            mobile: '123 456 7890',
            email: 'info@example.com',
            rollNumber: '2011/04/25',
        },
        // Add more panels as needed
    ]);

    return (

        <div className="p-8 ml-32">
            <h1 className="text-2xl font-bold">Teachers</h1>
            <div className="p-8 ">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold"></h1>
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add new</button>
                </div>
            </div>
            <div className="flex justify-between mb-4">
                <div className="flex">
                    <button className="bg-blue-500  text-white px-4 py-2 rounded mr-2">Search</button>
                    {/* <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Grid View</button> */}
                    <input type="text" placeholder="Search:" className="border rounded p-2" />
                </div>
                <div className="flex items-center">
                    
                </div>
            </div>
            <table className="w-full border-collapse border">
  <thead className="bg-blue-500 text-white">
    <tr>
      <th className="p-3 text-center">Name</th>
      <th className="p-3 text-center">Department</th>
      <th className="p-3 text-center">Gender</th>
      <th className="p-3 text-center">Education</th>
      <th className="p-3 text-center">Mobile</th>
      <th className="p-3 text-center">Email</th>
      <th className="p-3 text-center">Roll Number</th>
      <th className="p-3 text-center">Action</th>
    </tr>
  </thead>
  <tbody>
    {panels.map((panel) => (
      <tr key={panel.id} className="border-t hover:bg-gray-100">
        <td className="p-3 text-center flex items-center">
          <img src={imageP} alt="Profile" className="w-11 h-11 rounded-full mr-2" />
          {panel.name}
        </td>
        <td className="p-3 text-center">{panel.department}</td>
        <td className="p-3 text-center">{panel.gender}</td>
        <td className="p-3 text-center">{panel.education}</td>
        <td className="p-3 text-center">{panel.mobile}</td>
        <td className="p-3 text-center">{panel.email}</td>
        <td className="p-3 text-center">{panel.rollNumber}</td>
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
}

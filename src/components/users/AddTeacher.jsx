import React, { useState, useEffect } from 'react';
import imageP from '../../assets/images/myPicReduced.JPG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { AddTeacherForm } from './AddTeacherForm';

export const AddTeacher = () => {
  const [panels, setPanels] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/teacher/getAll'); 
        setPanels(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteTeacher = async (teacherId) => {
    try {
      await axios.delete(`http://localhost:3001/teacher/delete/${teacherId}`);
      const response = await axios.get('http://localhost:3001/teacher/getAll'); 
      setPanels(response.data);
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const handleAddTeacher = (newTeacher) => {
    setPanels((prevPanels) => [...prevPanels, { id: prevPanels.length + 1, ...newTeacher }]);
    setShowForm(false);
  };

  return (
    <>
    <div className='p-8 ml-32 mt-14  rounded-3xl shadow-lg mr-32   bg-neutral-100'>
    <h1 className="text-2xl font-bold">Add Teachers
    
    <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded float-right text-base font-normal">
              + Add new
            </button>
    
    </h1>

    </div>
    <div className="p-8 ml-32 mt-4 rounded-3xl shadow-lg mr-32   bg-neutral-100">
      
      <div className="p-8 ">
        <div className="flex justify-between items-center mb-4">
          
        </div>
        {showForm && <AddTeacherForm onClose={() => setShowForm(false)} onSubmit={handleAddTeacher} />}
        <div className="flex justify-between mb-4">
          <div className="flex">
            <button className="bg-blue-500  text-white px-4 py-2 rounded mr-2">Search</button>
            <input type="text" placeholder="Search:" className="border rounded p-2" />
          </div>
          <div className="flex items-center"></div>
        </div>
        <table className="w-full border-collapse border bg-white">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Employee Id</th>
              <th className="p-3 text-center">Education</th>
              <th className="p-3 text-center">Mobile</th>
              <th className="p-3 text-center">Email</th>
              <th className="p-3 text-center">Gender</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {panels.map((panel) => (
              <tr key={panel.id} className="border-t hover:bg-gray-100">
                    <td className="border-none p-2 text-center flex items-center">
                                <img src={imageP} alt="Profile" className="w-11 h-11 rounded-full mr-8" />
                                {panel.name}
                            </td>
             
                <td className="p-3 text-center">{panel.employeeId}</td>
                <td className="p-3 text-center">{panel.education}</td>
                <td className="p-3 text-center">{panel.mobile}</td>
                <td className="p-3 text-center">{panel.email}</td>
                <td className="p-3 text-center">{panel.gender}</td>
                <td className="p-3 text-center">
                  <button className="text-red-500 mr-2" onClick={() => handleDeleteTeacher(panel.employeeId)}>
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
    </>
  );
};

// export default AddTeacher;

import React, { useState, useEffect } from 'react';
import { AddStudentForm } from './AddStudentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export const AddStudent = ({onClose, onSubmit}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [Student, setStudent] = useState([
    {
      
      name: 'Hamza Azam',
      registration_number: '20I-1881',
      degree: 'BSSE',
      gender: 'Male',
      section: 'BSE-203P',
      email_address : "hamza@gmail.com",
      password: "hamza"
      

    },
    
    // Add more initial data as needed
  ]);


  
  // const [originalstudents, setOriginalstudents] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/student/getAllStudents'); 

      setStudent(response.data);
   
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:3001/student/delete/${studentId}`);

       fetchData();

      // const response = await axios.get('http://localhost:3001/teacher/getAll'); 
      // setStudent(response.data);
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const handleAddStudent = (newStudent) => {
    setStudent((prevStudent) => [...prevStudent, { id: prevStudent.length + 1, ...newStudent }]);
    
  };

  const handleSearch = () => {
    const filteredStudent = Student.filter((student) =>
      student[searchCriteria].toLowerCase().includes(searchValue.toLowerCase())
    );
    setStudent(filteredStudent);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      setStudent([...Student]);
    } else {
      handleSearch();
    }
  };

  return (

    <>

<div className='p-8 ml-32 mt-14  rounded-3xl shadow-lg mr-32   bg-neutral-100'>
    <h1 className="text-2xl font-bold">Add Students</h1>

    </div>

    <div className="p-8 ml-32 mt-4 rounded-3xl shadow-lg  mr-32  bg-neutral-100">

      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold"></h1>
          <div>
            <button onClick={() => setShowPopup(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
              + Add new
            </button>
          </div>
        </div>
        
        <div className="flex justify-between mb-4 ">
          <div className="flex">
            
            <select
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              className="border rounded p-2 mr-2 bg-blue-500 text-white"
            >
              <option value="name">Name</option>
              <option value="registration_number">Roll Number</option>
              <option value="degree">Degree</option>
              <option value="section">Section</option>
            </select>

            <input
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              placeholder="Search:"
              className="border rounded p-2"
            />
          </div>
        </div>
        <table className="w-full border-collapse border bg-white">
          <thead className="bg-table-blue text-white">
            <tr>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Roll Number</th>
              <th className="p-3 text-center">Email</th>
              <th className="p-3 text-center">Degree</th>
              <th className="p-3 text-center">Section</th>
              <th className="p-3 text-center">Gender</th>
              <th className="p-3 text-center">Password</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {Student.map((student) => (
              <tr key={student.id} className="border-t hover:bg-gray-100">
                <td className="p-3 text-center">{student.name}</td>
                <td className="p-3 text-center">{student.registration_number}</td>
                <td className="p-3 text-center">{student.email_address  }</td>
                <td className="p-3 text-center">{student.degree}</td>
                <td className="p-3 text-center">{student.section}</td>
                <td className="p-3 text-center">{student.gender}</td>
                <td className="p-3 text-center">{student.password}</td>
                <td className="p-3 text-center">
                <button className="text-red-500 mr-2" onClick={() => handleDeleteStudent(student.registration_number)}>
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
        {showPopup && <AddStudentForm onClose={() => setShowPopup(false)} onSubmit={handleAddStudent} />}
      </div>
    </div>
    </>
  );
};

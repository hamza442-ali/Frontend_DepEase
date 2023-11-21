import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

export const AddStudentForm = ({ onClose, onSubmit }) => {
  const [newStudent, setNewStudent] = useState({
    name: '',
    department: '',
    gender: '',
    mobile: '',
    email: '',
    rollNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(100px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newStudent);
    onClose();
  };

  return (
    <animated.div style={formAnimation} className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Add Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={newStudent.mobile}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            name="email"
            value={newStudent.email}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            value={newStudent.rollNumber}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>


        <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <div className="relative flex items-center">
                <select
                name="department"
                value={newStudent.department}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-l w-full bg-blue-400 text-white focus:outline-none focus:ring focus:border-blue-500"
                >
                <option value="">Select Department</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Data Science">Data Science</option>
                </select>
                <input
                type="text"
                name="department"
                value={newStudent.department}
                onChange={handleChange}
                placeholder="Or enter custom department"
                className="p-2 border rounded-r border-l-0 focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
        </div>

        <div>
                <label className="  block text-sm font-medium text-gray-700">Gender</label>
                <select
                    name="gender"
                    value={newStudent.gender}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded w-full bg-blue-400 text-white "
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500 hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500 hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </animated.div>
  );
};

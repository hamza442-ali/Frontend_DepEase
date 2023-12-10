import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export const AddTeacherForm = ({ onClose, onSubmit }) => {
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    employeeId: '',
    education: '',
    email: '',
    mobile: '',
    gender: '',
    profilePicture: null,
    password: ''
  });

  useEffect(() => {
    // Generate password based on the teacher's name
    const password = generatePassword(newTeacher.employeeId);

    // Set the generated password in the state
    setNewTeacher((prevTeacher) => ({ ...prevTeacher, password: password }));

    // Log the updated state
    console.log(newTeacher, " Before Form data");
  }, [newTeacher.employeeId]);

  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prevTeacher) => ({ ...prevTeacher, [name]: value }));
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    
    setNewTeacher((prevTeacher) => ({ ...prevTeacher, profilePicture: file }));
  };
  

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(100px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  const validateForm = () => {
    const newErrors = {};
    if (!newTeacher.name) {
      newErrors.name = 'Name is required';
    }
    if (!newTeacher.employeeId) {
      newErrors.employeeId = 'Employee ID is required';
    }
    if (!newTeacher.education) {
      newErrors.education = 'Education is required';
    }
    if (!newTeacher.email) {
      newErrors.email = 'Email is required';
    }
    if (!newTeacher.mobile) {
      newErrors.mobile = 'Mobile is required';
    }
    if (!newTeacher.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!newTeacher.profilePicture) {
      newErrors.profilePicture = 'Profile Picture is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePassword = (name) => {
    // Use the name provided and append 'qwerty'
    const password = name.toLowerCase().replace(/\s/g, '') + 'qwerty';
    return password.toString();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Make an Axios POST request to your backend API
        const response = await axios.post('http://localhost:3001/teacher/create', newTeacher);

        // Display an alert upon successful submission
        alert('Teacher added successfully!');

        // Trigger the onSubmit callback passed from the parent component
        onSubmit(newTeacher);

        // Close the form
        onClose();
      } catch (error) {
        console.error('Error adding teacher:', error);
        // Handle error and display an alert if needed
        alert('An error occurred while adding the teacher. Please try again.');
      }
    }
  };

  return (
    <animated.div style={formAnimation} className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4 text-black">Add Teacher</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={newTeacher.name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {/* Display error message for name */}
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Employee Id</label>
          <input
            type="text"
            name="employeeId"
            value={newTeacher.employeeId}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {/* Display error message for employeeId */}
          {errors.employeeId && <p className="text-sm text-red-500">{errors.employeeId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Education</label>
          <input
            type="text"
            name="education"
            value={newTeacher.education}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {/* Display error message for education */}
          {errors.education && <p className="text-sm text-red-500">{errors.education}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={newTeacher.email}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {/* Display error message for email */}
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={newTeacher.mobile}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {/* Display error message for mobile */}
          {errors.mobile && <p className="text-sm text-red-500">{errors.mobile}</p>}
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none disabled:opacity-60 dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            />
            <label htmlFor="profilePicture" className="cursor-pointer">
              <FontAwesomeIcon icon={faImage} className="text-blue-500" />
            </label>
          </div>
          {/* Display error message for profilePicture */}
          {errors.profilePicture && <p className="text-sm text-red-500">{errors.profilePicture}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Gender</label>
          <select
            name="gender"
            value={newTeacher.gender}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full bg-slate-800 text-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {/* Display error message for gender */}
          {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
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

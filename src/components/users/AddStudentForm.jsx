import React, { useState , useEffect} from 'react';
import { useSpring, animated } from 'react-spring';
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";


export const AddStudentForm = ({ onClose, onSubmit }) => {
  const [newStudent, setNewStudent] = useState({

    name: '',
    registration_number: '',
    degree: '',
    section: '',
    gender: '',
    email_address: '',

    
    
  });


  useEffect(() => {
    // Generate password based on the teacher's name
    const password = generatePassword(newStudent.registration_number);

    // Set the generated password in the state
    setNewStudent((prevTeacher) => ({ ...prevTeacher, password: password }));

    // Log the updated state
    console.log(newStudent, " Before Form data");
  }, [newStudent.registration_number]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(100px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    
    setNewStudent((prevStudent) => ({ ...prevStudent, profilePicture: file }));
  };
  
  const generatePassword = (name) => {
    // Use the name provided and append 'qwerty'
    const password = name.toLowerCase().replace(/\s/g, '') + 'qwerty';
    return password.toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = generatePassword(newStudent.registration_number);

    // Set the generated password in the state
    setNewStudent((prevTeacher) => ({ ...prevTeacher, password: password }));

    console.log(newStudent, " student data ")
    try {
      await axios.post('http://localhost:3001/student/create', newStudent);
      alert('Student added successfully!');

         // Trigger the onSubmit callback passed from the parent component
         onSubmit(newStudent);
      onClose();
    } catch (error) {
      alert('An error occurred while adding the student . Please try again.');
      console.error('Error adding student:', error);
    }
  };

  return (
    <animated.div style={formAnimation} className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4 text-black">Add Student</h2>
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
          <label className="block text-sm font-medium text-gray-700">Roll Number</label>
          <input
            type="text"
            name="registration_number"
            value={newStudent.registration_number}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name='email_address'
            value={newStudent.email_address}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>




        <div>
          <label className="block text-sm font-medium text-gray-700">Degree</label>
          <input
            type="text"
            name="degree"
            value={newStudent.degree}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Section</label>
          <input
            type="text"
            name="section"
            value={newStudent.section}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
                <label className="  block text-sm font-medium text-gray-600">Gender</label>
                <select
                    name="gender"
                    value={newStudent.gender}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded w-full bg-slate-800 text-white "
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
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
          {/* {errors.profilePicture && <p className="text-sm text-red-500">{errors.profilePicture}</p>} */}
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

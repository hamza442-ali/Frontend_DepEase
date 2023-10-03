import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faComment } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import person from "../../assets/images/person2.jpeg"
import person1 from "../../assets/images/person.jpeg"
// import person2 from "../../Resources/person.jpg"

const Teammates = () => {

  const [teammates, setTeammates] = useState([]);

  useEffect(() => {
    // Fetch teammates when the component mounts
    getTeammates();
  }, []);

  const getTeammates = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/teamMember/getMembers/${"Project1"}`); // this will we get from Usecontext for now it is hardcoded 
     // console.log(response)
      setTeammates(response.data);
    } catch (error) {
      console.error('Error fetching teammates:', error);
      toast.error('Error fetching teammate:', error);
    }
    
  };

  const deleteTeammate = async (student_id, projectId) => {
    try {
      await axios.delete(`http://localhost:3001/teamMember/deleteMember/${projectId}/${student_id}`);
      setTeammates(teammates.filter((teammate) => teammate.student_id !== student_id));
      toast.success('Successfully removed the Teammate');
    } catch (error) {
      console.error('Error deleting teammate:', error);
      toast.error('Error deleting teammate:', error);
    }
  };
  

 
  
    return (
        <div className='h-full ml-64 bg-zinc-200'>
     

      <div className="container w-full h-16 pt-7 bg-zinc-100">
        <h1 className='mb-3 ml-4 text-2xl text-blue-300'>Teammates Manage</h1>
        <p className='ml-4 text-slate-700'>Home / TeamMember / Team Manage</p>
      </div>

      <div className="container py-6 mx-auto mt-12">
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {teammates.map((teammate) => (
            <div
              key={teammate.userId}
              className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-md"
            >
              <div className="flex justify-center">
                <img
                  src={person1}
                  alt={teammate.name}
                  className="w-32 h-32 mb-4 rounded-full"
                />
              </div>
              <div>
                <div className="mb-2 text-xl font-semibold">     {teammate.student_name}</div>
                <div className="mb-2 text-sm text-gray-600">{teammate.student_id}</div>
                <div className="mb-2 text-sm text-gray-600">{teammate.student_email}</div>
                <div className="mb-2 text-sm text-gray-600">{teammate.student_role}</div>
                <div className="mb-2 text-sm text-gray-600">{teammate.projectid}</div>
                <div className="text-sm text-gray-600">{teammate.student_status}</div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                 onClick={() => deleteTeammate(teammate.student_id, teammate.projectid)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="text-blue-500 hover:text-blue-700">
                  <FontAwesomeIcon icon={faComment} />
                  <span className="ml-2">Chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  };
  
  export default Teammates;
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const MemberCard = ({ member, onViewDetails }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  


  const addTeammate = (member) => {
    const formData = new FormData();
    formData.append('student_id', member.userId.toString());
    formData.append('team_lead_id', '20I-0457');
    formData.append('student_name', member.name);
    formData.append('student_email', member.email);
    formData.append('student_status', 'active');
    formData.append('requirements', []);
    formData.append('projectid', 'Project1');
    formData.append('student_role', 'Member');
    formData.append('avatar',  member.avatar );
    
    axios
      .post('http://localhost:3001/teamMember/addMember', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success('Teammate added successfully!');
      })
      .catch((error) => {
        toast.error('Failed to add teammate. Please try again.');
      });
  };
  





  const handleViewDetails = () => {
    onViewDetails(member);
  };

  const handleAddTeammate = () => {
    setShowConfirmation(true);
  };

  const handleConfirmAdd = () => {
    addTeammate(member);
    setShowConfirmation(false);
    
    // Additional logic to handle adding the teammate goes here
  };

  const handleCancelAdd = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mx-2" key={member.userId}>
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full"
          src={member.avatar}
          alt="Member Avatar"
        />
        <div className="ml-4">
          <h2 className="text-lg font-medium">{member.name}</h2>
          <p className="text-sm text-gray-500">{member.email}</p>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2"
          onClick={handleViewDetails}
        >
          View Details
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          onClick={handleAddTeammate}
        >
          Add Teammate
        </button>
      </div>
      {showConfirmation && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md mx-auto bg-white rounded-lg p-6">
            <p className="text-gray-800">
              Are you sure you want to add {member.name} as a team member?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2"
                onClick={handleConfirmAdd}
              >
                Yes
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                onClick={handleCancelAdd}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default MemberCard;

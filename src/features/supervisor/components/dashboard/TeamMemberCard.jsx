import React from 'react';
import person from '../../assets/images/person2.jpeg'
const TeamMemberCard = ({ name, email, photo }) => {
    return (
      <div className="bg-white shadow-lg p-4 rounded-lg ">
        <img src={person} alt={name} className="w-24 h-24 object-cover mx-auto mb-4 rounded-full" />
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-2">{email}</p>
      </div>
    );
  };

export default TeamMemberCard;

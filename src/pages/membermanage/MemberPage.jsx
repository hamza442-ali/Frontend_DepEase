import React, { useState, useEffect } from 'react';
import MemberList from '../../components/membercard/MemberList';
import person from "../../assets/images/person2.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faRandom } from '@fortawesome/free-solid-svg-icons';


const members = [
    {
      userId: 1,
      name: 'usman Doe',
      email: 'usamna.doe@example.com',
      avatar: person,
      batch: '2021',
      phoneNumber: '123-456-7890',
      degree: 'Bachelor of Science',
      section: 'A',
      dateOfBirth: '1990-01-01',
    },
    {
        userId: 2,
        name: 'Ali qadder',
        email: 'ali@example.com',
        avatar: person,
        batch: '2020',
        phoneNumber: '133-43-7890',
        degree: 'Bachelor of Science',
        section: 'A',
        dateOfBirth: '1990-01-01',
      },
      {
        userId: 3,
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: person,
        batch: '2021',
        phoneNumber: '123-456-7890',
        degree: 'Bachelor of Science',
        section: 'A',
        dateOfBirth: '1990-01-01',
      },
      {
        userId: 4,
        name: 'dikshat Doe',
        email: 'john.diksaht@example.com',
        avatar: person,
        batch: '2021',
        phoneNumber: '123-456-7890',
        degree: 'Bachelor of Science',
        section: 'A',
        dateOfBirth: '1990-01-01',
      },
    {
      userId: 5,
      name: 'osama Smith',
      email: 'osama.smith@example.com',
      avatar: person,
      batch: '2022',
      phoneNumber: '987-654-3210',
      degree: 'Bachelor of Arts',
      section: 'B',
      dateOfBirth: '1991-02-02',
    },
    // Add more member objects here...
  ];
  

  
const MemberPage = () => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [memberSearch, setMemberSearch] = useState(null);
  


    const handleViewDetails = (member) => {
      setSelectedMember(member);
    };
  
    const handleSearch = () => {
      if (searchQuery.trim() === '') {
        setMemberSearch(null);
      } else {
        const searchResults = members.filter(
          (member) => member.name.toLowerCase() === searchQuery.toLowerCase()
        );
        setMemberSearch(searchResults);
      }
    };
  
    const handleClearSearch = () => {
      setSearchQuery('');
      setMemberSearch(null);
    };
  
    const handleShuffle = () => {
      const shuffledMembers = [...members].sort(() => Math.random() - 0.5);
      setMemberSearch(shuffledMembers.slice(0, 20));
    };
  
    return (
      <div className="min-h-screen ">
        <div className="container py-4 mx-auto my-10">
          {/* <h1 className="mb-6 text-3xl font-semibold text-center text-gray-800">Member List</h1> */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <input
                type="text"
                className="w-64 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-l-md focus:outline-none"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute top-0 bottom-0 right-0 flex items-center justify-center px-2 text-gray-600 bg-gray-300 rounded-r-md"
                  onClick={handleClearSearch}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
            <button
              className="px-4 py-2 ml-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
              onClick={handleSearch}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button
              className="px-4 py-2 ml-2 font-medium text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
              onClick={handleShuffle}
            >
              <FontAwesomeIcon icon={faRandom} />
            </button>
          </div>
          <MemberList members={memberSearch || members} onViewDetails={handleViewDetails} />
          {selectedMember && (
            <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="max-w-md p-6 mx-auto bg-white rounded-lg">
                <div className="flex items-center mb-4">
                  <img
                    className="w-12 h-12 mr-4 rounded-full"
                    src={selectedMember.avatar}
                    alt="Member Avatar"
                  />
                  <h2 className="text-2xl font-semibold text-gray-800">{selectedMember.name} Details</h2>
                </div>
                <p className="text-gray-800">
                  <span className="font-medium">User ID:</span> {selectedMember.userId}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Batch:</span> {selectedMember.batch}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Phone Number:</span> {selectedMember.phoneNumber}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Degree:</span> {selectedMember.degree}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Section:</span> {selectedMember.section}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Date of Birth:</span> {selectedMember.dateOfBirth}
                </p>
                <button
                  className="px-4 py-2 mt-4 font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                  onClick={() => setSelectedMember(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default MemberPage;
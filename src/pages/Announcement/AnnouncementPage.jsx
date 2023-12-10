// src/pages/AnnouncementsPage.js
import React, { useEffect, useState } from 'react';
import AnnouncementAdministration from '../../components/announcement/AnnouncementAdministration';


const dummyAdministrationAnnouncements = [
    {
        _id: '1',
        title: 'Administration Announcement 1',
        message: 'This is the message of Administration Announcement 1.',
        date: new Date('2023-02-10'), // February 10, 2023
      },
      {
        _id: '2',
        title: 'Administration Announcement 2',
        message: 'op os kdfekj k.',
        date: new Date('2023-06-25'), // June 25, 2023
      },
    {
      _id: '3',
      title: 'Administration Announcement 3',
      message: 'This is the message of Administration Announcement 1.',
      date: new Date('2023-02-10'), // February 10, 2023
    },
    {
      _id: '4',
      title: 'Administration Announcement 4',
      message: 'This is the message of Administration Announcement 2.',
      date: new Date('2023-06-25'), // June 25, 2023
    },
];

const AnnouncementsPage = () => {
    // const [supervisorAnnouncements, setSupervisorAnnouncements] = useState([]);
    const [administrationAnnouncements, setAdministrationAnnouncements] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [announcementsPerPage] = useState(6); // Adjust as needed
    const [sortOrder, setSortOrder] = useState('desc');
  
    useEffect(() => {
      
  
      // Simulate fetching administration announcements
      setAdministrationAnnouncements(dummyAdministrationAnnouncements);
    }, []);
  
  
    const filteredAdministrationAnnouncements = administrationAnnouncements.filter((announcement) =>
      announcement.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
   
      const filteredAndDatedAdministrationAnnouncements = filteredAdministrationAnnouncements.filter(
        (announcement) =>
          filterDate === '' || new Date(announcement.date).toISOString().split('T')[0] === filterDate
      );
      
  
  
  
    const sortedAdministrationAnnouncements = filteredAndDatedAdministrationAnnouncements.sort((a, b) =>
      sortOrder === 'desc'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
  
    
  
    const indexOfLastAdministration = currentPage * announcementsPerPage;
    const indexOfFirstAdministration = indexOfLastAdministration - announcementsPerPage;
    const currentAdministrationAnnouncements = sortedAdministrationAnnouncements.slice(
      indexOfFirstAdministration,
      indexOfLastAdministration
    );
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const resetFilters = () => {
      setSearchTerm('');
      setFilterDate('');
      setCurrentPage(1);
      setSortOrder('desc');
    };
  
    return (
        <div className="container mx-auto mt-8 lg:ml-28">
        <h1 className="mb-8 text-3xl font-semibold">Announcements Page</h1>
  
        <div className="flex flex-col items-center mb-4 space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          <input
            type="text"
            placeholder="Search by content"
            value={searchTerm}
            className="px-4 py-2 border border-gray-300 rounded-md lg:w-64 focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="date"
            value={filterDate}
            className="px-1 py-2 border border-gray-300 rounded-md lg:w-32 focus:outline-none"
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <select
            value={sortOrder}
            className="px-2 py-2 border border-gray-300 rounded-md lg:w-32 focus:outline-none"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Sort by Date (Desc)</option>
            <option value="asc">Sort by Date (Asc)</option>
          </select>
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded-md focus:outline-none"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
  
      
  
        {/* Display Administration Announcements */}
        {currentAdministrationAnnouncements.map((announcement) => (
          <AnnouncementAdministration key={announcement._id} announcement={announcement} />
        ))}
  
        Pagination
        <div className="mt-4">
          <ul className="flex list-none">
            {Array.from({ length: Math.ceil(sortedAdministrationAnnouncements.length / announcementsPerPage) }).map(
              (_, index) => (
                <li key={index} className="mr-2">
                  <button
                    className={`px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none ${
                      currentPage === index + 1 ? 'bg-blue-700' : ''
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    );
  };
  
  export default AnnouncementsPage;
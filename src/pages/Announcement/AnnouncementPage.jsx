// src/pages/AnnouncementsPage.js
import React, { useEffect, useState } from 'react';
import AnnouncementSupervisor from '../../components/announcement/AnnouncementSupervisor';
import AnnouncementAdministration from '../../components/announcement/AnnouncementAdministration';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';


const AnnouncementsPage = () => {

  
  useEffect(() => {
    // Add an interceptor for every outgoing request
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        // If the token exists, add it to the Authorization header
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Do something with the request error
        return Promise.reject(error);
      }
    );
    // Clean up the interceptor when the component is unmounted
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);


  
    const [supervisorAnnouncements, setSupervisorAnnouncements] = useState([]);
    const [administrationAnnouncements, setAdministrationAnnouncements] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [announcementsPerPage] = useState(2); // Adjust as needed
    const [sortOrder, setSortOrder] = useState('desc');
    const projectData = useSelector(state => state.project);
    

    const fetchAnnouncements = async () => {

      
      try {
        const response = await axios.get('http://localhost:3001/announcementA/getall');
        if (response.data.length === 0) {
          toast.info('No Administrator announcements found!');
        } else {
          setAdministrationAnnouncements(response.data);
          console.log(response.data);
        }
      } catch (error) {
        toast.error('Error fetching Administrations announcements: ' + error.message);
        console.error('Error fetching Administrations announcements:', error);
      }


      try {
        const response = await axios.get(`http://localhost:3001/announcementS/getmine/${projectData.ProjectId}`);
        if (response.data.length === 0) {
          toast.info('No Supervisor announcements found!');
        } else {
          setSupervisorAnnouncements(response.message);
          console.log(response.message);
        }
      } catch (error) {
        toast.error('Error fetching  supervisors announcements: ' + error.message);
        console.error('Error fetching  supervisors announcements:', error);
      }
    };
    
  
    useEffect(() => {
      // Call the fetchAnnouncements function
      fetchAnnouncements();
    }, []);


    const filteredSupervisorAnnouncements = supervisorAnnouncements.filter((announcement) =>
  announcement && announcement.content && announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredAdministrationAnnouncements = administrationAnnouncements.filter((announcement) =>
  announcement && announcement.richText && announcement.richText.toLowerCase().includes(searchTerm.toLowerCase())
);


    const filteredAndDatedSupervisorAnnouncements = filteredSupervisorAnnouncements.filter(
        (announcement) =>
          filterDate === '' || new Date(announcement.date).toISOString().split('T')[0] === filterDate
      );
      
      const filteredAndDatedAdministrationAnnouncements = filteredAdministrationAnnouncements.filter(
        (announcement) =>
          filterDate === '' || new Date(announcement.date).toISOString().split('T')[0] === filterDate
      );
      
  
    // Sort announcements
    const sortedSupervisorAnnouncements = filteredAndDatedSupervisorAnnouncements.sort((a, b) =>
      sortOrder === 'desc' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    );
  
    const sortedAdministrationAnnouncements = filteredAndDatedAdministrationAnnouncements.sort((a, b) =>
      sortOrder === 'desc'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
  
    // Pagination
    const indexOfLastSupervisor = currentPage * announcementsPerPage;
    const indexOfFirstSupervisor = indexOfLastSupervisor - announcementsPerPage;
    const currentSupervisorAnnouncements = sortedSupervisorAnnouncements.slice(
      indexOfFirstSupervisor,
      indexOfLastSupervisor
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
  
        {/* Display Supervisor Announcements */}
        {currentSupervisorAnnouncements.map((announcement) => (
          <AnnouncementSupervisor key={announcement._id} announcement={announcement} />
        ))}
  
        {/* Display Administration Announcements */}
        {currentAdministrationAnnouncements.map((announcement) => (
          <AnnouncementAdministration key={announcement._id} announcement={announcement} />
        ))}
  
        {/* Pagination */}
        <div className="mt-4">
          <ul className="flex list-none">
            {Array.from({ length: Math.ceil(sortedSupervisorAnnouncements.length / announcementsPerPage) }).map(
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
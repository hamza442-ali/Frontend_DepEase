import React, { useState, useEffect } from 'react';
import MemberList from '../../components/requestCard/RequestApprovalList';
import person from "../../assets/images/person2.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faRandom } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const RequestApprovalPage = () => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [requestSearch, setRequestSearch] = useState(null);
    const projectData = useSelector(state => state.project);
    const [requests, setRequest] = useState([]);
    

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


    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/resource/getmine/${projectData.ProjectId}`);
        setRequest(response.data);
      } catch (error) {
        console.error('Error fetching  resource  requests:', error);
        toast.error('Error fetching  resource requests:', error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []); 

    const updateRequest =  async (request) => {
      try {
    
    // Check the current status of the deliverable and update it accordingly
    const currentStatus = request.supervisorStatus;
    let newStatus;
    

    switch (currentStatus) {
      case 'Pending':
        newStatus = 'In Progress';
        break;
      case 'In Progress':
        newStatus = 'Approved';
        break;
      case 'Approved':
        newStatus = 'Pending';
        break;
      default:
        newStatus = currentStatus; // Handle any unexpected status
    }
    
    // Update the status in the updatedData
    request.supervisorStatus = newStatus;
    
    const id = request._id;
    
    // Assuming your server expects a PUT request for updating
    const response = await axios.put(`http://localhost:3001/resource/update/${id}`, request);

    // Assuming the server responds with the updated resource request
    const updatedData = response.data;
    
    // Update the state with the modified deliverable
    setRequest((prevRequest) =>
      prevRequest.map((m) => (m._id === id ? updatedData : m))
    );
    
    toast.success(`Successfully updated resoruce request. New status: ${newStatus}`);
    } catch (error) {
    // Handle errors
    console.error('Error updating resoruce request:', error);
    toast.error('Error updating resoruce request:', error);
    }
    
    };




    const handleViewDetails = (request) => {
      setSelectedRequest(request);
    };
  
   

    const handleSearch = () => {
      if (searchQuery.trim() === '') {
        setRequestSearch(null);
      } else {
        const searchResults = requests.filter(
          (member) => member.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setRequestSearch(searchResults);
      }
    };
    
  
    const handleClearSearch = () => {
      setSearchQuery('');
      setRequestSearch(null);
    };
  
    const handleShuffle = () => {
      const shuffledMembers = [...requests].sort(() => Math.random() - 0.5);
      setRequestSearch(shuffledMembers.slice(0, 20));
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
          <MemberList requests={requestSearch || requests} onViewDetails={handleViewDetails}  updateRequest={updateRequest} />
          {selectedRequest && (
            <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="max-w-md p-6 mx-auto bg-white rounded-lg">
                <div className="flex items-center mb-4">
                  <img
                    className="w-12 h-12 mr-4 rounded-full"
                    src={selectedRequest.avatar}
                    alt="Member Avatar"
                  />
                  <h2 className="text-2xl font-semibold text-gray-800">{selectedRequest.projectTitle} Project Title</h2>
                </div>
                <p className="text-gray-800">
                  <span className="font-medium">Project ID:</span> {selectedRequest.projectId}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Student ID:</span> {selectedRequest.studentId}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Phone Number:</span> {selectedRequest.phoneNumber}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Email</span> {selectedRequest.email}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">RequestType:</span> {selectedRequest.requestType}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">RequestReason:</span> {selectedRequest.requestReason}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Start Date:</span> {selectedRequest.startDate}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium"> End Date:</span> {selectedRequest.endDate}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium"> Request Date:</span> {selectedRequest.requestDate}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium"> Admin Status:</span> {selectedRequest.adminStatus}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium"> Supervisor Status:</span> {selectedRequest.supervisorStatus}
                </p>
                <button
                  className="px-4 py-2 mt-4 font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                  onClick={() => setSelectedRequest(null)}
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
  
  export default RequestApprovalPage;


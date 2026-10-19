import React, { useState, useEffect } from 'react';
import { MemberList } from '../../components/resourceRequest/RequestApprovalList';
// import person from "../../assets/images/person2.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faRandom } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { useSelector } from 'react-redux';

export const RequestApprovalPage = () => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [requestSearch, setRequestSearch] = useState(null);
    // const projectData = useSelector(state => state.project);
    const [requests, setRequest] = useState([]);
   
    
  
  

    // useEffect(() => {
    //   // Add an interceptor for every outgoing request
    //   const requestInterceptor = axios.interceptors.request.use(
    //     (config) => {
    //       // Get the token from localStorage
    //       const token = localStorage.getItem('token');
    //       // If the token exists, add it to the Authorization header
    //       if (token) {
    //         config.headers['Authorization'] = Bearer ${token};
    //       }
    //       return config;
    //     },
    //     (error) => {
    //       // Do something with the request error
    //       return Promise.reject(error);
    //     }
    //   );
    //   // Clean up the interceptor when the component is unmounted
    //   return () => {
    //     axios.interceptors.request.eject(requestInterceptor);
    //   };
    // }, []);


    const fetchData = async () => {
      
      try {
        const response = await axios.get(`http://localhost:3001/resource/getall`);
        setRequest(response.data);
      } catch (error) {
        console.error('Error fetching  resource  requests:', error);
        toast.error('Error fetching  resource requests:', error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []); 
    const rejectRequest =  async (reason,request) => {
      try {
      
      let newStatus='Rejected';
       // Update the status in the updatedData
    request.adminStatus = newStatus;
    request.rejectionReason_S=reason;
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

    }
    const updateRequest =  async (request) => {
      try {
    
    // Check the current status of the deliverable and update it accordingly
    const currentStatus = request.adminStatus;
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
    request.adminStatus = newStatus;
    
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
          <MemberList requests={requestSearch || requests} onViewDetails={handleViewDetails}  updateRequest={updateRequest} rejectRequest={rejectRequest} />
         
         
         
          {selectedRequest && (
  <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-semibold text-blue-500">{selectedRequest.projectTitle} Project Title</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-gray-600">
          <span className="font-medium text-blue-500">Project ID:</span> {selectedRequest.projectId}
        </div>
        <div className="text-gray-600">
          <span className="font-medium text-blue-500">Student ID:</span> {selectedRequest.studentId}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-gray-600">
          <span className="font-medium text-blue-500">Phone Number:</span> {selectedRequest.phoneNumber}
        </div>
        <div className="text-gray-600">
          <span className="font-medium text-blue-500">Email:</span> {selectedRequest.email}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-gray-600">
          <span className="font-medium text-blue-500">Request Type:</span> {selectedRequest.requestType}
        </div>
        
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-gray-600">
          <span className="font-medium text-blue-500">Start Date:</span> {new Date(selectedRequest.startDate).toLocaleDateString()}
        </div>
        <div className="text-gray-600">
          <span className="font-medium text-blue-500">End Date:</span> {new Date(selectedRequest.endDate).toLocaleDateString()}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-gray-600">
          <span className="font-medium text-blue-500">Request Date:</span> {new Date(selectedRequest.requestDate).toLocaleDateString()}
        </div>
        <div className="text-gray-600">
          <span className="font-medium text-blue-500">Admin Status:</span> {selectedRequest.adminStatus}
        </div>
      </div>
      <div className="mb-4">
        <span className="font-medium  text-blue-500">Supervisor Status:</span> {selectedRequest.supervisorStatus}
      </div>

      <div className="text-gray-600">
          <span className="font-medium text-blue-500">Request Reason:</span> {selectedRequest.requestReason}
      </div>

      <button
        className="px-4 py-2 mt-4 font-medium text-white bg-indigo-700 rounded hover:bg-indigo-800 focus:outline-none"
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
  

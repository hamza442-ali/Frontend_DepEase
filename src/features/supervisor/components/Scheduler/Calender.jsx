import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSort } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';


const Calendar = () => {
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

  
  const [slots, setSlots] = useState([]);
 

  const fetchData = async () => {
     
    try {
      const response = await axios.get('http://localhost:3001/schedule/getAll');
      setSlots(response.data);
    } catch (error) {
      console.error('Error fetching  schedule:', error);
      toast.error('Error fetching schedule:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); 


  const updateType = async (id) => {
    try {
 
      // Find the selected slot
      const selectedSlot = slots.find((slot) => slot._id === id);

      const currentStatus = selectedSlot.type;
     
      let newStatus;
      
  
      switch (currentStatus) {
        case 'Pending':
          newStatus = 'In Progress';
          break;
        case 'In Progress':
          newStatus = 'Completed';
          break;
        case 'Completed':
          newStatus = 'Pending';
          break;
        default:
          newStatus = currentStatus; // Handle any unexpected status
      }
      
      // Update the status in the updatedData
      selectedSlot.type = newStatus;


      // Make the Axios request to update the type in the backend
      await axios.put(`http://localhost:3001/schedule/update/${id}`, {
         selectedSlot,
      });
      // Fetch the updated slots
      fetchData();

      // Display a success message (you can customize this based on your needs)
      toast.success('Type updated successfully to ' + newStatus + '!');
    } catch (error) {
      console.error('Error updating type:', error);
      toast.error('Error updating type:', error);
    }
  };


 

  const sortSlots = (criteria) => {
    const sortedSlots = [...slots].sort((a, b) => {
      if (criteria === 'start') {
        return a.start.getTime() - b.start.getTime();
      } 
      return 0;
    });
    setSlots(sortedSlots);
  };
  

  

  return (
    <div className="container p-4 mx-auto my-8 bg-white rounded-lg shadow-lg">
      
      <div className="flex items-center mb-4 ">
       
        <button className="px-4 py-2 bg-gray-300 rounded-r hover:bg-gray-400 focus:outline-none" onClick={() => sortSlots('start')}>
          <FontAwesomeIcon icon={faSort} className="mr-2" />
          Sort by Start Time
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Day</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
              
            </tr>
          </thead>
          <tbody>
          {slots.map((slot, index) => (
            <tr
              key={index}
              className={`${
                slot.selected ? 'bg-gray-100' : ''
              } ${(() => {
                switch (slot.type) {
                  case 'Pending':
                    return 'bg-yellow-300';
                  case 'In Progress':
                    return 'bg-blue-300';
                  case 'Completed':
                    return 'bg-green-300';
                  default:
                    return 'bg-white'; // Default color if type doesn't match any condition
                }
              })()}`}
            >
              <td className="px-4 py-2">{slot.day}</td>
              <td className="px-4 py-2">{slot.date}</td>
              <td className="px-4 py-2">{slot.start}</td>
              <td className="px-4 py-2">{slot.end}</td>
              <td className="px-4 py-2">{slot.content}</td>
              <td className="px-4 py-2">{slot.type}</td>
              <button
                className="px-2 py-1 my-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={() => updateType(slot._id)}
              >
                Update
              </button>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

<div className='flex flex-row justify-start '> 
      <div class="flex items-center  space-x-2">
  <div class="w-4 h-4 rounded-full bg-yellow-200 ml-2"></div>
  <span>Pending</span>
</div>

<div class="flex items-center space-x-2">
  <div class="w-4 h-4 rounded-full bg-blue-200 ml-2"></div>
  <span>In Progress</span>
</div>

<div class="flex items-center space-x-2">
  <div class="w-4 h-4 rounded-full bg-green-200 ml-2"></div>
  <span>Completed</span>
</div>
     </div> 
    </div>
  );
};

export default Calendar;

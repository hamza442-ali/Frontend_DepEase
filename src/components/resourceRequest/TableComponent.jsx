import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const TableComponent = () => {
  const [data, setData] = useState([]);

  const isAdmin = true; // Set to true if the user is an admin
  const handleDelete = async (id, adminStatus) => {
    if (isAdmin && adminStatus !== 'InProgress') {
      try {
        await axios.delete(`http://localhost:3001/resource/delete/${id}`);
        // Update the state after successful deletion
        fetchData();
        toast.success('Request deleted Successfully ');
      } catch (error) {
        console.error('Error deleting request:', error);
        toast.error('Error deleting  request:', error);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/resource/getmine/${"F20-126-D"}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching requests:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); 



  const formatISODateToReadable = (isoDateString) => {
    const dateObject = new Date(isoDateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObject.toLocaleDateString('en-US', options);
  };

 
  return (
    <div className="container mx-auto p-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4 text-left">Request Type</th>
              <th className="py-2 px-4 text-left">Start Date</th>
              <th className="py-2 px-4 text-left">End Date</th>
              <th className="py-2 px-4 text-left">Request Date</th>
              <th className="py-2 px-4 text-left">Admin Status</th>
              <th className="py-2 px-4 text-left">Supervisor Status</th>
              {isAdmin && <th className="py-2 px-4 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-3 px-4">{item.requestType}</td>
                <td className="py-3 px-4 " >{formatISODateToReadable(item.startDate)}</td>
                <td className="py-3 px-4">{formatISODateToReadable(item.endDate)}</td>
                <td className="py-3 px-4">{formatISODateToReadable(item.requestDate)}</td>
                <td className={`py-3 px-4 ${item.adminStatus === 'InProgress' ? 'text-blue-500' : 'text-green-500'}`}>
                  {item.adminStatus}
                </td>
                <td className={`py-3 px-4 ${item.supervisorStatus === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                  {item.supervisorStatus}
                </td>
                {isAdmin && (
                  <td className="py-3 px-4">
                    {item.adminStatus !== 'InProgress' ? (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out disabled:opacity-50"
                        onClick={() => handleDelete(item._id, item.adminStatus)
                       
                        }
                        disabled={item.adminStatus === 'InProgress'}
                        title={item.adminStatus === 'InProgress' ? 'Cannot delete in progress request' : 'Delete'}
                      >
                        Delete
                      </button>
                    ) : (
                      <span className="text-gray-400">Not Allowed</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;

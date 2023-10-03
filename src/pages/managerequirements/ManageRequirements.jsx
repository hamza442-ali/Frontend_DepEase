import React, { useEffect, useState } from 'react';
import RequirementTable from '../../components/requirementtable/RequirementTable';
import EditRequirementSidebar from '../../components/requirementtable/EditRequirementSidebar';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyComponent = () => {

  const [data, setRequirements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [index, setIndex] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/requirements/getRequirements/${"Project1"}`); // intially it will be hardcoded as login is nto implemented yet
        setRequirements(response.data);
      } catch (error) {
        toast.error('Failed to fetch requirements');
      }
    };

    fetchData();
  }, []);

  const handleEdit = (index) => {
    setSelectedRequirement(filteredData[index]);
    setShowSidebar(true);
    setIndex(index); // Add this line to store the index value
  };
  
  const handleUpdateRequirement = (updatedRequirement) => {
    const updatedData = [...filteredData];
    updatedData[index] = updatedRequirement;
    setSelectedRequirement(null);
    setShowSidebar(false);
  };
 

  const handleAttachment = (index) => {
    // Handle attachment button click
  };

  const handleDelete = async (index) => {
    const requirement = filteredData[index];
    try {
      await axios.delete(`http://localhost:3001/requirements/deleteRequirement/${requirement._id}`);
      const updatedData = [...filteredData];
      updatedData.splice(index, 1);
      setRequirements(updatedData);
      toast.success('Requirement deleted successfully');
    } catch (error) {
      toast.error('Failed to delete requirement');
    }
  };
  

  const handleSubmit = (index) => {
    // Handle submit button click
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterPriority = (event) => {
    setFilterPriority(event.target.value);
  };

  const handleFilterStatus = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredData = data
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (item) =>
        filterPriority === '' || item.priority === filterPriority
    )
    .filter(
      (item) =>
        filterStatus === '' || item.status === filterStatus
    );

  return (
    <div className='h-full ml-64 bg-zinc-200'>
     

      <div className="container w-full h-16 pt-7 bg-zinc-100">
        <h1 className='mb-3 ml-4 text-2xl text-blue-300'>Requirement Manage</h1>
        <p className='ml-4 text-slate-700'>Home / Requirements / Manage</p>
      </div>

      <div className='max-w-6xl mt-20 ml-64'>
        <div className="flex items-center justify-between pr-6">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search by title"
              className="px-2 py-1 mr-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="px-3 py-1 text-white rounded-md bg-sky-500 hover:bg-sky-600"
              onClick={() => setSearchTerm('')}
            >
              Clear
            </button>
          </div>
          <div className="flex items-center">
            <label className="mr-2">Priority:</label>
            <select
              className="px-2 py-1 border border-gray-300 rounded-md"
              value={filterPriority}
              onChange={handleFilterPriority}
            >
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="mr-2">Status:</label>
            <select
              className="px-2 py-1 border border-gray-300 rounded-md"
              value={filterStatus}
              onChange={handleFilterStatus}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <RequirementTable
          data={filteredData}
          onEdit={handleEdit}
          onAttachment={handleAttachment}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
        />
{showSidebar && selectedRequirement && (
  <EditRequirementSidebar
    requirement={selectedRequirement}
    onUpdate={handleUpdateRequirement}
    onClose={() => setShowSidebar(false)} // Add this prop
  />
)}

      </div>
    </div>
  );
};

export default MyComponent;
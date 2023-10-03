  import React, { useState } from 'react';
  import axios from 'axios';
  import { toast } from 'react-toastify';
  const EditRequirementSidebar = ({ requirement, onUpdate, onClose }) => {
    const [writtenby, setWrittenby] = useState(requirement.writtenby);
    const [assignedTo, setAssignedTo] = useState(requirement.assignedTo);
    const [title, setTitle] = useState(requirement.title);
    const [status, setStatus] = useState(requirement.status);
    const [priority, setPriority] = useState(requirement.priority);
    const [deadline, setDeadline] = useState(requirement.deadline);
    const [description, setDescription] = useState(requirement.description);

    const handleWrittenByChange = (event) => {
      setWrittenby(event.target.value);
    };

    const handleAssignedToChange = (event) => {
      setAssignedTo(event.target.value);
    };

    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };

    const handleStatusChange = (event) => {
      setStatus(event.target.value);
    };

    const handlePriorityChange = (event) => {
      setPriority(event.target.value);
    };

    const handleDeadlineChange = (event) => {
      setDeadline(event.target.value);
    };
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
    

    const handleSubmit = async () => {
      try {
        const updatedRequirement = {
          ...requirement,
          writtenby,
          assignedTo,
          title,
          status,
          priority,
          deadline,
          description,
        };
        
        const response = await axios.put(`http://localhost:3001/requirements/updateRequirement/${requirement._id}`, updatedRequirement);
        if (response.status === 200) {
          onUpdate(updatedRequirement); // Update the requirement locally in the parent component
          toast.success("Updated Successfully")
          onClose(); // Close the sidebar
        } else {
          // Handle the error case
          console.log('Update failed');
          toast.error('Failed to fetch requirements');
        }
      } catch (error) {
        // Handle the error case
        console.log(error);
      }
    };

    return (
      <div className="fixed right-0 top-0 h-screen w-1/4 bg-white shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Requirement</h2>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
            X
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">writtenby:</label>
            <select
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
              value={writtenby}
              onChange={handleWrittenByChange}
            >
              <option value="Mian Abdullah">Mian Abdullah</option>
              <option value="Ali Hamza">Ali Hamza</option>
              <option value="Mahad Rahat">Mahad Rahat</option>  
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Assigned To:</label>
            <select
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
              value={assignedTo}
              onChange={handleAssignedToChange}
            >
              <option value="Mian Abdullah">Mian Abdullah</option>
              <option value="Ali Hamza">Ali Hamza</option>
              <option value="Mahad Rahat">Mahad Rahat</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Title:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Status:</label>
            <select
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Priority:</label>
            <select
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
              value={priority}
              onChange={handlePriorityChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Deadline:</label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
              value={deadline}
              onChange={handleDeadlineChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Deadline:</label>
            <textarea
    className="h-32 w-full p-2 border border-gray-300 rounded"
    placeholder="Description"
    value={description}
    onChange={handleDescriptionChange}
  />

  </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </form>
      </div>
    );
  };

  export default EditRequirementSidebar;

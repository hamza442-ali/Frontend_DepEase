import React, { useEffect, useState } from "react";
import RequirementTable from "../../components/requirementtable/RequirementTable";
import EditRequirementSidebar from "../../components/requirementtable/EditRequirementSidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const MyComponent = () => {
  const [data, setRequirements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [index, setIndex] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/requirements/getRequirements/${"Project1"}`
        ); // intially it will be hardcoded as login is nto implemented yet
        setRequirements(response.data);
      } catch (error) {
        toast.error("Failed to fetch requirements");
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
      await axios.delete(
        `http://localhost:3001/requirements/deleteRequirement/${requirement._id}`
      );
      const updatedData = [...filteredData];
      updatedData.splice(index, 1);
      setRequirements(updatedData);
      toast.success("Requirement deleted successfully");
    } catch (error) {
      toast.error("Failed to delete requirement");
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
    .filter((item) => filterPriority === "" || item.priority === filterPriority)
    .filter((item) => filterStatus === "" || item.status === filterStatus);

  // Calculate statistics based on data
  const totalCompleted = data.filter(
    (req) => req.status === "Completed"
  ).length;
  const totalInProgress = data.filter(
    (req) => req.status === "In Progress"
  ).length;
  const totalPending = data.filter((req) => req.status === "Pending").length;
  const totalRequirements = data.length;
  return (
    
    <div className="container mx-auto ">
      <div className="container w-full h-16 pt-7 bg-zinc-100">
        <h1 className="mb-3 ml-4 text-2xl text-blue-300 ">Requirement Manage</h1>
        <p className="ml-4 text-slate-700">Home / Requirements / Manage</p>
      </div>


      

      <div className="w-full mt-20 ">
        

 {/*  */}

 <div className="grid grid-cols-1 gap-6 mx-auto my-8 sm:grid-cols-2 md:grid-cols-4">
  <div className="p-6 text-center transition duration-300 ease-in-out bg-gray-100 border rounded-lg shadow-lg hover:scale-105">
    <FontAwesomeIcon icon={['fas', 'check-circle']} className="mb-2 text-2xl text-blue-600" />
    <h2 className="mb-1 text-base font-semibold text-gray-700">Total Completed</h2>
    <p className="text-xl font-bold text-blue-600">{totalCompleted}</p>
  </div>
  <div className="p-6 text-center transition duration-300 ease-in-out transform bg-gray-100 border rounded-lg shadow-lg hover:scale-105">
    <FontAwesomeIcon icon={['fas', 'spinner']} className="mb-2 text-2xl text-green-600" />
    <h2 className="mb-1 text-base font-semibold text-gray-700">Total In Progress</h2>
    <p className="text-xl font-bold text-green-600">{totalInProgress}</p>
  </div>
  <div className="p-6 text-center transition duration-300 ease-in-out transform bg-gray-100 border rounded-lg shadow-lg hover:scale-105">
    <FontAwesomeIcon icon={['fas', 'hourglass-half']} className="mb-2 text-2xl text-yellow-600" />
    <h2 className="mb-1 text-base font-semibold text-gray-700">Total Pending</h2>
    <p className="text-xl font-bold text-yellow-600">{totalPending}</p>
  </div>
  <div className="p-6 text-center transition duration-300 ease-in-out transform bg-gray-100 border rounded-lg shadow-lg hover:scale-105">
    <FontAwesomeIcon icon={['fas', 'clipboard-list']} className="mb-2 text-2xl text-purple-600" />
    <h2 className="mb-1 text-base font-semibold text-gray-700">Total Requirements</h2>
    <p className="text-xl font-bold text-purple-600">{totalRequirements}</p>
  </div>
</div>

        {/*  */}

        <div class="border-t border-dotted border-gray-500 my-4 opacity-40"></div>
        <div className="flex items-center pr-6 mb-2">
          <div className="flex items-center">
            <label className="mr-2">Priority:</label>
            <select
              className="px-2 py-1 mr-2 border border-gray-300 rounded-md w-96 bg-slate-50"
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
              className="px-2 py-1 ml-2 border border-gray-300 rounded-md w-96 bg-slate-50"
              value={filterStatus}
              onChange={handleFilterStatus}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Search by title"
              className="w-full px-2 py-1 ml-4 border border-gray-300 rounded-md bg-slate-50"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="px-8 py-1 ml-2 text-white rounded-md bg-sky-500 hover:bg-sky-600"
              onClick={() => setSearchTerm("")}
            >
              Clear
            </button>
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

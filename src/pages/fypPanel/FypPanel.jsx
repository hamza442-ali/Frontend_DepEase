import React, { useState, useEffect } from "react";
import axios from "axios";
import { TeacherDetailsModal } from "../../components/fypPanel/teacherDetailModel";
import { useSelector } from 'react-redux';
export const PanelList = () => {

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


  
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState("card");
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [assignpanels, setAssignPanels] = useState([]);
  const teacherData = useSelector(state => state.teacher);

  const [selectedPanel, setSelectedPanel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (panel) => {
    setSelectedPanel(panel);
    setIsModalOpen(true);
  };


  const fetchPanelData = () => {
    const teacherId=teacherData.employeeId;
    // Fetch panel data from the backend using Axios.
    axios
      .get(`http://localhost:3001/fypPanel/getall/${teacherId}`)
      .then((response) => {
        setPanels(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching panels:", error);
        setLoading(false);
      });



      axios
      .get("http://localhost:3001//assignmentPanel/getall")
      .then((response) => {
        setAssignPanels(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching panels:", error);
        setLoading(false);
      });

      
  };

  useEffect(() => {
    fetchPanelData();
    updatePanelsWithAssignPanels();
  }, []);

  // Function to match panelId in assignmentSchema with id in panelSchema
const updatePanelsWithAssignPanels = () => {
  const updatedPanels = assignpanels.map(assignPanel => {
    const matchingPanel = panels.find(panel => panel.id === assignPanel.panelId);

    if (matchingPanel) {
      return {
        ...matchingPanel,
        assignments: assignPanel.studentIds,
      };
    }

    return null;
  });

  // Remove null values (panels without matching assignments)
  const filteredPanels = updatedPanels.filter(panel => panel !== null);

  setPanels(filteredPanels);
};




  const filteredPanels = panels.filter((panel) => {
    const searchTermLower = searchTerm.toLowerCase();
  
    // Add null check for panel and panel.id
    return (
      panel && panel.id && panel.id.toString().includes(searchTermLower) ||
      panel.teachers.some(
        (teacher) =>
          teacher.name.toLowerCase().includes(searchTermLower) ||
          (teacher.employeeId && teacher.employeeId.toString().includes(searchTermLower))
      )
    );
  });
  

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderTable = () => (
    <table className="w-full bg-white border border-collapse border-solid rounded-lg shadow-lg border-neutral-300">
      <thead className="text-gray-100 bg-gray-500">
        <tr>
          <th className="px-4 py-2 border border-solid border-neutral-300">
            ID
          </th>
          <th className="px-4 py-2 border border-solid border-neutral-300">
            Teachers
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredPanels.map((panel) => (
          <tr key={panel.id} className="border-t hover:bg-gray-100">
            <td className="px-4 py-2 text-center border border-solid border-neutral-300">
              {panel.id}
            </td>
            <td className="px-4 py-2 text-center border border-solid border-neutral-300">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border border-solid border-neutral-300">
                      Name
                    </th>
                    <th className="px-4 py-2 border border-solid border-neutral-300">
                      ID
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {panel.teachers.map((teacher, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-2 text-center border border-solid border-neutral-300">
                        {teacher.name}
                      </td>
                      <td className="px-4 py-2 text-center border border-solid border-neutral-300">
                        {teacher.employeeId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
  
  
  

  const displayPanelHead = (panel) => {
    const panelHeadTeacher = panel.teachers.find((teacher) => teacher.panelHead === true);
  
    if (panelHeadTeacher) {
      return (
        <div>
            {panelHeadTeacher.name}
        </div>
      );
    }
    return null;
  };
  
  const renderCard = () => (
    <div className="grid grid-cols-3 gap-4">
      {filteredPanels.map((panel) => (
        <div key={panel.id} className="p-4">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
            <div className="flex flex-col items-center pb-10 mt-8">
              <img
                src={""}
                alt={"not available"}
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {panel.id}
              </h5>
              <span className="flex flex-row justify-between mb-4 text-gray-500 text-md dark:text-gray-400">
              Panel Head:   {displayPanelHead (panel)}
                
              </span>
              <div classN="flex mt-4 md:mt-6">
                <button
                  onClick={() => handleViewDetails(panel)}
                  className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (panels.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center -mt-36">
          <p className="mb-4 text-3xl font-bold">You are not in any Fyp Panel</p>
          <p className="text-gray-600">Please contact Admin to proceed.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 mx-32 shadow-lg mt-14 rounded-3xl bg-neutral-100">
        <h1 className="mb-4 text-2xl font-bold">Panel List </h1>
      </div>

      <div className="p-6 mx-32 mt-4 shadow-lg rounded-3xl bg-neutral-100">
        <div className="flex p-4 mb-2 shadow-lg rounded-3xl bg-neutral-90">
         <h className="mx-2 my-auto ">Search</h>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="teacher name, teacher id, or panel id"
            className="p-2 border border-gray-300 rounded w-72"
          />

          <select
            className="px-3 py-2 ml-auto text-white bg-blue-500 rounded focus:outline-none"
            onChange={(e) => setSelectedView(e.target.value)}
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </div>

        {selectedView === "table" ? renderTable() : renderCard()}

{selectedPanel && (
  <TeacherDetailsModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    panel={selectedPanel}
  />
)}
      </div>
    </>
  );
};

export default PanelList;
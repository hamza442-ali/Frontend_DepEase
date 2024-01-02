import React, { useState, useEffect } from "react";
import axios from "axios";
import assignPanelPic from "../../assets/images/panelAssignment.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const AssignPanel = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentSearch, setStudentSearch] = useState("");
  const [panelSearch, setPanelSearch] = useState("");

  const [ProjectData , SetProjectsData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/group/getall")
      .then((response) => {
        console.log(response, " Group Details")
        setGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });

    axios
      .get("http://localhost:3001/panel/getAllPanels")
      .then((response) => {
      
        setPanels(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching panels:", error);
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    axios
      .get("http://localhost:3001/project/getall")
      .then((response) => {
        console.log(response.data, " response data in scheduling");
        SetProjectsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, []);

  const assignStudentToPanel = async () => {
    if (selectedGroups.length === 0 || !selectedPanel) {
      alert("Please select a group and a panel to assign.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/panel/assignPanel", {
        studentIds: selectedGroups,
        panelId: selectedPanel,
      });

      setSelectedGroups([]);
      setSelectedPanel(null);

      alert("Students assigned to the panel successfully.");
    } catch (error) {
      console.error("Error assigning students:", error);
      alert("An error occurred while assigning students. Please try again.");
    }
  };

  const handleSelectGroup = (groupId) => {
    const newSelectedGroups = [...selectedGroups];

    if (newSelectedGroups.includes(groupId)) {
      newSelectedGroups.splice(newSelectedGroups.indexOf(groupId), 1);
    } else {
      newSelectedGroups.push(groupId);
    }

    setSelectedGroups(newSelectedGroups);
  };

  const isGroupSelected = (groupId) => {
    return selectedGroups.includes(groupId);
  };

  const assignPanel = (panelId) => {
    setSelectedPanel(selectedPanel === panelId ? null : panelId);
  };

  const filteredStudents = ProjectData.filter(
    (group) =>
      group.ProjectId &&
      group.ProjectId.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const filteredPanels = panels.filter(
    (panel) =>
      panel.id && panel.id.toLowerCase().includes(panelSearch.toLowerCase())
  );

  return (
    <>
      {/* <div className="ml-32 mr-32 mt-14">
    <img
        src={assignPanelPic}
        alt="Announcement"
        className=" rounded-lg shadow-lg mb-4 "
        
      />


    </div> */}

      <div className="mx-32 p-4 bg-neutral-100 rounded-3xl shadow-lg hover:scale-105 mt-14  ">
        <h1 className="text-2xl font-bold mb-4">
          Assign Panel
          <button
            onClick={assignStudentToPanel}
            className=" hover:bg-black bg-blue-500 text-white px-4 text-base py-2 rounded float-right "
          >
            Assign Panel
          </button>
        </h1>
      </div>

      <div className="mx-32 p-4 bg-neutral-100 rounded-3xl shadow-lg mt-4">
        <div className="grid grid-cols-2 gap-4 mb-4 ">
          <div className="  bg-white p-4 rounded shadow-lg rounded-3xl max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Student Groups</h2>
            <input
              type="text"
              placeholder="Search for students..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="p-2 border border-gray-300 rounded mb-4"
            />
            <button className=" bg-blue-500 text-white px-4 py-2 rounded ml-2 ">
              {" "}
              <FontAwesomeIcon icon={faSearch} />{" "}
            </button>
            <table className="w-full border-collapse border border-solid border-neutral-300 rounded-lg shadow-lg">
              <thead className="bg-table-blue text-white">
                <tr>
                  <th className="border-b border-solid border-neutral-300 px-4 py-2">
                    Group Id
                  </th>
                  <th className="border-b border-solid border-neutral-300 ">
                    Select
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((group) => (
                  <tr key={group._id} className="border-t hover:bg-gray-100">
                    <td className="border-b border-solid border-neutral-300 px-4 py-2 text-center">
                      {group.ProjectId}
                    </td>
                  
                    <td className="border-b border-solid border-neutral-300 px-4 py-2 ">
                      <input
                        type="checkbox"
                        onChange={() => handleSelectGroup(group.ProjectId)}
                        checked={isGroupSelected(group.ProjectId)}
                        className="mx-auto"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ml-4 bg-white p-4 rounded shadow-lg rounded-3xl max-w-3xl">
            <h1 className="text-2xl font-bold mb-4">Panel List</h1>
            <input
              type="text"
              placeholder="Search for panels..."
              value={panelSearch}
              onChange={(e) => setPanelSearch(e.target.value)}
              className="p-2 border border-gray-300 rounded mb-4"
            />
            <button className=" bg-blue-500 text-white px-4 py-2 rounded ml-2 ">
              {" "}
              <FontAwesomeIcon icon={faSearch} />{" "}
            </button>

            <table className="w-full border-collapse border border-solid border-neutral-300 rounded-lg shadow-lg">
              <thead className="bg-table-blue text-white">
                <tr>
                  <th className="border border-solid border-neutral-300 px-4 py-2">
                    ID
                  </th>
                  <th className="border border-solid border-neutral-300 px-4 py-2">
                    Teachers
                  </th>
                  <th className="border border-solid border-neutral-300 px-4 py-2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPanels.map((panel) => (
                  <tr key={panel.id} className="border-t hover:bg-gray-100">
                    <td className="border border-solid border-neutral-300 px-4 py-2 text-center">
                      {panel.id}
                    </td>
                    <td className="border border-solid border-neutral-300 px-4 py-2 text-center">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="border border-solid border-neutral-300 px-4 py-2">
                              Name
                            </th>
                            <th className="border border-solid border-neutral-300 px-4 py-2">
                              ID
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {panel.teachers.map((teacher, index) => (
                            <tr key={index}>
                              <td className="border border-solid border-neutral-300 px-4 py-2 text-center">
                                {teacher.name}
                              </td>
                              <td className="border border-solid border-neutral-300 px-4 py-2 text-center">
                                {teacher.employeeId}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td className="border border-solid border-neutral-300 px-4 py-2 text-center">
                      <button
                        onClick={() => assignPanel(panel.id)}
                        className={
                          selectedPanel === panel.id
                            ? "bg-red-500 text-white px-4 py-2 rounded"
                            : "bg-blue-500 text-white px-4 py-2 rounded"
                        }
                      >
                        {selectedPanel === panel.id ? "Unselect" : "Select"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

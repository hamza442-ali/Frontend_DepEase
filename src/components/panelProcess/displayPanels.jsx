import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

export const PanelList = () => {
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState("card");
  const [dropdownVisible, setDropdownVisible] = useState({});

  useEffect(() => {
    // Fetch panel data from the backend using Axios.
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

  const handleEdit = (panelId) => {
    // Implement the edit functionality here.
    console.log("Edit panel with ID", panelId);
  };

  const handleDelete = (panelId) => {
    // Confirm if the user really wants to delete the panel
    if (window.confirm("Are you sure you want to delete this panel?")) {
      // Make an Axios request to delete the panel
      axios
        .delete(`http://localhost:3001/panel/deletePanelbyID/${panelId}`)
        .then((response) => {
          if (response.status === 200) {
            setPanels((prevPanels) =>
              prevPanels.filter((panel) => panel.id !== panelId)
            );
          } else {
            console.error("Failed to delete panel.");
          }
        })
        .catch((error) => {
          console.error("Error deleting panel:", error);
        });
    }
  };

  const filteredPanels = panels.filter((panel) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      panel.id.toString().includes(searchTermLower) ||
      panel.teachers.some(
        (teacher) =>
          teacher.name.toLowerCase().includes(searchTermLower) ||
          teacher.id.toString().includes(searchTermLower)
      )
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderTable = () => (
    <table className="w-full bg-white border-collapse border border-solid border-neutral-300 rounded-lg shadow-lg">
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
                        {teacher.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td className="border border-solid border-neutral-300 px-4 py-2 text-center">
              <button
                onClick={() => handleEdit(panel.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(panel.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderCard = () => (
    <div className="grid grid-cols-3 gap-4">
      {filteredPanels.map((panel) => (
        <div key={panel.id} className="p-4">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  
            <div className="flex flex-col items-center pb-10 mt-8">
            <img
                src={""}
                alt={"Hamza"}
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
               {panel.id}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Panel Head
              </span>
              <div classN="flex mt-4 md:mt-6">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {" "}
                  View Details
                </button>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">
                  {" "}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
  const notWork = () => (
    <div className="grid grid-cols-3 gap-4">
      {filteredPanels.map((panel) => (
        <div key={panel.id} className="p-4">
          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-end px-4 pt-4">
              <button
                onClick={() => {
                  setDropdownVisible((prev) => !prev);
                }}
                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button"
              >
                <span class="sr-only">Open dropdown</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>
              {dropdownVisible[panel.id] && (
              <div
                id="dropdown"
                className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul class="py-2" aria-labelledby="dropdownButton">
                  <li>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      Edit
                    </button>
                  </li>
                  <li>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
              )}

            </div>


            <div className="flex flex-col items-center pb-10">
              <img
                src={""}
                alt={""}
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Bonnie Green
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Visual Designer
              </span>
              <div classN="flex mt-4 md:mt-6">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {" "}
                  View Details
                </button>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">
                  {" "}
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="mt-14 mx-32 rounded-3xl shadow-lg p-4 bg-neutral-100">
        <h1 className="text-2xl font-bold mb-4">Panel List </h1>
      </div>

      <div className="mt-4 mx-32 rounded-3xl shadow-lg p-6 bg-neutral-100">
        <div className="rounded-3xl shadow-lg p-4 bg-neutral-90 mb-2 flex">
          <button className="bg-blue-500 px-4 py-2 text-white mr-2 rounded">
            Search
          </button>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="teacher name, teacher id, or panel id"
            className="p-2 border border-gray-300 rounded w-72"
          />

          <select
            className="ml-auto  bg-blue-500 text-white py-2 px-3 rounded focus:outline-none"
            onChange={(e) => setSelectedView(e.target.value)}
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </div>

        {selectedView === "table" ? renderTable() : renderCard()}
      </div>
    </>
  );
};

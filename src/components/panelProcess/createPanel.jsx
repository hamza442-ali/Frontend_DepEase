import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const PanelCreation = () => {
  const [semesterSeason, setSemesterSeason] = useState("summer");
  const [semesterNumber, setSemesterNumber] = useState("");
  const [panelId, setPanelId] = useState(1); // Initial panel ID
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  // const [createdPanel, setCreatedPanel] = useState(null);
  const [isCreatePanelClicked, setIsCreatePanelClicked] = useState(false);
  const [selectedPanelHead, setSelectedPanelHead] = useState(false);
  const [teacherData, setTeacherData] = useState([])

  // const simulatedTeacherList = [
  //   {
  //     id: "20i1881",
  //     name: "Syed Muhammad Ali",
  //     department: " Software",
  //     education: " PhD in SE",
      
  //   }
  // ];

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/teacher/getAll'); 
        setTeacherData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  // useEffect(() => {
  //   setTeacherList(simulatedTeacherList);
  // }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredTeachers = teacherData.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(query.toLowerCase()) ||
        teacher.id.toString().includes(query)
    );
    setTeacherList(filteredTeachers);
  };

  const handleTeacherSelection = (teacher) => {
    if (selectedTeachers.some((selected) => selected.employeeId === teacher.employeeId)) {
      setSelectedTeachers(
        selectedTeachers.filter((selected) => selected.employeeId !== teacher.employeeId)
      );
    } else {
      setSelectedTeachers([...selectedTeachers, teacher]);
    }

    // If the selected teacher is a panel head, update the state
    if (teacher.panelHead) {
      setSelectedPanelHead(true);
    } else if (selectedPanelHead?.employeeId === teacher.employeeId) {
      // If the deselected teacher was the panel head, clear the selection
      setSelectedPanelHead(false);
    }
  };

  const handleSemesterInputChange = (e) => {
    setSemesterSeason(e.target.value);
  };

  const handleSemesterNumberChange = (e) => {
    setSemesterNumber(e.target.value);
  };

  const openPopUp = () => {
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  const confirmPanelCreation = () => {
    if (!selectedPanelHead) {
      alert("Please select a panel head.");
      return;
    }

    const panelData = {
      id: `${semesterSeason}-${semesterNumber}-${panelId}`,
      teachers: selectedTeachers.map((teacher) => ({
        ...teacher,
        panelHead: teacher.employeeId === selectedPanelHead.employeeId,
      })),
    };

    axios
      .post("http://localhost:3001/panel/createPanel", panelData)
      .then((response) => {
        console.log("Response from the server:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Update the panel ID for the next panel
    setPanelId((prevPanelId) => prevPanelId + 1);

    // Close the popup
    setIsPopUpOpen(false);

    // Clear the selections
    setSelectedTeachers([]);
    setSelectedPanelHead(null);
  };

  const handleCreatePanelClick = () => {
    setIsCreatePanelClicked(true);
  };

  return (
    <>
      <div className="flex p-4 ml-32 mr-32 bg-neutral-50 mt-16 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create FYP Panel</h2>
        <button
          onClick={handleCreatePanelClick}
          className="bg-blue-500 text-white px-12 ml-auto py-2 rounded hover:bg-black"
        >
          Create Panel
        </button>
      </div>
      <div className="flex h-screen ml-32 mr-32 bg-neutral-100 mt-4 mb-14 rounded-3xl shadow-lg">
        <div className="w-1/4 p-6 bg-white shadow-lg rounded-3xl m-4">
          {isCreatePanelClicked && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Semester</h2>
              <div className="flex mb-4">
                <select
                  className="w-1/2 p-2 border rounded bg-blue-500 text-white"
                  value={semesterSeason}
                  onChange={handleSemesterInputChange}
                >
                  <option value="summer">Summer</option>
                  <option value="fall">Fall</option>
                  <option value="spring">Spring</option>
                </select>
                <input
                  type="number"
                  placeholder="Semester Number"
                  value={semesterNumber}
                  onChange={handleSemesterNumberChange}
                  className="w-1/2 ml-2 p-2 border rounded"
                />
              </div>

              <h2 className="text-2xl font-bold mb-4">Panel Id</h2>
              <input
                type="text"
                placeholder="Panel ID"
                value={` ${semesterSeason}-${semesterNumber}-${panelId}`}
                readOnly
                className="w-full mb-4 p-2 border rounded"
              />

              <button
                onClick={openPopUp}
                className="bg-blue-500 text-white px-24 ml-2 py-2 rounded hover:bg-black"
              >
                Create
              </button>
            </div>
          )}

          {!isCreatePanelClicked && (
            <p className="text-2xl text-center text-gray-500 mb-4 mt-16 border p-4">
              Click "Create Panel"
            </p>
          )}
        </div>

        <div className="w-3/4 p-6 bg-white shadow-md m-4 rounded-3xl">
          <div className="flex">
            <h1 className="text-3xl">Select Teachers</h1>
            <div className="mb-4 flex ml-auto">
              <input
                type="search"
                className="block rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out  focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search by ID or Name"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2 ">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          <table className="w-full border-collapse border border-solid border-neutral-300">
            <thead className="bg-table-blue text-white">
              <tr>
                <th className="text-center px-4 py-2">ID</th>
                <th className="text-center px-4 py-2">Name</th>
                <th className="text-center px-4 py-2">Department</th>
                <th className="text-center px-4 py-2">Education</th>
                <th className="text-center px-4 py-2">Select </th>
              </tr>
            </thead>
            <tbody>
              {teacherData.map((teacher) => (
                <tr key={teacher.employeeId} className="hover:bg-gray-100">
                  <td className="border-b  border-solid border-neutral- text-center p-4">
                    {teacher.employeeId}
                  </td>
                  <td className="border-b border-solid border-neutral-300 text-center p-4">
                    {teacher.name}
                  </td>
                  <td className="border-b border-solid border-neutral-300 text-center p-4">
                    {teacher.department}
                  </td>
                  <td className="border-b border-solid border-neutral-300 text-center p-4">
                    {teacher.education}
                  </td>

                  <td className="border-b border-solid border-neutral-300 text-center p-4">
                    <input
                      type="checkbox"
                      onChange={() => handleTeacherSelection(teacher)}
                      checked={selectedTeachers.some(
                        (selected) => selected.employeeId === teacher.employeeId
                      )}
                      className="mx-auto"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isPopUpOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-8 shadow-md rounded text-center max-w-3xl">
              <h3 className="text-3xl font-bold mb-4 text-blue-500">
                Confirm Panel Creation
              </h3>
              <p className="text-lg">Panel ID:</p>
              <p className="text-2xl font-bold text-blue-500 mb-4">
                {`${semesterSeason}-${semesterNumber}-${panelId}`}
              </p>
              <p className="text-lg mb-2">Selected Teachers:</p>
              <table className="w-full border-collapse border border-solid border-neutral-300">
                <thead className="bg-table-blue text-white">
                  <tr>
                    <th className="border border-solid border-neutral-300 text-center p-4">
                      ID
                    </th>
                    <th className="border border-solid border-neutral-300 text-center p-4">
                      Name
                    </th>
                    <th className="border border-solid border-neutral-300 text-center p-4">
                      Select Panel Head
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTeachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td className="border border-solid border-neutral-300 text-center px-4 py-2">
                        {teacher.id}
                      </td>
                      <td className="border border-solid border-neutral-300 text-center px-4 py-2">
                        {teacher.name}
                      </td>
                      <td className="border border-solid border-neutral-300 text-center px-4 py-2">
                        <input
                          type="radio"
                          name="panelHead"
                          onChange={() => setSelectedPanelHead(teacher)}
                          checked={selectedPanelHead?.employeeId === teacher.employeeId}
                          className="mx-auto"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6">
                <button
                  onClick={confirmPanelCreation}
                  className="bg-blue-500 text-white px-6 py-3 rounded mx-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Confirm
                </button>
                <button
                  onClick={closePopUp}
                  className="bg-red-500 text-white px-6 py-3 rounded mx-2 hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

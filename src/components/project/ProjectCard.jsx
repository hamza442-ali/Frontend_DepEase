import React,{useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCheckSquare,
  faBullhorn,
  faFileAlt, // New icon for deliverables
  faChartLine, // New icon for progress
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from 'react-toastify';
import person from "../../assets/images/person2.jpeg"; // for now harcoded image


const patterns = [
  'pattern-zigzag',
  'pattern-diagonal-lines',
  'pattern-isometric',
   'pattern-cross',
  'pattern-boxes',
  'pattern-rectangles',
  // Add more pattern classes as needed
];

const getRandomPattern = () => {
  const randomIndex = Math.floor(Math.random() * patterns.length);
  return patterns[randomIndex];
};



const ProjectCard = ({ project, onViewDetails, onViewEvaluation, onAnnouncementClick, onShowDeliverables, onShowProgress }) => {
  const randomPattern = getRandomPattern();
  const [groupData,setGroupData]=useState([]);




  
  const fetchData1 = async () => {
    try {
      const id =project.group;
      const response = await axios.get(`http://localhost:3001/group/getmine/${id}`); 
if(response.status===200){

  const teammateIds = [response.data.teamLeadId, response.data.teammate1Id, response.data.teammate2Id]; // Assuming you have teammate IDs in an array

  try {
    const requests = teammateIds.map(id => axios.get(`http://localhost:3001/student/getme/${id}`));
  
    const responses = await Promise.all(requests);
    
    const teammatesData = responses
      .filter(response => response.status === 200)
      .map(response => response.data);
  
     
    const formattedData = teammatesData.map(innerArray => innerArray[0]);
    setGroupData(formattedData);

  } catch (error) {
    console.error('Error fetching data:', error);
    toast.error('Error fetching teammates:', error);
  }  
} 
    } catch (error) {
      console.error('Error fetching your group data:', error);
      toast.error('Error fetching your group data:', error);
    }
  };



  useEffect(() => {
    fetchData1();
  }, []); 



  
  return (
    <div className="overflow-hidden transition duration-300 ease-in-out transform border border-gray-300 rounded-xl hover:scale-105">

      <div className={`flex items-center justify-center h-32 bg-sky-100 ${randomPattern} pattern-slate-900 pattern-bg-transparent pattern-opacity-60 pattern-size-8`}>
      </div>
      <div className="p-6">
        <h3 className="mb-3 text-2xl font-semibold text-gray-900">
          {project.ProjectId}
        </h3>
        <div className="flex flex-row justify-between">
        <p className="mb-4 text-gray-700 underline">
          <span className="font-semibold text-gray-900 ">Batch:</span>{" "}
          {project.batch}
        </p>
        <div className="flex flex-wrap mb-4">
        {groupData.map((member, index) => (
  member && member.student_name && (
    <img
      key={index}
      src={person}
      alt={member.student_name} // rendering the image when the data is fetched
      className="w-8 h-8 mb-2 -mr-2 rounded-full"
    />
  )
))}
        </div></div>
        <div className="flex justify-end space-x-4">
          <button
            className="text-gray-600 transition duration-300 transform hover:text-gray-800 focus:outline-none hover:scale-110"
            onClick={() => onViewDetails(project)}
          >
            <FontAwesomeIcon icon={faEye} className="text-xl" />
          </button>

          <button
            className="text-gray-600 transition duration-300 transform hover:text-gray-800 focus:outline-none hover:scale-110"
            onClick={() => onViewEvaluation(project)}
          >
            <FontAwesomeIcon icon={faCheckSquare} className="text-xl" />
          </button>

          <button
            className="text-gray-600 transition duration-300 transform hover:text-gray-800 focus:outline-none hover:scale-110"
            onClick={() => onAnnouncementClick(project)}
          >
            <FontAwesomeIcon icon={faBullhorn} className="text-xl" />
          </button>

          {/* New button for showing deliverables */}
          <button
            className="text-gray-600 transition duration-300 transform hover:text-gray-800 focus:outline-none hover:scale-110"
            onClick={() => onShowDeliverables(project)}
          >
            <FontAwesomeIcon icon={faFileAlt} className="text-xl" />
          </button>

          {/* New button for showing progress */}
          <button
            className="text-gray-600 transition duration-300 transform hover:text-gray-800 focus:outline-none hover:scale-110"
            onClick={() => onShowProgress(project)}
          >
            <FontAwesomeIcon icon={faChartLine} className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

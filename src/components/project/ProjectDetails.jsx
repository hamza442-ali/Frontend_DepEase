import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faUsers, faClock, faCogs, faChalkboardTeacher, faBriefcase, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';



const ProjectDetails = () => {
  const location = useLocation();
  const projects = location.state?.projectsData
  const [proposalData,setproposalData]=useState([]);
  const [groupData,setGroupData]=useState([]);
  const { projectId } = useParams();

  const project  = projects.find(project => project._id === projectId);

  const fetchData = async () => {
    let id=project.projectProposal;
    
    try {
      const response = await axios.get(`http://localhost:3001/proposals/getmine/${id}`);
      setproposalData(response.data);
    } catch (error) {
      console.error('Error fetching  Proposal:', error);
      toast.error('Error fetching  Proposal:', error);
    }
  };


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
    fetchData();
    fetchData1();
  }, []); 

  




  if (!project) {
    return <div className="mt-10 text-center text-gray-800">Project not found</div>;
  }

  return (
    <div className="container p-8 mx-auto my-10 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
      <h2 className="mb-6 text-3xl font-semibold text-center text-gray-900">{proposalData.title} </h2>
      
      {/* Project ID Section */}
      <div className="flex items-center mb-8">
        <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-gray-600" />
        <span className="text-gray-600">{project.ProjectId}</span>
      </div>

      {/* Problem Statement Section */}
      <div className="mb-8">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">Problem Statement</h3>
        <p className="text-gray-600">{proposalData.problemStatement}</p>
      </div>

      {/* Teammates Section */}
      <div className="mb-8">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          <FontAwesomeIcon icon={faUsers} className="mr-2 text-gray-600" />
          Teammates
        </h3>
        <ul className="pl-6 text-gray-600 list-disc">
          {groupData.map((member, index) => (
            <li key={index}>{member.student_name}  <span className="ml-5 "> {member.email_address }</span></li>
          ))}
        </ul>
      </div>

      {/* Project Details Section */}
      <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-600" />
            Project Timeline
          </h3>
          {
         proposalData.timeline?.map((timeline, index) => (
            <p key={index} className="text-gray-600"> - {timeline}</p>  ))
            }

            <h3 className="mt-4 mb-2 text-xl font-semibold text-gray-900">
            <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-gray-600" />
            ProjectType
          </h3>
          <p className="mb-2 text-gray-600">{proposalData.ProjectType}</p>

          <h3 className="mt-4 mb-2 text-xl font-semibold text-gray-900">
            <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-gray-600" />
            Technology Used
          </h3>
          <p className="text-gray-600">{proposalData.technologyUsed}</p>
         
        </div>

        <div>
         

          <h3 className="mt-2 mb-2 text-xl font-semibold text-gray-900">
            <FontAwesomeIcon icon={faCogs} className="mr-2 text-gray-600" />
            Modules
          </h3>
          {
            proposalData.modules?.map((module, index) => (
              <p key={index} className="text-gray-600">- {module}</p> ))
          }
          <h3 className="mt-4 mb-2 text-xl font-semibold text-gray-900">
            <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2 text-gray-600" />
            Supervisor
          </h3>
          <p className="text-gray-600">{proposalData.supervisor}</p>

        
        </div>
      </div>

      {/* Problem Solution and Scope Sections */}
      <div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">Problem Solution</h3>
        <p className="text-gray-600">{proposalData.problemSolution}</p>

        <h3 className="mt-4 mb-2 text-xl font-semibold text-gray-900">Scope</h3>
        <p className="text-gray-600">{proposalData.scope}</p>
      </div>
    </div>
  );
};

export default ProjectDetails;

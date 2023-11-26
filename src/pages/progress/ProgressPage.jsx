// ProgressPage.js
import React,{useState,useEffect} from 'react';
import TeamMemberCard from '../../components/dashboard/TeamMemberCard';
import CircleProgressChart from '../../components/graphs/CircleProgressChart';
import BarChartComponent from '../../components/graphs/BarChart';
import AssignedRequirementsCard from '../../components/dashboard/AssignedRequirementsCard';
import DeadlineChart from '../../components/graphs/DeadlineChart';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation,useParams } from "react-router-dom";
import NoDataFound from '../../components/handlers/NoDataFound';


const ProgressPage = () => {

  const location = useLocation();
  const projects = location.state?.projectsData
  const { projectId } = useParams();

  const project  = projects.find(project => project._id === projectId);
  const [getRequirements, setRequirements] = useState([]);

  

  

  const fetchData = async () => {
   
    try {
      const response = await axios.get(
        `http://localhost:3001/requirements/getRequirements/${project.ProjectId}`
      ); 
      setRequirements(response.data);
    } catch (error) {
      toast.error("Failed to fetch requirements",error);
    }

  };
  useEffect(() => {
    fetchData();
  }, []); 
  
if(getRequirements.length===0){
  return <NoDataFound/>
}
 

// mechanism for  circle progres chart component
  const totalInProgress = getRequirements.filter(
    (req) => req.status === "In Progress"
  ).length;
  const totalPending = getRequirements.filter((req) => req.status === "Pending").length;
  const totalCompleted = getRequirements.filter(
    (req) => req.status === "Completed"
  ).length;

  const RequriemnetProgress = [
    { name: 'Pending', value: totalPending },
    { name: 'In Progress', value: totalInProgress},
    { name: 'Completed', value: totalCompleted},
  ];


  return (
    <div className="p-8 ml-20 ">
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">Requirements Progress</h2>
          <CircleProgressChart data={RequriemnetProgress} />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-10 text-2xl font-semibold">Monthly Completed Requirements</h2>
          <BarChartComponent  data={getRequirements}/>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
      <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">Pending This Week</h2>
          <AssignedRequirementsCard  data={getRequirements} />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">Deliverable Deadlines</h2>
          <DeadlineChart data={getRequirements} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
      </div>
    </div>
  );
};


export default ProgressPage;

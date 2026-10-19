import React,{useState,useEffect} from 'react';
import TeamMemberCard from '../../components/dashboard/TeamMemberCard';
import CircleProgressChart from '../../components/graphs/CircleProgressChart';
import BarChartComponent from '../../components/graphs/BarChart';
import AssignedRequirementsCard from '../../components/dashboard/AssignedRequirementsCard';
import DeadlineChart from '../../components/graphs/DeadlineChart';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setGroupData } from '../../redux/slices/group/groupSlice';
const Dashboard = () => {
  const dispatch = useDispatch();
  const [teamMembers, setTeamMembers] = useState([] );
  const [getRequirements, setRequirements] = useState([]);

  const projectData = useSelector(state => state.project);

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


  const fetchData = async () => {
    try {
      const id =projectData.group;
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
    setTeamMembers(formattedData)

    
    dispatch(setGroupData(formattedData)); // Store group data in Redux

  } catch (error) {
    console.error('Error fetching data:', error);
    toast.error('Error fetching teammates:', error);
  }  
} 
    } catch (error) {
      console.error('Error fetching your group data:', error);
      toast.error('Error fetching your group data:', error);
    }

    try {
      const response = await axios.get(
        `http://localhost:3001/requirements/getRequirements/${projectData.ProjectId}`
      ); 
      setRequirements(response.data);
    } catch (error) {
      toast.error("Failed to fetch requirements");
    }

  };
  useEffect(() => {
    fetchData();
  }, []); 
  

  if(!projectData || projectData.ProjectId==null || projectData===undefined ){
    toast.info("Please give proposal first");
    return (<div>
    
      <h2 className="p-2 mb-4 ml-28 font-serif text-xl  text-gray-800 font-semiboldp-2"> Please Add a proposal First</h2>
    </div>
  )}

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
      <h1 className="mb-8 text-3xl font-semibold">Team Members</h1>
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} name={member.student_name} email={member.email_address} photo={member.photo} />
        ))}
      </div>
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

export default Dashboard;

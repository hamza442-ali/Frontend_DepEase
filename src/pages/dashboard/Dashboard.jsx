import React,{useState,useEffect} from 'react';
import TeamMemberCard from '../../components/dashboard/TeamMemberCard';
import CircleProgressChart from '../../components/graphs/CircleProgressChart';
import BarChartComponent from '../../components/graphs/BarChart';
import AssignedRequirementsCard from '../../components/dashboard/AssignedRequirementsCard';
import WorkDistributionChart from '../../components/graphs/WorkDistributionChart';
import MonthlyRequirementsChart from '../../components/graphs/MonthlyRequirementsChart';
import DeadlineChart from '../../components/graphs/DeadlineChart';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const teamMembers = [
  { name: 'John Doe', email: 'john@example.com', photo: 'url_to_photo1' },
  { name: 'Jane Smith', email: 'jane@example.com', photo: 'url_to_photo2' },
  { name: 'King Kong', email: 'knog@example.com', photo: 'url_to_photo2' },
  // Add more team members as needed
];





const Dashboard = () => {
  const [data, setData] = useState([]);

  // const studentData = useSelector((state) => state.student);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3001/group/getone/${"F20-126-D"}`); 
  //     setData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     toast.error('Error fetching requests:', error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []); 
  

  // if (!studentData) {
  //   return <div className=' ml-96'>Loading...</div>; // or handle the loading state in your desired way
  // }

  return (
    <div className="p-8 ml-20 ">
      <h1 className="mb-8 text-3xl font-semibold">Team Members</h1>
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} name={member.name} email={member.email} photo={member.photo} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">Requirements Progress</h2>
          <CircleProgressChart />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-10 text-2xl font-semibold">Monthly Completed Requirements</h2>
          <BarChartComponent />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">Work Distribution</h2>
          <WorkDistributionChart />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">Deliverable Deadlines</h2>
          <DeadlineChart />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">Pending This Week</h2>
          <AssignedRequirementsCard />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">Requirements Completed </h2>
          <MonthlyRequirementsChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

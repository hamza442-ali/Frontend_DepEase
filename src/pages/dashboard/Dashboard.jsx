import React from 'react';
import TeamMemberCard from '../../components/dashboard/TeamMemberCard';
import CircleProgressChart from '../../components/graphs/CircleProgressChart';
import BarChartComponent from '../../components/graphs/BarChart';
import AssignedRequirementsCard from '../../components/dashboard/AssignedRequirementsCard';
import WorkDistributionChart from '../../components/graphs/WorkDistributionChart';
import MonthlyRequirementsChart from '../../components/graphs/MonthlyRequirementsChart';
import DeadlineChart from '../../components/graphs/DeadlineChart';

const teamMembers = [
  { name: 'John Doe', email: 'john@example.com', photo: 'url_to_photo1' },
  { name: 'Jane Smith', email: 'jane@example.com', photo: 'url_to_photo2' },
  { name: 'King Kong', email: 'knog@example.com', photo: 'url_to_photo2' },
  // Add more team members as needed
];

const Dashboard = () => {
  return (
    <div className="p-8 ml-20 ">
      <h1 className="text-3xl font-semibold mb-8">Team Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} name={member.name} email={member.email} photo={member.photo} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Requirements Progress</h2>
          <CircleProgressChart />
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-10">Monthly Completed Requirements</h2>
          <BarChartComponent />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Work Distribution</h2>
          <WorkDistributionChart />
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Deliverable Deadlines</h2>
          <DeadlineChart />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Pending This Week</h2>
          <AssignedRequirementsCard />
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Requirements Completed </h2>
          <MonthlyRequirementsChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

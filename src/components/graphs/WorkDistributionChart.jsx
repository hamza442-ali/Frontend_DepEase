import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'John Doe', completed: 30 },
  { name: 'Jane Smith', completed: 40 },
  { name: 'Alice Johnson', completed: 25 },
];

const WorkDistributionChart = (props) => {

  // const filteredRequirements = props.data.filter(req => {
  //   const validStatus = req.status === 'completed';
  //   const validAssignees = ['Mahad Rahat', 'Mian Abdullah', 'Ali Hamza'].includes(req.assignedTo);
  //   return validStatus && validAssignees;
  // });
  
  // const data = filteredRequirements.reduce((result, req) => {
  //   const existingIndex = result.findIndex(item => item.name === req.assignedTo);
  //   if (existingIndex !== -1) {
  //     result[existingIndex].completed++;
  //   } else {
  //     result.push({ name: req.assignedTo, completed: 1 });
  //   }
  //   return result;
  // }, []);
  
  // console.log(data);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WorkDistributionChart;

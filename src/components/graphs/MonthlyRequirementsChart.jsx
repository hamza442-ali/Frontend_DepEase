import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Month 1', completed: 20 },
  { name: 'Month 2', completed: 35 },
  { name: 'Month 3', completed: 5 },
  { name: 'Month 4', completed: 12 },
  { name: 'Month 5', completed: 0 },
  { name: 'Month 6', completed: 11 },
  { name: 'Month 7', completed: 17 },
  { name: 'Month 8', completed: 28 },
  // Add more months as needed
];

const MonthlyRequirementsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="completed" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyRequirementsChart;

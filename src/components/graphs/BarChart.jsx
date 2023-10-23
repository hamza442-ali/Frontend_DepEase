import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Month 1', completed: 20 },
    { name: 'Month 2', completed: 35 },
    { name: 'Month 3', completed: 5 },
    { name: 'Month 4', completed: 12 },
    { name: 'Month 5', completed: 0 },
    { name: 'Month 6', completed: 11 },
    { name: 'Month 7', completed: 17 },
    { name: 'Month 8', completed: 28 },
];

const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



const BarChartComponent = (props) => {

// mechanism for  Bar char component
const today = new Date();
const currentMonth = today.getMonth() + 1; // Adding 1 to get month number starting from 1 (January is 1, February is 2, and so on)

const data = Array.from({ length: 12 }, (_, index) => {
  const monthIndex = (currentMonth + index) % 12; // Calculate month index, wrapping around to handle year change
  const monthName = new Date(2023, monthIndex, 1).toLocaleString('default', { month: 'long' }); // Get month name from its index

  const completedRequirements = props.data.filter(requirement => {
    const deadline = new Date(requirement.deadline);
    return deadline.getMonth() === monthIndex && deadline <= today;
  });

  return {
    name: `${monthName} `,
    completed: completedRequirements.length,
  };
});



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

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';



const DeadlineChart = (props) => {

  const monthlyData = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const monthString = month < 10 ? `0${month}` : `${month}`;
    const year = 2023; // You can change the year as needed
    const formattedMonth = `${year}-${monthString}`;
    const deadlines = props.data
      .filter(requirement => {
        const requirementMonth = requirement.deadline.substring(0, 7); // Extracts YYYY-MM from the deadline
        return requirementMonth === formattedMonth;
      })
      .map(requirement => requirement.deadline);
  
    return {
      name: `Month ${month}`,
      deadlines: deadlines,
    };
  });
  
  console.log(monthlyData);


  return (
    <div className="">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis interval={1} />
          <Tooltip content={<CustomTooltip />} />
          {monthlyData.map((entry, index) => (
            <Line key={index} dataKey={`deadlines.length`} stroke="#4CAF50" dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const deadlines = payload[0].payload.deadlines;
    return (
      <div className="p-2 bg-white rounded shadow">
        <p className="font-semibold">{`Deadlines for ${label}:`}</p>
        <ul>
          {deadlines.map((deadline, index) => (
            <li key={index}>{deadline}</li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default DeadlineChart;

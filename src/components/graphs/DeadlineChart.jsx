import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'Month 1', deadlines: ['2023-01-15', '2023-01-31'] },
  { name: 'Month 2', deadlines: ['2023-02-10'] },
  { name: 'Month 3', deadlines: ['2023-03-15', '2023-03-31','2023-03-31'] },
  { name: 'Month 4', deadlines: ['2023-04-20'] },
  { name: 'Month 5', deadlines: ['2023-05-10', '2023-05-25'] },
  { name: 'Month 6', deadlines: [] },
  { name: 'Month 7', deadlines: ['2023-07-05'] },
  { name: 'Month 8', deadlines: ['2023-08-10', '2023-08-20'] },
];

const DeadlineChart = () => {
  return (
    <div className="">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis interval={1} />
          <Tooltip content={<CustomTooltip />} />
          {data.map((entry, index) => (
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
      <div className="bg-white p-2 shadow rounded">
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

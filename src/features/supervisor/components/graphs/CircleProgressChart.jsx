import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#FF5733', '#FFC300', '#4CAF50'];

const CircleProgressChart = (props) => {
  return (
    <div className="flex items-center justify-center">
      <PieChart width={300} height={300}>
        <Pie
          data={props.data}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          fill="#8884d8"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${props.data[index].name}`}
              </text>
            );
          }}
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CircleProgressChart;

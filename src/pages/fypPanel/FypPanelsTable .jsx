import React from 'react';
import { useNavigate } from 'react-router-dom';

const FypPanelsTable = () => {
  const navigate = useNavigate();

  // Dummy data for FYP Panels
  const panels = [
    {
      id: '1',
      teachers: [
        { id: 101, name: 'John Doe' },
        { id: 102, name: 'Jane Doe' },
      ],
    },
    {
      id: '2',
      teachers: [
        { id: 201, name: 'Alice Smith' },
        { id: 202, name: 'Bob Johnson' },
      ],
    },
    // Add more dummy data as needed
  ];

  const handlePanelClick = (panel) => {
    navigate(`/panel/${panel.id}`, { state: { panel } });
  };

  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border shadow-md">
        <thead className="text-white bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left">Panel ID</th>
            <th className="px-4 py-2 text-left">Teachers</th>
          </tr>
        </thead>
        <tbody>
          {panels.map((panel) => (
            <tr
              key={panel.id}
              className="transition-all cursor-pointer hover:bg-gray-200"
              onClick={() => handlePanelClick(panel)}
            >
              <td className="px-4 py-2">{panel.id}</td>
              <td className="px-4 py-2">
                {panel.teachers.map((teacher, index) => (
                  <div key={teacher.id} className={index === 0 ? 'mb-1' : ''}>
                    {teacher.name} (ID: {teacher.id})
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FypPanelsTable;

import React, { useState } from 'react';
import TeacherInfo from './TeacherInfo';
import ProjectInfo from './ProjectInfo';

const FypPanel = () => {
  const [evaluationStatus, setEvaluationStatus] = useState('Not Evaluated');

  const handleEvaluateClick = () => {
    // Assume some evaluation logic here
    setEvaluationStatus('Evaluated');
  };

  // Dummy data
  const teachersData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', profilePic: 'teacher1.jpg' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', profilePic: 'teacher2.jpg' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '555-555-5555', profilePic: 'teacher3.jpg' },
    { id: 4, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '444-444-4444', profilePic: 'teacher4.jpg' },
    { id: 5, name: 'Eve Thompson', email: 'eve.thompson@example.com', phone: '333-333-3333', profilePic: 'teacher5.jpg' },
    { id: 6, name: 'Alex Brown', email: 'alex.brown@example.com', phone: '222-222-2222', profilePic: 'teacher6.jpg' },
    { id: 7, name: 'Chris Davis', email: 'chris.davis@example.com', phone: '111-111-1111', profilePic: 'teacher7.jpg' },
    // Add more teacher data as needed
  ];

  const projectData = {
    projectName: 'Awesome Project',
    id: 'P123',
    teammates: [
      { id: 1, name: 'Teammate 1', email: 'teammate1@example.com', profilePic: 'teammate1.jpg' },
      { id: 2, name: 'Teammate 2', email: 'teammate2@example.com', profilePic: 'teammate2.jpg' },
      { id: 3, name: 'Teammate 3', email: 'teammate3@example.com', profilePic: 'teammate3.jpg' },
      // Add more teammate data as needed
    ],
  };

  return (
    <div className="p-8 text-center bg-gray-100 rounded-lg shadow-md">
    <section className="mb-3">
        <ProjectInfo project={projectData} />
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {teachersData.map((teacher) => (
          <TeacherInfo key={teacher.id} teacher={teacher} />
        ))}
      </section>
      
      <section className="flex items-center justify-center mt-6">
        <button
          className={`bg-blue-500 text-white px-6 py-2 rounded-full transition-transform duration-300 ease-in-out ${
            evaluationStatus === 'Evaluated' ? 'bg-opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 transform hover:scale-105'
          }`}
          onClick={handleEvaluateClick}
          disabled={evaluationStatus === 'Evaluated'}
        >
          {evaluationStatus === 'Evaluated' ? 'Already Evaluated' : 'Evaluate'}
        </button>
        {evaluationStatus === 'Evaluated' && (
          <p className="ml-4 text-gray-600">
            Evaluation Completed
          </p>
        )}
      </section>
    </div>
  );
};

export default FypPanel;

import React, { useState } from 'react';
import ProjectIdeasCard from './ProjectIdeasCard';

const ProjectIdeasList = ({ projectIdeas }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIdeas = projectIdeas.filter(idea =>
    idea.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by description..."
        className="w-full p-2 mb-4 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredIdeas.map((idea, index) => (
        <ProjectIdeasCard
          key={index}
          title={idea.title}
          description={idea.description}
          teacherName={idea.teacherName}
        />
      ))}
    </div>
  );
};

export default ProjectIdeasList;

import React from 'react';
import ProjectIdeasList from '../../components/projectideas/ProjectIdeasList';

const projectIdeas = [
  {
    title: 'Project Idea 1',
    description: 'devops project this is ',
    teacherName: 'umer baiq',
  },
  {
    title: 'Project Idea 2',
    description: 'Ai base mobile app will recommend you palces to visist in city',
    teacherName: 'Saad khan',
  },
  {
    title: 'Project Idea 3',
    description: 'Ai based app that will identity fake news',
    teacherName: 'Naeem Akhtar',
  },

  
  // Add more project ideas as needed
];

const ProjectIdeasPage = () => {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-semibold">Project Ideas</h1>
      <ProjectIdeasList projectIdeas={projectIdeas} />
    </div>
  );
};

export default ProjectIdeasPage;

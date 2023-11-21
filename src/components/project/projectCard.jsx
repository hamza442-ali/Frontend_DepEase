import React from 'react';

  import projectImg from '../../assets/images/projectPropose (1).jpg'
 import proImg from './CSS.png'

export const ProjectCard = () => {

    const projects = [
        {
          title: 'MERN STACK',
          description: 'The project will address a set of goals for the project, the overall objectives for the project.',
          imageUrl: require('./MERN.png').default,
          link: 'https://example.com/mern-stack',
        }, {
            title: 'MERN STACK',
            description: 'The project will address a set of goals for the project, the overall objectives for the project. ',
            imageUrl: require('./MERN.png').default,
            link: 'https://example.com/mern-stack',
          }, {
            title: 'MERN STACK',
            description: 'The project will address a set of goals for the project, the overall objectives for the project.',
            imageUrl: require('./MERN.png').default,
            link: 'https://example.com/mern-stack',
          }
      ];

  return (



    <div className="p-16 ml-32">
          {/* <img src={projectImg } alt="Announcement"  className="  p-4  rounded-lg shadow-lg mb-4" /> */}

    <div className="flex justify-between items-center mb-4">

        <h1 className="text-2xl font-bold"> Projects</h1>
        <div>
            <button className="bg-purple-500 text-white px-4 py-2 rounded">+ Add new</button>
        </div>
    </div>
    <div className="flex justify-between ">
        <div className="flex">
            <button className="bg-purple-500 text-white px-4 py-2 rounded mr-2">Search</button>
            <input type="text" placeholder="Search:" className="border rounded p-2" />
        </div>
        {/* <div className="flex items-center">
           
        </div> */}
    </div>
    
    <div className="projectSection">
      <h1 className="project text-4xl font-bold text-white text-center ">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="card bg-white rounded-lg shadow-md p-4 hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => window.open(project.link, '_blank')}
          >
            <img
              src={proImg}
              alt={project.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h1 className="text-lg font-semibold mt-4">{project.title}</h1>
            <p className="text-gray-600">{project.description}</p>
            <button className="bg-indigo-500 text-white mt-4 py-2 px-4 rounded-full hover:bg-indigo-600 transition-colors">
              Check
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>



  );
};



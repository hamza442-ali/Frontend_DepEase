import React from 'react'; 
import {
  BrowserRouter,
  Routes,
  Route,     //npm install react-router-dom
} from "react-router-dom";
import Home from './pages/home/Home';
import MainLayout from './pages/mainLayout/MainLayout ';
import Navbar from './components/Navbar/Navbar';
// import About from './About';
// import Contact from './Contact';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManageDelieverables from './pages/manageDelieverables/ManageDelieverables';
import EmailPage from './pages/email/Email';
import PageInfo from './components/PageInfo/PageInfo';
import AnnouncementPage from './pages/Announcement/AnnouncementPage';
import ProjectPage from './pages/project/ProjectPage';
import ProjectDetails from './components/project/ProjectDetails';
import person from "./assets/images/person2.jpeg";
import Evaluation from './components/evaluation/EvaluationDetails';
import CalendarPage from './pages/SchedulerPage/Calender';
import ProjectIdeasPage from './pages/ProjectIdeas/ProjectIdeas';


const projectsData = [
  {
    id: 1,
    title: "Project 1",
    problemStatement: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
    problemSolution: "Consectetur adipiscing elit. Consectetur adipiscing elit.Consectetur adipiscing elit.Consectetur adipiscing elit.Consectetur adipiscing elit.",
    scope: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
    members: [
      { name: "Alice", avatar: person },
      { name: "Bob", avatar: person },
    ],
    timeline: "1 month",
    modules: "Module 1, Module 2",
    teamLead: "Alice kob",
    supervisor: "Jane Smith",
    technologyUsed: "React, Node.js",
  },

  {
    id: 2,
    title: "Project 2",
    problemStatement: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
    problemSolution: "Consectetur adipiscing elit. Consectetur adipiscing elit.Consectetur adipiscing elit.Consectetur adipiscing elit.Consectetur adipiscing elit.",
    scope: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
    members: [
      { name: "Alice", avatar: person },
      { name: "Bob", avatar: person },
    ],
    timeline: "1 month",
    modules: "Module 1, Module 2",
    teamLead: "Alice kob",
    supervisor: "Jane Smith",
    technologyUsed: "React, Node.js",
  },
  // Add more sample projects here
];

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <ToastContainer />
    <MainLayout />
    <PageInfo/>
    <Routes>

    <Route path="/" element={<ProjectPage />} />
    <Route path="/project/:projectId" element={<ProjectDetails projects={projectsData} />} />
    <Route path="/evaluation/:projectId" element={<Evaluation/>} />
    <Route path="/announce" element={<AnnouncementPage/>} />
    <Route path="/email" element={<EmailPage/>} />
    <Route path="/del" element={<ManageDelieverables/>} />
    <Route path="/cal" element={<CalendarPage/>} />
    <Route path="/ProjectIdeas" element={<ProjectIdeasPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
//npm install react-icons react-hook-form
//npm install framer-motion




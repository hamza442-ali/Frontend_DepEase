import React from 'react'; 
import {
  BrowserRouter,
  Routes,
  Route,     //npm install react-router-dom
} from "react-router-dom";
import MainLayout from './pages/mainLayout/MainLayout ';
import Navbar from './components/Navbar/Navbar';
// import About from './About';
// import Contact from './Contact';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailPage from './pages/email/Email';
import PageInfo from './components/PageInfo/PageInfo';
import ProjectPage from './pages/project/ProjectPage';
import ProjectDetails from './components/project/ProjectDetails';
import Evaluation from './components/evaluation/EvaluationDetails';
import CalendarPage from './pages/SchedulerPage/Calender';
import ProjectIdeasPage from './pages/ProjectIdeas/ProjectIdeas';
import DeliverablesPage from './pages/deliverables/DeliverablesPage';
import  ProgressPage from './pages/progress/ProgressPage';
import AnnouncementsPage from './pages/Announcement/AnnouncementPage';
import RequestApprovalPage from './pages/requestApprove/RequestApprovalPage';
import FypPanelsTable from './pages/fypPanel/FypPanelsTable ';




function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <ToastContainer />
    <MainLayout />
    <PageInfo/>
    <Routes>
    <Route path="/announce" element={<AnnouncementsPage/>} />
    <Route path="/fyppanel" element={<FypPanelsTable/>} />
    <Route path="/resourceApprove" element={<RequestApprovalPage/>} />
    <Route path="/" element={<ProjectPage />} />
    <Route path="/project/:projectId" element={<ProjectDetails/>} />
    <Route path="/deliverables/:projectId" element={<DeliverablesPage />} />
    <Route path="/progress/:projectId" element={< ProgressPage  />} />
    <Route path="/evaluation/:projectId" element={<Evaluation/>} />
    <Route path="/email" element={<EmailPage/>} />
    <Route path="/scheduler" element={<CalendarPage/>} />
    <Route path="/ProjectIdeas" element={<ProjectIdeasPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
//npm install react-icons react-hook-form
//npm install framer-motion




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
import Panel from './pages/fypPanel/FypPanel';
import { DynamicEvaluationForm } from './pages/evaluation/EvaluationForm';
import Login from './pages/signin/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import LogoutPage from './pages/signin/Logout.jsx';
import ComponentSwitcher from './components/pipeline/PipelineSelect.jsx';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <ToastContainer />
    <MainLayout />
    <PageInfo/>
    <Routes>
    
   
    <Route path="/Login" element={<Login/>} />
    <Route path="/logout" element={<PrivateRoute Component={LogoutPage}/>} />
    <Route path="/addEvaluation/:projectId" element={<PrivateRoute Component={DynamicEvaluationForm}/>} />
    <Route path="/announce" element={<PrivateRoute Component={AnnouncementsPage}/>} />
    <Route path="/fyppanels" element={<PrivateRoute Component={Panel}/>} />
    <Route path="/resourceApprove" element={<PrivateRoute Component={RequestApprovalPage}/>} />
    <Route path="/projectsManage" element={<PrivateRoute Component={ProjectPage }/>} />
    <Route path="/project/:projectId" element={<PrivateRoute Component={ProjectDetails}/>} />
    <Route path="/pipeline/:projectId" element={<PrivateRoute Component={ComponentSwitcher} />} />
    <Route path="/deliverables/:projectId" element={<PrivateRoute Component={DeliverablesPage} />} />
    <Route path="/progress/:projectId" element={<PrivateRoute Component={ ProgressPage } />} />
    <Route path="/evaluation/:projectId" element={<PrivateRoute Component={Evaluation}/>} />
    <Route path="/email" element={<PrivateRoute Component={EmailPage}/>} />
    <Route path="/scheduler" element={<PrivateRoute Component={CalendarPage}/>} />
    <Route path="/ProjectIdeas" element={<PrivateRoute Component={ProjectIdeasPage}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
//npm install react-icons react-hook-form
//npm install framer-motion




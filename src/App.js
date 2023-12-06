import React from 'react'; 
import {
  BrowserRouter,
  Routes,
  Route,     //npm install react-router-dom
} from "react-router-dom";
import Home from './pages/home/Home';
import MainLayout from './pages/mainLayout/MainLayout ';
import Navbar from './components/Navbar/Navbar';
import RequestApprovalPage from "./pages/membermanage/RequestApprovalPage.jsx"
import RequirementForm from "./pages/requirementPanel/RequirementForm.jsx"
import ManageRequirements from './pages/managerequirements/ManageRequirements';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProposalForm from './pages/proposal/Proposal';
import StudentResourceRequest from './components/resourceRequest/StudentResourceRequest';
import DocumentPreview from './components/documents/DocumentPreview';
import ManageDelieverables from './pages/manageDelieverables/ManageDelieverables';
import Board from './pages/board/Board';
import ViewFYPEvaluationPage from './pages/evaluation/FypEvaluation';
import EmailPage from './pages/email/Email';
import PageInfo from './components/PageInfo/PageInfo';
import Dashboard from './pages/dashboard/Dashboard';
import TableComponent from './components/resourceRequest/TableComponent';
import Login from './pages/signin/Login';
import ProjectDetails from './pages/projectDetails/ProjectDetails.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import LogoutPage from './pages/signin/Logout.jsx';



function App() {

  return (
    <BrowserRouter>
    
    <Navbar/>
    <ToastContainer />
    <MainLayout />
    <PageInfo/>
    <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/logout" element={<PrivateRoute Component={LogoutPage}/>} />
    <Route path="/announce" element={<PrivateRoute Component={Home}/>} />
    <Route path="/detail" element={<PrivateRoute Component={ProjectDetails}/>} />
    <Route path="/evaluation" element={<PrivateRoute Component={ViewFYPEvaluationPage}/>} />
    <Route path="/email" element={<PrivateRoute Component={EmailPage}/>} />
    <Route path="/deliverable" element={<PrivateRoute Component={ManageDelieverables}/>} />
    <Route path="/board" element={<PrivateRoute Component={Board}/>} />
    <Route path="/resourceForm" element={<PrivateRoute Component={StudentResourceRequest}/>} />
    <Route path="/doc" element={<PrivateRoute Component={DocumentPreview}/>} />
    <Route path="/request/approval" element={<PrivateRoute Component={RequestApprovalPage}/>} />
    <Route path="/requirement/display" element={<PrivateRoute Component={ManageRequirements } />}/>
    <Route path="/requirement/add" element={<PrivateRoute Component={RequirementForm} />}/>
    <Route path="/proposal" element={<PrivateRoute Component={ProposalForm}/>} />
    <Route path="/dashboard" element={<PrivateRoute Component={Dashboard}/>}/>
    <Route path="/resourceManage" element={<PrivateRoute Component={TableComponent}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;





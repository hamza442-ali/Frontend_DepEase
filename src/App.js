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
import MemberPage from "./pages/membermanage/MemberPage.jsx"
import Teammates from './pages/managemember/Teammates';
import RequirementForm from "./pages/requirementPanel/RequirementForm.jsx"
import ManageRequirements from './pages/managerequirements/ManageRequirements';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProposalForm from './pages/proposal/Proposal';
import StudentResourceRequest from './components/resourceRequest/StudentResourceRequest';
import DocumentPreview from './components/documents/DocumentPreview';
import ManageDelieverables from './pages/manageDelieverables/ManageDelieverables';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <ToastContainer />
    <MainLayout />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/del" element={<ManageDelieverables/>} />
    <Route path="/res" element={<StudentResourceRequest/>} />
    <Route path="/doc" element={<DocumentPreview/>} />
    <Route path="/members/add" element={<MemberPage/>} />
    <Route path="/requirement/display" element={<ManageRequirements  />}/>
    <Route path="/requirement/add" element={<RequirementForm />}/>
    <Route path="/proposal" element={<ProposalForm/>} />
    <Route path="/members/manage" element={<Teammates/>}/>
       {/* Define your routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
//npm install react-icons react-hook-form
//npm install framer-motion




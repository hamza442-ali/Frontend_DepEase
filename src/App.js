import "./App.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route, //npm install react-router-dom
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { RecoilRoot } from 'recoil';

import { Navbar } from "./components/Navbar/Navbar";
import { MainLayout } from "./pages/mainLayout/MainLayout ";
import { Home } from "./pages/home/Home";
import { PanelCreation } from "./components/panelProcess/createPanel";
import { PanelList } from "./components/panelProcess/displayPanels";
import { AssignPanel } from "./components/panelProcess/assignPanel";
import { Calendar } from "./components/scheduling/Schedulings";
import { AdminAnnouncement } from "./components/panelProcess/makeAnnouncements";
import { ProfilePage } from "./components/profile/userProfile";
import { AddTeacher } from "./components/users/AddTeacher";
import { LoginPage } from "./pages/loginPage/LoginPage";
import { AddStudent } from "./components/users/AddStudent";
import { ProjectCard } from "./components/project/projectCard";
import { EvaluationForm } from "./components/evaluation/CreateEvaluation";
import { Grid } from "./components/checkNbalance/grid";
import { DynamicEvaluationForm } from "./components/evaluation/displayEvaluationForm";
import { RequestApprovalPage } from "./pages/resourceRequestPage/requestApprovalPage";


import {LandingPage} from './pages/landingPage/LandingPage'
import { EvaluationDetails } from "./components/evaluation/evaluateGroup";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<LoginPage />} />


          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <ToastContainer />
                <MainLayout />
                <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/userProfile" element={<ProfilePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/fypPanel/add" element={<PanelCreation />} />
          <Route path="/fypPanel/display" element={<PanelList />} />
          <Route path="/fypPanel/assign" element={<AssignPanel />} />
          <Route path="/scheduling/add" element={<Calendar />} />
          <Route path="/announcement/add" element={<AdminAnnouncement />} />
          <Route path="/users/addTeacher" element={<AddTeacher />} />
          <Route path="/users/addStudent" element={<AddStudent />} />
          <Route path="/fypProject/add" element={<ProjectCard />} />
          <Route path="/eval/calculate" element={<EvaluationDetails />} />
          
          <Route path="/eval/add" element={<EvaluationForm />} />
          <Route path="/eval/view" element={<DynamicEvaluationForm />} />
          <Route path="/grid" element={<Grid />} />
          <Route
            path="/resource/requestApproval"
            element={<RequestApprovalPage />}
          />
                </Routes>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}





export default App;

























// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Navbar />
//         <ToastContainer />
//         <MainLayout />

//         <Routes>
          
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/userProfile" element={<ProfilePage />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/fypPanel/add" element={<PanelCreation />} />
//           <Route path="/fypPanel/display" element={<PanelList />} />
//           <Route path="/fypPanel/assign" element={<AssignPanel />} />
//           <Route path="/scheduling/add" element={<Calendar />} />
//           <Route path="/announcement/add" element={<AdminAnnouncement />} />
//           <Route path="/users/addTeacher" element={<AddTeacher />} />
//           <Route path="/users/addStudent" element={<AddStudent />} />
//           <Route path="/fypProject/add" element={<ProjectCard />} />
//           <Route path="/signin" element={<LoginPage />} />
//           <Route path="/eval/add" element={<EvaluationForm />} />
//           <Route path="/eval/view" element={<DynamicEvaluationForm />} />
//           <Route path="/grid" element={<Grid />} />
//           <Route
//             path="/resource/requestApproval"
//             element={<RequestApprovalPage />}
//           />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }



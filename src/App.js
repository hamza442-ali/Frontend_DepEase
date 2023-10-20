
import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,     //npm install react-router-dom
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {Navbar} from './components/Navbar/Navbar'
import {MainLayout} from './pages/mainLayout/MainLayout ';
import {Home} from './pages/home/Home';
import { PresentationScheduling } from './components/scheduling/PresentationScheduling';
import { PanelCreation } from './components/panelProcess/createPanel';
import { PanelList } from './components/panelProcess/displayPanels';
import { AssignPanel } from './components/panelProcess/assignPanel';
import {Calendar} from './components/scheduling/Schedulings'
import { AdminAnnouncement } from './components/panelProcess/makeAnnouncements';

// import {RepositoryManagement} from '././components/repository/RepositoryManagement';
// import { Check  } from './components/repository/check';


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <ToastContainer />
    <MainLayout />
    <Routes>
    <Route path="/" element={<Home />} />
    {/* <Route path="/scheduling/add" element={<PresentationScheduling />} /> */}
    <Route path="/fypPanel/add" element={<PanelCreation />} />
    <Route path="/fypPanel/display" element = {<PanelList/>}/>
    <Route path = "/fypPanel/assign" element = {<AssignPanel/>}/>
    <Route path = "/scheduling/add"  element = {<Calendar/>}/>
    <Route path = "/fypPanel/announcement"  element = {<AdminAnnouncement/>}/>
    

    {/* <Route path="/del" element={<ManageDelieverables/>} />
    <Route path="/res" element={<StudentResourceRequest/>} />
    <Route path="/doc" element={<DocumentPreview/>} />
    <Route path="/members/add" element={<MemberPage/>} />
    <Route path="/requirement/display" element={<ManageRequirements  />}/>
    <Route path="/requirement/add" element={<RequirementForm />}/>
    <Route path="/proposal" element={<ProposalForm/>} />
    <Route path="/members/manage" element={<Teammates/>}/> */}
       {/* Define your routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

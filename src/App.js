
import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,     //npm install react-router-dom
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import {Navbar} from './components/Navbar/Navbar'
// import {MainLayout} from './pages/mainLayout/MainLayout ';
import {Home} from './pages/home/Home';
import { PanelCreation } from './components/panelProcess/createPanel';
import { PanelList } from './components/panelProcess/displayPanels';
import { AssignPanel } from './components/panelProcess/assignPanel';
import {Calendar} from './components/scheduling/Schedulings'
import { AdminAnnouncement } from './components/panelProcess/makeAnnouncements';
import { HeroLand } from './components/landingPage/LandingPage';
import { LandingPage } from './pages/landingPage/LandingPage';
// import {Header} from './components/header/Header'
import { SignupPage } from './components/signUp/SignUp';
import { SigninPage } from './components/signIn/SignIn';
import {ScrollUp} from './components/scrollUp'
import { AboutSectionOne } from './components/about/About';
import { Header } from './components/header/Header';
import { Panels } from './components/panelProcess/dPanel';
import {Footer} from './components/footer/footer'
import { Features } from './components/features/features';


function App() {
  return (
    <BrowserRouter>

    <ScrollUp/>
    <Header />
    <LandingPage />
    <Features/>
    <AboutSectionOne/>
    {/* <Panels/> */}
    {/* <SignupPage /> */}
    {/* <SigninPage /> */}
    <Footer/>
    {/* <Navbar/> */}
    {/* <ToastContainer /> */}
    {/* <MainLayout /> */}
    <Routes>
    {/* <Route path="/" element={<LandingPage />} /> */}
    <Route path = "/home" element={<Home />} />
    <Route path = "/fypPanel/add" element={<PanelCreation />} />
    <Route path = "/fypPanel/display" element = {<PanelList/>}/>
    <Route path = "/fypPanel/assign" element = {<AssignPanel/>}/>
    <Route path = "/scheduling/add"  element = {<Calendar/>}/>
    <Route path = "/fypPanel/announcement"  element = {<AdminAnnouncement/>}/>
    


      </Routes>
    </BrowserRouter>
  );
}

export default App;

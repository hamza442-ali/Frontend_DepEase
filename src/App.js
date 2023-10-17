
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// import {RepositoryManagement} from '././components/repository/RepositoryManagement';
import { Check  } from './components/repository/check';


function App() {
return (

    <>

        <h1> APP.js</h1>
        <Router>
          <Routes>
            {/* <Route path="/" element={<RepositoryManagement />} /> */}
            {/* <h1> Present in APP.js</h1> */}
         
            <Route path = "/" element={<Check/>}/>
          </Routes>
        </Router>
    
    </>
   
  );
}

export default App;

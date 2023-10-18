import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from './redux/store'
import { Provider } from 'react-redux'  
//npm install @reduxjs/toolkit react-redux


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
  {/*  abhi hamare components ke passs access ha hamare store ka */}
  <Provider store={store}>  
  <DndProvider backend={HTML5Backend}>
    <App />
    </DndProvider>
    </Provider>
  </React.StrictMode>
  
);

reportWebVitals();




// In Redux, a "provider" refers to a component or construct that is used to provide the Redux store to the entire React application.
//  The provider is a fundamental part of integrating Redux with React, and it ensures that the Redux store is accessible to
//   all components in your application without
//  needing to pass it explicitly through props at each level.
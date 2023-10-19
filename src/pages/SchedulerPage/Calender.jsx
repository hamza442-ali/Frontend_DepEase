// src/App.js
import React from 'react';
import Calendar from '../../components/Scheduler/Calender';


const CalendarPage=()=> {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="mb-4 text-3xl font-bold">Project Calendar</h1>
        <Calendar/>
      </header>
    </div>
  );
}

export default CalendarPage;

import React, { useState,useEffect } from 'react';
import BoardList from '../../components/board/BoardList';
import TaskForm from '../../components/board/TaskForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
library.add(fas);

const statuses = ['todo', 'inprogress', 'review', 'done'];


const API_BASE_URL = 'http://localhost:3001/tasks'; 
const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);

  const toggleTaskForm = () => {
    setIsTaskFormVisible(!isTaskFormVisible);
  };

  const addTask = (title, status, assigneeName, reporter, priority) => {
    
    const newTask = {
      summary: title,
      status,
      assignee: assigneeName,
      reporter,
      priority,
      projectid:"F20-126-D" //hardcoded for now as login is not implemented
    };

    // Make a POST request to add task
    axios.post(`${API_BASE_URL}/add`, newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
         // Update the state with the newly created task
         toast.success('Successfully added task ');
      })
      .catch(error => {
        console.error('Error adding task:', error);
        toast.error('Error adding task:', error);
      });
  };

  const moveTask = (id, newStatus) => {
    // Make a PUT request to update task status
    axios.put(`${API_BASE_URL}/update/${id}`, { status: newStatus })
      .then(response => {
        fetchData();
      })
      .catch(error => {
        console.error('Error moving task:', error);
      });
  };

  const deleteTask = id => {
    console.log("check"+id);
    // Make a DELETE request to remove task
    axios.delete(`${API_BASE_URL}/delete/${id}`)
      .then(response => {
        const updatedTasks = tasks.filter(task => task._id !== id);
        setTasks(updatedTasks);
        toast.success('Successfully deleted task ');
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        toast.error('Error deleting tasks:', error);
      });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getmine/${"F20-126-D"}`);//hardcoded for now as login is not implemented
      setTasks(response.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching tasks:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); 
  return (
    <div className=''>
    <h2 className="p-2 mb-4 ml-28 font-serif text-xl  text-gray-800 font-semiboldp-2">Project Board</h2>
   
    <div className="flex flex-row h-screen p-4">
    
      <div className="flex flex-row flex-wrap justify-between w-full ml-20">
        {statuses.map((status, index) => (
          <BoardList
            key={index}
            title={status.charAt(0).toUpperCase() + status.slice(1)}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
      <button
        onClick={toggleTaskForm}
        className="fixed p-3 text-white transition duration-300 ease-in-out bg-blue-500 rounded-full shadow-lg bottom-16 right-16 hover:bg-blue-700"
      >
        <FontAwesomeIcon icon={['fas', 'plus-circle']} className="mr-2 text-xl" />
        {isTaskFormVisible ? 'Hide Task Form' : 'Add Task'}
      </button>
      {isTaskFormVisible && <TaskForm addTask={addTask} />}
    </div>
    </div>
  );
};

export default Board;
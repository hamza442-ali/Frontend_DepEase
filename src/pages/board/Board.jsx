import React, { useState } from 'react';
import BoardList from '../../components/board/BoardList';
import TaskForm from '../../components/board/TaskForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);



const statuses = ['todo', 'inprogress', 'review', 'done'];
const initialTasks = [
  {
    id: 1,
    issueKey: 'PROJECT-1',
    summary: 'Design homepage wireframes',
    status: 'todo',
    assignee: 'Alice Johnson',
    reporter: 'Bob Brown',
    priority: 'high'
  },
  {
    id: 2,
    issueKey: 'PROJECT-2',
    summary: 'Implement user authentication',
    status: 'inprogress',
    assignee: 'Charlie Davis',
    reporter: 'Diana White',
    priority: 'medium'
  },
  {
    id: 3,
    issueKey: 'PROJECT-3',
    summary: 'Write API documentation',
    status: 'review',
    assignee: 'Eva Wilson',
    reporter: 'Frank Miller',
    priority: 'low'
  },
  {
    id: 4,
    issueKey: 'PROJECT-4',
    summary: 'Fix bug in shopping cart',
    status: 'done',
    assignee: 'Grace Lee',
    reporter: 'Harry Green',
    priority: 'medium'
  },
  {
    id: 5,
    issueKey: 'PROJECT-5',
    summary: 'Optimize website performance',
    status: 'todo',
    assignee: 'Ivy Clark',
    reporter: 'Jack Johnson',
    priority: 'high'
  },
  {
    id: 6,
    issueKey: 'PROJECT-6',
    summary: 'Create user onboarding flow',
    status: 'inprogress',
    assignee: 'Kevin Martin',
    reporter: 'Laura Anderson',
    priority: 'high'
  },
  {
    id: 7,
    issueKey: 'PROJECT-7',
    summary: 'Test application on multiple devices',
    status: 'todo',
    assignee: 'Michael Brown',
    reporter: 'Nancy Wilson',
    priority: 'medium'
  }
];
const Board = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);

  const toggleTaskForm = () => {
    setIsTaskFormVisible(!isTaskFormVisible);
  };


  const addTask = (title, status, assigneeName, reporter, priority) => {
    // Hardcoded image URL based on assignee's name (for example)

    const issueKey = generateIssueKey();
    const newTask = {
      id: tasks.length + 1,
      issueKey,
      summary: title,
      status,
      assignee: assigneeName,
      reporter,
      priority,
    };
    setTasks([...tasks, newTask]);
  };


  const generateIssueKey = () => {
    return 'PROJECT-' + (tasks.length + 1);
  };

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className=''>
      <div className="w-full h-16 pt-7 mb-9 bg-zinc-100">
        <h1 className="mb-3 text-2xl text-blue-300 ml-28">Task Manage</h1>
        <p className=" ml-28 text-slate-700">Home / Tasks / Board</p>
      </div>
   
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
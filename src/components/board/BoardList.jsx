import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const BoardList = ({ title, status, tasks, moveTask, deleteTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: item => moveTask(item.id, status)
  });

  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div className="flex-1 p-4 mr-4 bg-gray-200 rounded shadow " ref={drop}>
    <div className='h-12 bg-slate-700'>
    <h2 className="p-2 mb-4 ml-4 font-serif text-xl text-white text-gray-800 font-semiboldp-2">{title}</h2>
    </div>
     
      {filteredTasks.map(task => (
        <TaskCard
          key={task.id}
          id={task.id}
          issueKey={task.issueKey}
          summary={task.summary}
          assignee={task.assignee}
          reporter={task.reporter}
          priority={task.priority}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default BoardList;

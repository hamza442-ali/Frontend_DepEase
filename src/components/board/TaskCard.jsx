import React from 'react';
import { useDrag } from 'react-dnd';
import person from '../../assets/images/person2.jpeg';

const TaskCard = ({ id, issueKey, summary, assignee, reporter, priority, deleteTask }) => {
  const [, drag] = useDrag({
    type: 'TASK',
    item: { id },
  });

  return (
    <div className="max-w-sm p-6 mx-auto mb-4 transition duration-300 bg-white rounded-lg shadow hover:shadow-xl " ref={drag}>
      <div className="flex items-center mb-4">
        <img src={person} alt={assignee} className="w-10 h-10 mr-4 rounded-full" />
        <p className="text-lg font-semibold text-gray-800">{assignee}</p>
      </div>
      <div className="mb-4">
        <p className="mb-2 text-base font-semibold text-gray-800">{issueKey}</p>
        <p className="text-sm text-gray-600">{reporter}</p>
      </div>
      <p className="mb-4 text-base text-gray-700">{summary}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">{priority}</span>
        <button
          className="text-red-500 hover:text-red-700 hover:underline focus:outline-none"
          onClick={() => deleteTask(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

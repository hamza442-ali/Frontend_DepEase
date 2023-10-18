import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash, faLocationArrow,faPaperclip  } from '@fortawesome/free-solid-svg-icons';

const RequirementTable = ({ data, onEdit, onAttachment, onDelete, onSubmit }) => {

  const formatDate = (dateTimeString) => {
    const dateOnly = dateTimeString.split("T")[0];
    return dateOnly;
  };

  
  return (
    <table className="w-full divide-y divide-gray-200 ">
      <thead className="border border-dotted bg-slate-500 border-opacity-30">
        <tr>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
            Deadline
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
            Written By
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
            Assigned to
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
            Title
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
            Priority
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
            Status
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-300">
        {data.map((row, index) => (

          
          <tr
            key={index}
            className={`${index % 2 === 0 ? 'bg-slate-100' : 'bg-white'} hover:bg-gray-200 transition-colors duration-300`}
          >
         
            <td className="px-6 py-2 whitespace-wrap">{formatDate(row.deadline)}</td>
            <td className="px-6 py-2 whitespace-wrap">{row.writtenby}</td>
            <td className="px-6 py-2 whitespace-wrap">{row.assignedTo}</td>
            <td className="px-6 py-2 whitespace-wrap">{row.title}</td>
            <td className="px-6 py-2 whitespace-wrap">{row.priority}</td>
            <td className="px-6 py-2 whitespace-wrap">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                  row.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : row.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800'
                    : row.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : ''
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    row.status === 'Pending'
                      ? 'bg-yellow-500'
                      : row.status === 'In Progress'
                      ? 'bg-blue-500'
                      : row.status === 'Completed'
                      ? 'bg-green-500'
                      : ''
                  }`}
                />
                <span className="ml-1">{row.status}</span>
              </span>
            </td>
            <td className="px-6 py-4 whitespace-wrap">
              <button
                className="mr-2 text-indigo-600 hover:text-indigo-900"
                onClick={() => onEdit(index)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <label
                className="mr-2 text-indigo-600 cursor-pointer hover:text-indigo-900"
              >
               <FontAwesomeIcon icon={faPaperclip} />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => onAttachment(e.target.files[0], index)}
                />
              </label>
              <button
                className="mr-2 text-red-600 hover:text-red-900"
                onClick={() => onDelete(index)}
              >
               <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                className="text-green-600 hover:text-green-900"
                onClick={() => onSubmit(index)}
              >
                <FontAwesomeIcon icon={faLocationArrow} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default RequirementTable ;

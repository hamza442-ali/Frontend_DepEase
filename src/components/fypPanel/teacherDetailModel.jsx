import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root"); // Set the root element to handle accessibility

export const TeacherDetailsModal = ({ isOpen, onClose, panel }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Panel Details"
      className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg modal-content top-1/2 left-1/2 w-96"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="p-6">
        <h2 className="mb-4 text-2xl font-bold text-center text-blue-500">
          Panel Details
        </h2>
        <div className="mb-4 text-gray-700">
          <span className="font-semibold text-blue-500">Panel ID:</span>{" "}
          {panel.id}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-500">Teachers:</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-blue-500">Name</th>
                <th className="text-left text-blue-500">ID</th>
              </tr>
            </thead>
            <tbody>
              {panel.teachers.map((teacher, index) => (
                <tr key={index} className="text-gray-700">
                  <td>{teacher.name}</td>
                  <td>{teacher.employeeId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </ReactModal>
  );
};

import React from "react";
import { Modal, Button } from "@mui/material";

export const TeacherDetailsModal = ({ isOpen, onClose, panel }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="bg-white p-4 rounded-md w-96 mx-auto my-20">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Panel Details</h2>
        <p className="mb-2 text-gray-700">
          <span className="font-semibold text-blue-500">Panel ID:</span> {panel.id}
        </p>
        <h3 className="text-lg font-semibold mb-1 text-center text-blue-500">Teachers:</h3>
        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left text-blue-500">Name</th>
              <th className="text-left text-blue-500" >ID</th>
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
        <Button
          onClick={onClose}
          className=" w-full"
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

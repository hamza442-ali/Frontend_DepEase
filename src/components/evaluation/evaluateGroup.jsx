import React, { useState } from "react";

export const EvaluationDetails = () => {
  // Demo data for useState
  const [evaluations, setEvaluations] = useState([
    {
      _id: "6578cc21d20e6d6c8eeee43c",
      ProjectId: "Fa-881-D",
      evalFormId: "6578958063ba26493a5495f4",
      TeacherId: "6508",
      totalWeightage: 10,
      fields: [
        { name: "Presentation", weightage: 10, Subobtain: 7 },
        { name: "Slides", weightage: 20, Subobtain: 16 },
        { name: "Scope", weightage: 10, Subobtain: 7 },
        { name: "Feasibility", weightage: 50, Subobtain: 40 },
      ],
      evaluationType: "Mid Evaluation",
      comments:
        "Report has missing test cases and Sequence Diagram. Code has missing prediction model",
      Date: Date.now(),
    },
    {
        _id: "6578cc21d20e6d6c8eeee43c",
        ProjectId: "Fa-881-D",
        evalFormId: "6578958063ba26493a5495f4",
        TeacherId: "6508",
        totalWeightage: 10,
        fields: [
          { name: "Presentation", weightage: 10, Subobtain: 7 },
          { name: "Slides", weightage: 20, Subobtain: 16 },
          { name: "Scope", weightage: 10, Subobtain: 7 },
          { name: "Feasibility", weightage: 50, Subobtain: 40 },
        ],
        evaluationType: "Mid Evaluation",
        comments:
          "Report has missing test cases and Sequence Diagram. Code has missing prediction model",
        Date: Date.now(),
      },
    
  ]);

  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [supervisorWeight, setSupervisorWeight] = useState(0);
  const [panelWeight, setPanelWeight] = useState(0);




   const handleEvaluate = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setShowModal(true);
  };

  const handleConfirmEvaluation = () => {
    // Logic to handle the confirmation and weights
    console.log("Supervisor Weight:", supervisorWeight);
    console.log("Panel Weight:", panelWeight);
    // Close the modal
    setShowModal(false);
    // You may want to update the state or perform other actions based on the weights
  };

  const handleCancelEvaluation = () => {
    // Reset weights and close the modal
    setSupervisorWeight(0);
    setPanelWeight(0);
    setShowModal(false);
  };



  return (
    <div className="container ml-16 mt-14 bg-gray-100 rounded shadow-lg  ">
        
      {evaluations.map((evaluation) => (
        
        <div
          key={evaluation._id}
          className="bg-white shadow-lg rounded-lg p-6 mb-6"
        >
            <div className="float-right mb-8">
            <button
              onClick={() => handleEvaluate(evaluation)}
              className="bg-primary text-white rounded-full py-2 px-8 hover:bg-opacity-80 transition duration-300 ease-in-out"
            >
              Evaluate
            </button>
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            {evaluation.evaluationType}
          </h2>
          <p className="text-gray-600 mb-2">
            Project ID: {evaluation.ProjectId}
          </p>
          <p className="text-gray-600 mb-2">
            Teacher ID: {evaluation.TeacherId}
          </p>
          <p className="text-gray-600 mb-2">
            Date: {new Date(evaluation.Date).toLocaleDateString()}
          </p>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Evaluation Criteria</h3>
            <ul>
              {evaluation.fields.map((field) => (
                <li
                  key={field.name}
                  className="flex justify-between items-center "
                >
                  <span>{field.name}</span>
                  <span>{`${field.Subobtain}/${field.weightage}`}</span>
                </li>
              ))}
            </ul>
          </div>


          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Comments</h3>
            <p>{evaluation.comments}</p>
            
          </div>

          

        </div>
      ))}


{showModal && selectedEvaluation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedEvaluation.evaluationType} Evaluation
            </h2>
            <label className="block mb-2">
              Supervisor Weight:
              <input
                type="number"
                value={supervisorWeight}
                onChange={(e) => setSupervisorWeight(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Panel Weight:
              <input
                type="number"
                value={panelWeight}
                onChange={(e) => setPanelWeight(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </label>
            <button
                onClick={handleCancelEvaluation}
                className="bg-gray-500 text-white mr-4 rounded-full py-2 px-8 hover:bg-opacity-80 transition duration-300 ease-in-out"
              >
                Cancel
              </button>
            <button
              onClick={handleConfirmEvaluation}
              className="bg-primary text-white rounded-full py-2 px-8 hover:bg-opacity-80 transition duration-300 ease-in-out"
            >
              Confirm Evaluation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

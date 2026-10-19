import React, { useState } from "react";
import axios from "axios";
import evalPic from "../../assets/images/evaluationBackground.png";

export const EvaluationForm = () => {
  const [fields, setFields] = useState([{ name: "", weightage: "" }]);
  const [formErrors, setFormErrors] = useState({});
  const [evaluationType, setEvaluationType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [totalWeightage, setTotalWeightage] = useState();


  const handleTotalWeightageChange = (event) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setTotalWeightage(newValue);
  };

  const handleInputChange = (index, fieldName, value) => {
    const newFields = [...fields];
    newFields[index][fieldName] = value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([...fields, { name: "", weightage: "" }]);
  };

  const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    fields.forEach((field, index) => {
      if (!field.name || !field.weightage) {
        errors[index] = "Both field name and weightage are required";
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        // Prepare data to send to the backend
        const formData = {
          totalWeightage,
          fields,
          evaluationType,
        };
  
        console.log(formData, "Form Data")
        // Assume 'apiEndpoint' is the backend API endpoint for storing evaluation form data
        const response = await axios.post("http://localhost:3001/evaluation/create", formData);
  
        if (response.status === 200) {
          setShowForm(false);
          console.log("Form submitted successfully!");
          alert(" Successfully Stored data")
          // Additional logic on successful form submission
        } else {
          console.error("Form submission failed. Please try again.");
          // Additional error handling logic
        }
      } catch (error) {
        console.error("Error during form submission:", error);
        // Additional error handling logic
      }
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto mt-14 p-8 bg-white rounded shadow-lg  ">
      <h1 className="text-2xl tracking-wid ">Create Evaluation</h1>
      <img
        src={evalPic}
        alt="EvaluationBg"
        className="rounded-lg shadow-lg mb-4 mt-8"
        style={{ width: "850px", height: "200px" }}
      />
     
      <div className="p-2">
        <div className="flex justify-between items-center mb-4">
        <h1 className=" tracking-wid ml-2  "> </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 "
          >
            + Add new
          </button>
        </div>

        <div className="flex items-center space-x-60">
          <div className="flex">
            <select
              value={evaluationType}
              onChange={(e) => setEvaluationType(e.target.value)}
              className="border rounded p-2 bg-blue-500 text-white "
            >
              <option value="">Evaluation Type</option>
              <option value="Proposal Evaluation">Proposal Evaluation</option>
              <option value="Mid Evaluation">Mid Evaluation</option>
              <option value="Final Evaluation">Final Evaluation</option>
              <option value="Other">Other</option>
            </select>

            {evaluationType === "Other" && (
              <input
                type="text"
                placeholder="Enter Title"
                className="border rounded p-2 ml-2"
              />
            )}
          </div>
          {/* <h1 className=" tracking-wid ml-2  "> Total Weightage:  </h1> */}
        <input
        type="number"
        id="totalWeightage"
        placeholder="Total Weightage"
        value={totalWeightage}
        onChange={handleTotalWeightageChange}
        className="border rounded p-2 ml-2"
      />
        </div>

        {!showForm && (
          <p className="text-2xl text-center text-gray-500 mb-4 mt-16 border p-4">
            Click "Add new" to create an evaluation form.
          </p>
        )}

        {showForm && (
          <form onSubmit={handleSubmit}>
            {fields.map((field, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Criteria:
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={field.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
                <div className="text-red-500 text-xs mt-1">
                  {formErrors[index]}
                </div>

                <label className="block text-sm font-medium text-gray-700 mt-3">
                  Marks:
                </label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={field.weightage}
                  onChange={(e) =>
                    handleInputChange(index, "weightage", e.target.value)
                  }
                />
              </div>
            ))}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleAddField}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Add Field
              </button>

              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
              >
                Submit Form
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

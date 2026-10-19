import React, { useState, useEffect } from "react";
import axios from "axios";

export const EvaluationForm = () => {
  const [comments, setComments] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [evaluationForms, setEvaluationForms] = useState([]);
  const [obtainedMarks, setObtainedMarks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/evaluation/getAll");
        console.log(response.data)
        setEvaluationForms(response.data);
        // setObtainedMarks(Array(response.data.fields.length).fill(""));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleObtainedMarksChange = (index, value) => {
    const newObtainedMarks = [...obtainedMarks];
    newObtainedMarks[index] = value;
    setObtainedMarks(newObtainedMarks);
    setFormErrors({ ...formErrors, [index]: "" });
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!evaluationForms || !evaluationForms.fields) {
      return false; // Handle the case where evaluationForms or its fields are undefined
    }

    evaluationForms.fields.forEach((field, index) => {
      if (obtainedMarks[index] < 0 || obtainedMarks[index] > field.weightage) {
        errors[index] = "Obtained marks should be between 0 and the weightage";
        isValid = false;
      }

      if (field.weightage > 0 && obtainedMarks[index] === "") {
        errors[index] = "Obtained marks are required";
        isValid = false;
      }
    });

    if (!comments.trim()) {
      errors.comments = "Comments are required";
      isValid = false;
    }

    setFormErrors(errors);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Obtained Marks:", obtainedMarks);
      console.log("Comments:", comments);
    }
  };

  return (
    <>
      {evaluationForms && evaluationForms.evaluationType && (
        <div className="flex p-4 bg-neutral-50 mb-8 rounded-3xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">{evaluationForms.evaluationType}</h2>
          <p className="text-lg mt-2 ml-auto">
            Total Weightage:{" "}
            <span className="text-red-500 text-3xl ml-4">{evaluationForms.totalWeightage}</span>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {evaluationForms &&
          evaluationForms.fields &&
          evaluationForms.fields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {field.name} (Marks: {field.weightage}) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={obtainedMarks[index]}
                onChange={(e) => handleObtainedMarksChange(index, e.target.value)}
              />
              <div className="text-red-500 text-xs mt-1">{formErrors[index]}</div>
            </div>
          ))}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Comments:</label>
          <textarea
            rows="4"
            placeholder="(Mandatory)"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={comments}
            onChange={handleCommentsChange}
          ></textarea>
          <div className="text-red-500 text-xs mt-1">{formErrors.comments}</div>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Submit Marks
        </button>
      </form>
    </>
  );
};

// export default EvaluationForm;

export const DynamicEvaluationForm = ({ evaluationForms }) => {
    const [activeFormIndex, setActiveFormIndex] = useState(0);
  
    const handleFormClick = (index) => {
      setActiveFormIndex(index);
    };
  
    const ActiveForm = evaluationForms[activeFormIndex];
  
    return (
      <>
        <div className="flex p-4 ml-32 mr-32 bg-neutral-50 mt-16 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4"> FYP Evaluation Forms </h2>
        </div>
  
        <div className="flex vh-screen ml-32 mr-32 bg-neutral-100 mt-4 mb-14 rounded-3xl shadow-lg">

            {/* evaluation sidebar div */}
          <div className="w-1/6 p-6 h-screen bg-white shadow-lg rounded-3xl m-4">
            <h2 className="text-xl font-bold mb-4">Select Form:</h2>
            <ul>
              {evaluationForms.map((form, index) => (
                <li
                  key={index}
                  className={`cursor-pointer  text-blue-500 hover:underline ${
                    activeFormIndex === index ? "font-bold" : ""
                  }`}
                  onClick={() => handleFormClick(index)}
                >
                  {form.evaluationTitle}
                </li>
              ))}
            </ul>
          </div>
  
          <div className="w-3/4 p-6 bg-white shadow-md m-4 rounded-3xl">
            {ActiveForm && (
              <EvaluationForm
                evaluationTitle={ActiveForm.evaluationTitle}
                totalWeightage={ActiveForm.totalWeightage}
                fields={ActiveForm.fields}
              />
            )}
          </div>
        </div>
      </>
    );
  };
  
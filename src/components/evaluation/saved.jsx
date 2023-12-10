import React, { useState } from "react";

const EvaluationForm = ({ evaluationTitle, totalWeightage, fields }) => {
  const [obtainedMarks, setObtainedMarks] = useState(Array(fields.length).fill(''));
  const [comments, setComments] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleObtainedMarksChange = (index, value) => {
    const newObtainedMarks = [...obtainedMarks];
    newObtainedMarks[index] = value;
    setObtainedMarks(newObtainedMarks);
    // Clear error for this field when the user starts typing again
    setFormErrors({ ...formErrors, [index]: '' });
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    fields.forEach((field, index) => {
      // Check if the obtained marks are not negative and not exceeding the weightage
      if (obtainedMarks[index] < 0 || obtainedMarks[index] > field.weightage) {
        errors[index] = 'Obtained marks should be between 0 and the weightage';
        isValid = false;
      }

      // Check if the obtained marks are provided for required fields
      if (field.weightage > 0 && obtainedMarks[index] === '') {
        errors[index] = 'Obtained marks are required';
        isValid = false;
      }
    });

    // Check if the comment is provided
    if (!comments.trim()) {
      errors.comments = 'Comments are required';
      isValid = false;
    }

    // Set errors for the form
    setFormErrors(errors);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle the obtained marks and comments as needed, e.g., send to the server
      console.log('Obtained Marks:', obtainedMarks);
      console.log('Comments:', comments);
    }
  };

  return (
    <>
      <h1 className="text-2xl tracking-wid">{evaluationTitle}</h1>
      <p className="text-lg mt-2">Total Weightage: {totalWeightage}</p>

      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
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
            <div className="text-red-500 text-xs mt-1">
              {formErrors[index]}
            </div>
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Comments:
          </label>
          <textarea
            rows="4"
            placeholder="(Mandatory)"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={comments}
            onChange={handleCommentsChange}
          ></textarea>
          <div className="text-red-500 text-xs mt-1">
            {formErrors.comments}
          </div>
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
          <div className="w-1/4 p-6 h-screen bg-white shadow-lg rounded-3xl m-4">
            <h2 className="text-xl font-bold mb-4">Select Form:</h2>
            <ul>
              {evaluationForms.map((form, index) => (
                <li
                  key={index}
                  className={`cursor-pointer text-blue-500 hover:underline ${
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
  
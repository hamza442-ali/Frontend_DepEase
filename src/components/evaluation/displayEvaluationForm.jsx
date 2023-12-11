import React, { useState, useEffect } from "react";
import axios from "axios";
import { DisplayEvaluationForm } from "./dynamicEvaluationForm";

export const DynamicEvaluationForm = () => {
    const [activeFormIndex, setActiveFormIndex] = useState(0);
    const [evaluationForms, setEvaluationForms] = useState([]);
  
    const handleFormClick = (index) => {
      setActiveFormIndex(index);
    };
  
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
                  {form.evaluationType}
                </li>
              ))}
            </ul>
          </div>
  
          <div className="w-3/4 p-6 bg-white shadow-md m-4 rounded-3xl">
            {ActiveForm && (
              <DisplayEvaluationForm 
                evaluationTitle={ActiveForm.evaluationType}
                totalWeightage={ActiveForm.totalWeightage}
                fields={ActiveForm.fields}
              />
            )}
          </div>
        </div>
      </>
    );
  };
  
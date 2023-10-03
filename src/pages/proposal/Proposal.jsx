// StepForm.jsx
import React, { useState } from 'react';
import Step1 from '../../components/proposal/Step1';
import Step2 from '../../components/proposal/Step2';
import Step3 from '../../components/proposal/Step3';
import Step4 from '../../components/proposal/Step4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from "../../components/proposal/ProgressBar"
library.add(fas); // Add Font Awesome icons to the library

const StepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
    setError('');
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setError('');
  };

  const handleSubmit = (data) => {
    // You can submit the final data here
    console.log('Final Data:', data);
  };

  const steps = [
    { label: 'Step 1: Title and Timeline', component: <Step1 onNext={handleNext} /> },
    { label: 'Step 2: Problem Solution and Scope', component: <Step2 onNext={handleNext} onPrevious={handlePrevious} /> },
    { label: 'Step 3: Timeline and Technology Used', component: <Step3 onNext={handleNext} onPrevious={handlePrevious} /> },
    { label: 'Step 4: Modules', component: <Step4 data={formData} onPrevious={handlePrevious} onSubmit={handleSubmit} /> },
  ];

  return (
    <div className="container mx-auto my-8">
    <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
        <h2 className="mb-4 text-3xl font-semibold">{steps[currentStep - 1].label}</h2>
        {steps[currentStep - 1].component}
        {error && <div className="mt-2 text-red-500">{error}</div>}
       
      </div>
    </div>
  );
};

export default StepForm;
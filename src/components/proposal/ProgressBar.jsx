import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add FontAwesome icons to the library
library.add(fas);

// Define an array of icons for each step
const stepIcons = [
  'check-circle',
  'calendar-alt',
  'user',
  'tasks',
  'chart-bar',
];

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`text-center ${
              index === currentStep - 1 ? 'font-semibold text-blue-600' : 'text-gray-500'
            }`}
          >
            <span className="inline-block px-3 py-2 text-xs font-semibold text-white uppercase bg-blue-600 rounded-full">
              <FontAwesomeIcon icon={stepIcons[index]} size="lg" />
            </span>
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="flex h-2 overflow-hidden bg-gray-300 rounded">
          <div
            style={{
              width: `${progressPercent}%`,
              transition: 'width 0.5s ease-in-out', // Add a smooth transition animation
            }}
            className="flex flex-col justify-center text-center text-white bg-blue-600 shadow-none whitespace-nowrap"
          ></div>
        </div>
        <div className="absolute top-0 left-0 mt-3 ml-4 text-gray-600">
          <span className="text-xs font-semibold">{currentStep}/{totalSteps}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

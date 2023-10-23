import React from 'react';

const RequirementList = () => {
  const requirements = [
    { text: 'Requirement 1', deadline: 'October 23, 2023' },
    { text: 'Requirement 2', deadline: 'October 26, 2023' },
    { text: 'Requirement 3', deadline: 'December 5, 2023' },
    // Add more requirements as needed
  ];

  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Next week's date
  const filteredRequirements = requirements.filter((requirement) => {
    const deadlineDate = new Date(requirement.deadline);
    return deadlineDate >= today && deadlineDate <= nextWeek;
  });

  return (
    <div className="container mx-auto p-8">
      {filteredRequirements.length > 0 ? (
        <ul className="space-y-4">
          {filteredRequirements.map((requirement, index) => (
            <li key={index} className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                {index + 1}
              </div>
              <div>
                <p className="font-semibold">{requirement.text}</p>
                <p className="text-gray-600">Deadline: {requirement.deadline}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No deadlines this week.</p>
      )}
    </div>
  );
};

export default RequirementList;

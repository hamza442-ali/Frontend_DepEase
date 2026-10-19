import React from 'react';

const RequirementList = (props) => {
 
  const getFormattedDate = (inputDate) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(inputDate);
  };

  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Next week's date
  const filteredRequirements = props.data.filter((requirement) => {
    const inputDate = new Date(requirement.deadline);
    
    const formattedDate= getFormattedDate(inputDate);

    const deadlineDate = new Date(formattedDate);
    return deadlineDate >= today && deadlineDate <= nextWeek;
  });

  return (
    <div className="container p-8 mx-auto">
      {filteredRequirements.length > 0 ? (
        <ul className="space-y-4">
          {filteredRequirements.map((requirement, index) => (
            <li key={index} className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 mr-4 text-white bg-blue-500 rounded-full">
                {index + 1}
              </div>
              <div>
                <p className="font-semibold">{requirement.title}</p>
                <p className="text-gray-600">Deadline: {getFormattedDate(new Date(requirement.deadline))}</p>
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

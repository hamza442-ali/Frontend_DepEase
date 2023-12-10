import React from 'react';
import MemberCard from './RequestApprovalCard';

const MemberList = ({ requests, onViewDetails, updateRequest,rejectRequest }) => {
  return (
    <div className="flex flex-wrap">
      {requests.map((request) => (
        <MemberCard key={request._id} request={request} onViewDetails={onViewDetails}  updateRequest={updateRequest} rejectRequest={rejectRequest}  />
      ))}
    </div>
  );
};

export default MemberList;
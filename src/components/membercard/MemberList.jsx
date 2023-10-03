import React from 'react';
import MemberCard from './MemberCard';

const MemberList = ({ members, onViewDetails }) => {
  return (
    <div className="flex flex-wrap">
      {members.map((member) => (
        <MemberCard key={member.userId} member={member} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default MemberList;
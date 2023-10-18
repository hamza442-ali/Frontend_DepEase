import React, { useState } from 'react';
import ReplyModal from './ReplyModel';
import { toast } from 'react-toastify';
const EmailCard = ({ sender, subject, content }) => {
  const [showReplyModal, setShowReplyModal] = useState(false);

  const handleReply = (replyContent) => {
    console.log(`Replying to ${sender}: ${replyContent}`);
    setShowReplyModal(false);
    toast.success('Email sent successfully!');
  };

  const handleCancelReply = () => {
    setShowReplyModal(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
          <span className="text-lg font-bold">{sender.charAt(0)}</span>
        </div>
        <div className="ml-4">
          <div className="text-gray-800 font-semibold truncate">{sender}</div>
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 truncate">{subject}</h3>
      <p className="text-gray-600">{content}</p>
      <div className="mt-6 flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={() => setShowReplyModal(true)}
        >
          Reply
        </button>
      </div>
      {showReplyModal && (
  <ReplyModal
    sender={sender}
    subject={subject} // Pass the subject prop here
    onCancel={handleCancelReply}
    onReply={handleReply}
  />
)}
    </div>
  );
};

export default EmailCard;

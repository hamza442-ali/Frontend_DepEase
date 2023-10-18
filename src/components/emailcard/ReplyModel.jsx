import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const ReplyModal = ({ sender, subject, onCancel, onReply }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleReply = async () => {
    try {
      await axios.post('http://localhost:3001/email/send', {
        sender: 'i200457@nu.edu.pk',
        recipientEmail: sender,
        subject: `RE: ${subject}`,
        message: replyContent,
      });
      onReply(replyContent);
      setReplyContent('');
      toast.success('Email sent Successfully');
    } catch (error) {
      console.log('Error sending email:', error);
      toast.error('Error sending email:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80">
        <h3 className="text-2xl font-semibold mb-4">Reply to {sender}</h3>
        <textarea
          className="border rounded p-2 mb-4 w-full"
          rows="4"
          placeholder="Write your reply..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
            onClick={handleReply}
          >
            Send
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;

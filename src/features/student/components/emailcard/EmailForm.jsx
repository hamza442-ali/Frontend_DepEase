import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const EmailForm = ({ onCloseCompose, recipientEmail: replyEmail, replySubject }) => {
  const [recipientEmail, setRecipientEmail] = useState(replyEmail || '');
  const [subject, setSubject] = useState(replySubject || '');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
const sender= "i200457@nu.edu.pk";
    try {
      await axios.post('http://localhost:3001/email/send', {
       sender,
        recipientEmail,
        subject,
        message,
      });
      setStatus('Email sent successfully');
      toast.success('Email sent Successfully');
    } catch (error) {
      console.log('Error sending email:', error);
      setStatus('Error sending email');
      toast.error('Error sending email:', error);
    }
  };

  const handleCloseClick = () => {
    onCloseCompose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">New Message</h2>
          <button onClick={handleCloseClick}>
            <FontAwesomeIcon icon={faTimes} className="text-gray-400 hover:text-gray-600 mb-7" />
          </button>
        </div>
        <div className="mb-4">
          <input
            className="w-full border-none outline-none text-lg mb-2"
            type="email"
            placeholder="To"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full border-none outline-none text-lg mb-2"
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <textarea
            className="w-full border-none outline-none resize-none text-lg"
            rows="8"
            placeholder="Compose email"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        {status && <div className="text-red-500 mb-4">{status}</div>}
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;

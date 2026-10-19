import React, { useEffect, useState } from 'react';
import EmailList from '../../components/emailcard/EmailList';
import axios from 'axios';
import { toast } from 'react-toastify';
import EmailForm from '../../components/emailcard/EmailForm';

const EmailPage = () => {
  const [emails, setEmails] = useState([]);
  const [showCompose, setShowCompose] = useState(false);

  useEffect(() => {
    // Fetch emails when the component mounts
    getEmails();
  }, []);

  const getEmails = async () => {
    try {
      const response = await axios.get('http://localhost:3001/email/getreceived/i200457@nu.edu.pk'); // for now it is hardcoded as login is not implemented
      setEmails(response.data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const handleComposeClick = () => {
    setShowCompose(true);
  };

  const handleCloseCompose = () => {
    setShowCompose(false);
  };

  return (
    <div className='h-full '>
      <div className="w-full h-16 pt-7 bg-zinc-100">
        <h1 className="mb-3 text-2xl text-blue-300 ml-36">Email manage</h1>
        <p className=" ml-36 text-slate-700">Home / Email/ email mange</p>
      </div>
      <div className="container pt-24 mx-auto">
        <div className="flex justify-end mb-4">
          {!showCompose && (
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={handleComposeClick}
            >
              Compose
            </button>
          )}
        </div>
        <EmailList emails={emails} />
      </div>
      {showCompose && <EmailForm onCloseCompose={handleCloseCompose} />}
    </div>
  );
};

export default EmailPage;

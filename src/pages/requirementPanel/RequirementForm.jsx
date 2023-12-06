import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SelectInput from '../../components/selectinput/SelectInput';
import TextAreaInput from '../../components/textareainput/TextAreaInput';
import TextInput from '../../components/textinput/TextInput';
import { useSelector } from 'react-redux';
const Form = () => {
  const projectData = useSelector(state => state.project);
  const groupData = useSelector((state) => state.group);
  const studentData = useSelector(state => state.student);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Pending');
  const [deadline, setDeadline] = useState('');
  const [assignedTo, setAssignedTo] = useState([]);
  const [comments, setComment] = useState([]);
  // const [attachments, setAttachment] = useState('');
  const [description, setRequirement] = useState('');
  const [projectid, setprojectid] = useState(projectData.ProjectId);
  

  const handleReset = () => {
    setprojectid('');
    setTitle('');
    setPriority('Low');
    setStatus('Pending');
    setDeadline('');
    setAssignedTo([]);
    setComment([]);
    // setAttachment('');
    setRequirement('');
  };
  

  useEffect(() => {
    // Add an interceptor for every outgoing request
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        // If the token exists, add it to the Authorization header
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Do something with the request error
        return Promise.reject(error);
      }
    );
    // Clean up the interceptor when the component is unmounted
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (title.trim() === '' || description.trim() === '' || deadline === '' || projectid === '') {
      // Show error message for empty fields
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      
     
      const formData = new FormData();
      formData.append('title', title);
      formData.append('priority', priority);
      formData.append('assignedTo', JSON.stringify(assignedTo));
      formData.append('status', status);
      formData.append('description', description);
      formData.append('deadline', deadline);
      // formData.append('attachments', attachments); 
      if(comments.length !== 0){ 
         const commentObj = { content: comments, createdBy: studentData.student_name };
         formData.append('comments', JSON.stringify([commentObj]));
     }
     
      formData.append('writtenby', studentData.student_name); 
      formData.append('projectid', projectid);
     
     
     

      await axios.post('http://localhost:3001/requirements/createRequirement', formData);

      // Show success message here
      toast.success('Successfully added Requirement');
    } catch (error) { 
      // Show error message here
      toast.error('Failed to create a Requirement');
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setAttachment(file);
  // };

  return (
    <div className='h-full ml-28 '>
     

      <div className="container py-8 mx-auto">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto ">

       

          <SelectInput
            label="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(Array.from(e.target.selectedOptions, (option) => option.value))}
            options={Object.values(groupData).filter(obj => obj.student_name).map(student => student.student_name)}
            multiple
          />

          <TextInput label="Title *" value={title} onChange={(e) => setTitle(e.target.value)} />
          <SelectInput
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            options={['Low', 'Medium', 'High']}
          />
          <div className="mb-4">
            <label htmlFor="deadline" className="block mb-2 font-semibold">
              Deadline *
            </label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <SelectInput
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={['Pending', 'In Progress', 'Completed']}
          />
          <TextAreaInput label="Comment" value={comments} onChange={(e) => setComment(e.target.value)} />
          <TextAreaInput
            label="Requirement Details *"
            value={description}
            height="32"
            onChange={(e) => setRequirement(e.target.value)}
          />

          {/* <FileInput label="Attachment" onChange={handleFileChange} /> */}

          <button
            type="reset"
            onClick={handleReset}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Reset
          </button>

          <button
            type="submit"
            className="px-4 py-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;

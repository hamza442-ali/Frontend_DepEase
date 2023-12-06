// DocumentList.js
import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFileAlt, faEye, faTrash, faFile,faFileWord } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
library.add(faFileAlt, faEye, faTrash, faFile);



const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fileInput, setFileInput] = useState(null);
  const projectData = useSelector(state => state.project);
  
  useEffect(() => {
    // Fetch all documents from the backend on component mount
    axios.get(`http://localhost:3001/documents/getmine/${projectData.ProjectId}`)
      .then(response => {
        // console.log(response.data.files);
        setDocuments(response.data.files)
      
      })
      .catch(error => console.error('Error fetching documents:', error));
  }, []);

  const handlePreview = async (id) => {
    const document = documents.find((doc) => doc._id === id);

    console.log(document.secure_url);
    if (document) {
      try {
       
        window.open(document.secure_url);
       
      } catch (error) {
        console.log(error);
        window.alert(`No content available for ${document.filename}`);
      }
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop();
    switch (extension) {
      case 'pdf':
        return faFileAlt;
      case 'doc':
      case 'docx':
        return faFileWord;
      case 'txt':
        return faFileAlt;
      // Add more cases for other file types as needed
      default:
        return faFile;
    }
  };

  const handleDelete = (id) => {
    // Delete a document on the backend and update the state
    axios.delete(`http://localhost:3001/documents/delete/${id}`)
      .then(() => {
        
        setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc._id !== id))
      
        toast.success("Document Added successfully");
      
      })
      .catch(error => console.error('Error deleting document:', error));
  };

  const handleAddDocument = async (e) => {
    const file = e.target.files[0];
  
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('ProjectId', projectData.ProjectId);
        formData.append('filename', file.name);
        console.log('Selected File:', file);
        // Ensure you are sending the request with the correct headers
        const response = await axios.post('http://localhost:3001/documents/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success("Document Added successfully");
        setDocuments((prevDocuments) => [...prevDocuments, response.data]);
      } catch (error) {
        console.error('Error adding document:', error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-8 -z-10">

<h1 className="mb-4 text-3xl font-bold text-center">Document List</h1>

{/* Search input */}
<input
  type="text"
  placeholder="Search by file name"
  className="w-full px-4 py-2 mb-4 border rounded"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
{Array.isArray(documents) && documents
          .filter((document) =>  document.filename && document.filename.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((document) => (
            <div
              key={document._id}
              className="p-4 transition-transform transform bg-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-105"
            >
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">
                <FontAwesomeIcon icon={getFileIcon(document.filename)} className="mr-2" />
                {document.filename}
              </div>
              <div className="flex space-x-2">
              <button onClick={() => handlePreview(document._id)}>
                <FontAwesomeIcon icon={faEye} className="mr-1" />
              </button>
              <button onClick={() => handleDelete(document._id)}>
                <FontAwesomeIcon icon={faTrash} className="mr-1" />
              </button>
              
              </div>
            </div>
            <div className="flex items-center mb-4 text-gray-600">
  <FontAwesomeIcon icon={getFileIcon(document.filename)} className="mr-2" />
  <span className={document.secure_url ? 'text-green-500' : 'text-red-500'}>
    {document.secure_url ? 'File content available' : 'No content available'}
  </span>
</div>

          </div>
        ))}
      </div>

      <div className="mt-8">
        <label className="px-4 py-2 font-bold text-white transition-transform transform bg-green-500 rounded-full cursor-pointer hover:scale-105">
          Add Document
          <input
            type="file"
            className="hidden"
            accept=".pdf, .doc, .docx, .txt"
            onChange={handleAddDocument}
            ref={(input) => setFileInput(input)}
          />
        </label>
      </div>
    </div>
  );
};

export default DocumentList;
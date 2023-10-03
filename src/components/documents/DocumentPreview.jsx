import React, { useState } from 'react';

const DocumentPreview = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 bg-white rounded-lg shadow-md w-96">
        <h2 className="mb-4 text-2xl">Document Preview</h2>

        <input
          type="file"
          accept=".pdf, .doc, .docx"
          onChange={handleFileChange}
          className="mb-4"
        />

        {selectedFile && (
          <button
            onClick={() => window.open(URL.createObjectURL(selectedFile))}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Open Full Screen Preview
          </button>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;

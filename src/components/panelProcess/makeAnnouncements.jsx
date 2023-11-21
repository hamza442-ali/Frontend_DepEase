import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import announcImg from '../../assets/images/bgAnnounce.png'

export const AdminAnnouncement = () => {
  const [richText, setRichText] = useState('');

  const handleRichTextChange = (value) => {
    setRichText(value);
  };

  const handleFileUpload = (e) => {
    // Handle file upload logic here
    const selectedFile = e.target.files[0];
    // You can use FormData to send the file to your server using axios
    const formData = new FormData();
    formData.append('file', selectedFile);
    // Make an axios request to upload the file
    axios
      .post('http://localhost:3001/upload', formData)
      .then((response) => {
        // Handle success
        console.log('File uploaded successfully:', response.data);
      })
      .catch((error) => {
        // Handle error
        console.log('Error uploading file:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!richText) {
      return;
    }

    // Create a FormData object to send data to the server
    const formData = new FormData();

    // Append the rich text content to the FormData
    formData.append('richText', richText);

    // Get the selected file from the file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      // Append the uploaded file to the FormData
      formData.append('file', selectedFile);
    }

    // Make an axios POST request to send the data to the backend
    axios
      .post('http://localhost:3001/announcement/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Announcement added successfully:', response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });

    // Clear the rich text and file input
    setRichText('');
    fileInput.value = '';
  };

  return (
    <Paper className="p-4 mx-4 mx-40 rounded-lg shadow-lg">
<img src={announcImg} alt="Announcement"  className=" rounded-lg shadow-lg mb-4" />


      <h2 className="text-2xl mb-4">Add Announcement</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ReactQuill
              value={richText}
              onChange={handleRichTextChange}
              placeholder="Write your announcement here..."
              className="bg-white p-2 rounded shadow-md"
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="mb-4"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add Announcement
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

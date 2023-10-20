import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';

export const AdminAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '' || message.trim() === '') {
      return;
    }

    axios
      .post('http://localhost:3001/announcement/add', {
        title,
        message,
      })
      .then((response) => {
        console.log('Announcement added successfully:', response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });

    setTitle('');
    setMessage('');
  };

  return (
    <Paper className="p-4 mx-4 ml-40">
      <h2 className="text-2xl">Add Announcement</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={title}
              onChange={handleTitleChange}
              required
              fullWidth
              className="mb-4"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              value={message}
              onChange={handleMessageChange}
              required
              fullWidth
              multiline
              rows={4}
              className="mb-4"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Announcement
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import announcImg from "../../assets/images/bgAnnounce.png";
import DOMPurify from "dompurify";

export const AdminAnnouncement = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [richText, setRichText] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRichTextChange = (value) => {
    setRichText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !richText) {
      alert("Please enter the field data");
      return;
    }

    const textOnlyRichText = richText.replace(/<[^>]*>/g, "");

    console.log(title, textOnlyRichText, "Title and rich text");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("richText", textOnlyRichText);

    // Convert FormData to a plain object
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log(formDataObject, "Announcement Data");

    axios
      .post("http://localhost:3001/announcement/add", formDataObject)
      .then((response) => {
        console.log("Announcement added successfully:", response.data);
        setAnnouncements([...announcements, response.data]);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    setRichText("");
    setTitle("");
  };
  const handleDelete = (announcementId) => {
    // Make an axios DELETE request to delete the announcement
    axios
      .delete(`http://localhost:3001/announcement/delete/${announcementId}`)
      .then(() => {
        // Update the announcements state after successful deletion
        setAnnouncements(
          announcements.filter(
            (announcement) => announcement._id !== announcementId
          )
        );
        console.log("Announcement deleted successfully.");
      })
      .catch((error) => {
        console.log("Error deleting announcement:", error);
      });
  };

  useEffect(() => {
    // Fetch announcements from the backend when the component mounts
    axios
      .get("http://localhost:3001/announcement/getAll")
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.log("Error fetching announcements:", error);
      });
  }, []);

  return (
    <Paper className="p-4 mx-4 mx-40 rounded-lg shadow-lg mt-14">
      <img
        src={announcImg}
        alt="Announcement"
        className="rounded-lg shadow-lg mb-4"
      />

      <h2 className="text-2xl mb-4">Add Announcement</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={handleTitleChange}
              className="mb-4"
            />
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              value={richText}
              onChange={handleRichTextChange}
              placeholder="Write your announcement here..."
              className="bg-white p-2 rounded shadow-md"
            />
          </Grid>
          {/* <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="mb-4"
            />
          </Grid> */}
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

      {/* Display fetched announcements */}
      <div className="mt-8">
        <h2 className="text-2xl mb-4">Announcements</h2>
        <ul className="space-y-4">
          {announcements.map((announcement) => (
            <li
              key={announcement._id}
              className="bg-white p-4 rounded shadow-md flex flex-col transform transition-transform hover:scale-105"
            >
              <span className="text-sm text-gray-500">
                {announcement.userId}
              </span>
              <p className="text-gray-500 mb-2">
                {new Date(announcement.date).toLocaleDateString()}
              </p>
              <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>

              <p className="text-gray-700">{announcement.richText}</p>
              <div className="flex items-center mt-4 justify-between">
                <span className="text-sm text-gray-500"></span>
                <div className="ml-auto">
                  <button className="bg-blue-500 mr-2 hover:bg-blue-600 text-white px-3 py-1 rounded focus:outline-none focus:ring focus:border-blue-300">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none focus:ring focus:border-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Paper>
  );
};

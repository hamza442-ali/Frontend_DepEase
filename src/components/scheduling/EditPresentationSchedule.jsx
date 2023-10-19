import React, { useState, useEffect } from 'react';

const EditPresentationSchedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [editedSchedule, setEditedSchedule] = useState({
    id: '',
    date: '',
    time: '',
    venue: '',
    allocatedTime: '',
  });

  // Fetch the existing presentation schedule from the backend
  useEffect(() => {
    // Implement code to fetch schedule data from the backend via an API request (e.g., using Axios).
    // Update the 'scheduleData' state with the fetched data.
  }, []);

  const handleEdit = (schedule) => {
    // Set the 'editedSchedule' state with the data of the schedule to edit.
    setEditedSchedule({
      id: schedule.id,
      date: schedule.date,
      time: schedule.time,
      venue: schedule.venue,
      allocatedTime: schedule.allocatedTime,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSchedule({ ...editedSchedule, [name]: value });
  };

  const handleUpdate = () => {
    // Implement code to send the edited schedule data to the backend for updating.
  };

  return (
    <div>
      <h1>Edit Presentation Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Allocated Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.date}</td>
              <td>{schedule.time}</td>
              <td>{schedule.venue}</td>
              <td>{schedule.allocatedTime}</td>
              <td>
                <button onClick={() => handleEdit(schedule)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Edit Schedule</h2>
      <form onSubmit={handleUpdate}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={editedSchedule.date}
          onChange={handleChange}
        />
        <br />

        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={editedSchedule.time}
          onChange={handleChange}
        />
        <br />

        <label>Venue:</label>
        <input
          type="text"
          name="venue"
          value={editedSchedule.venue}
          onChange={handleChange}
        />
        <br />

        <label>Allocated Time:</label>
        <input
          type="text"
          name="allocatedTime"
          value={editedSchedule.allocatedTime}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Update Schedule</button>
      </form>
    </div>
  );
};

export default EditPresentationSchedule;

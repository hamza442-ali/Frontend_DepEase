import React, { useState } from "react";
import TextInput from "../textinput/TextInput";
import SelectInput from "../selectinput/SelectInput";

const TaskForm = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [reporter, setReporter] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      taskTitle.trim() === "" ||
      assignee.trim() === "" ||
      reporter.trim() === ""
    )
      return alert("fill all text fileds");
    addTask(taskTitle, "todo", assignee, reporter, priority);
    setTaskTitle("");
    setAssignee("");
    setReporter("");
    setPriority("low");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow w-72">
      <h2 className="mb-4 text-lg font-semibold">Add Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Task Title */}
        <TextInput
          label="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <TextInput
          label="Assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
        <TextInput
          label="Reporter"
          value={reporter}
          onChange={(e) => setReporter(e.target.value)}
        />
        <SelectInput
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          options={["low", "medium", "high"]}
        />
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

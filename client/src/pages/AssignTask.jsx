import React, { useState } from 'react';
import './AssignTask.css';

const AssignTask = () => {
  const [taskName, setTaskName] = useState('');
  const [taskID, setTaskID] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [numberOfHours, setNumberOfHours] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new task object
    const newTask = {
      id: tasks.length + 1, // Replace with a unique identifier (e.g., generated using uuid library)
      taskName,
      taskID,
      assignedTo,
      numberOfHours,
    };

    // Update the tasks state with the new task
    setTasks([...tasks, newTask]);

    // Clear the form fields after submission
    setTaskName('');
    setTaskID('');
    setAssignedTo('');
    setNumberOfHours('');
  };

  return (
    <div>
      <h2>Assign Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Task ID:</label>
          <input
            type="text"
            value={taskID}
            onChange={(e) => setTaskID(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Assigned To:</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            <option value="Person A">Person A</option>
            <option value="Person B">Person B</option>
            <option value="Person C">Person C</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="form-group">
          <label>Number of Hours:</label>
          <input
            type="number"
            value={numberOfHours}
            onChange={(e) => setNumberOfHours(e.target.value)}
            required
          />
        </div>
        <button type="submit">Assign Task</button>
      </form>

      {/* The assigned tasks list */}
      <div className="assigned-tasks">
        <h3>Assigned Tasks:</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>Task Name:</strong> {task.taskName}
              <br />
              <strong>Task ID:</strong> {task.taskID}
              <br />
              <strong>Assigned To:</strong> {task.assignedTo}
              <br />
              <strong>Number of Hours:</strong> {task.numberOfHours}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssignTask;

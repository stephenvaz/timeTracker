import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Timesheet.css'; // Import the CSS file

const Timesheet = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendance, setAttendance] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [task, setTask] = useState('');
  const [hours, setHours] = useState('');
  const [comments, setComments] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [taskData, setTaskData] = useState([]);

  const handleAttendanceSubmit = () => {
    if (selectedDate && attendance) {
      const newAttendanceData = {
        date: selectedDate,
        attendance,
      };
      setAttendanceData([newAttendanceData]);
    }
  };

  const handleTaskSubmit = () => {
    if (task && hours && selectedProject) {
      const newTaskData = {
        projectID: selectedProject,
        taskName: task,
        hours: parseInt(hours),
        comments,
      };
      setTaskData([...taskData, newTaskData]);
      setTask('');
      setHours('');
      setComments('');
    }
  };

  const handleTaskDataChange = (index, field, value) => {
    const updatedTaskData = [...taskData];
    updatedTaskData[index][field] = value;
    setTaskData(updatedTaskData);
  };

  const handleTaskDataDelete = (index) => {
    const updatedTaskData = [...taskData];
    updatedTaskData.splice(index, 1);
    setTaskData(updatedTaskData);
  };

  // Sample list of projects
  const projectList = [
    { id: 1, name: 'Project A' },
    { id: 2, name: 'Project B' },
    { id: 3, name: 'Project C' },
    // Add more projects as needed
  ];

  return (
    <div>
      <h2>Timesheet Page</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Select Date:</label>
          <DatePicker
            id="date"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div className="form-group">
          <label htmlFor="attendance">Select Attendance:</label>
          <select
            id="attendance"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
          >
            <option value="">Select Attendance</option>
            <option value="Office">Office</option>
            <option value="Work From Home">Work From Home</option>
            <option value="Onsite">Onsite</option>
          </select>
        </div>
        <div className="form-group">
          <button type="button" onClick={handleAttendanceSubmit}>
            Submit Attendance
          </button>
        </div>
      </div>

      {attendanceData.length > 0 && (
        <div className="attendance-data">
          <h3>Attendance Data:</h3>
          <ul>
            {attendanceData.map((data, index) => (
              <li key={index}>
                Date: {data.date.toLocaleDateString()}, Attendance: {data.attendance}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="project">Select Project:</label>
          <select
            id="project"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Select Project</option>
            {projectList.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="task">Select Task:</label>
          <select
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          >
            <option value="">Select Task</option>
            <option value="Task 1">Task 1</option>
            <option value="Task 2">Task 2</option>
            <option value="Task 3">Task 3</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="hours">Enter Hours:</label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <input
            type="text"
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="button" onClick={handleTaskSubmit}>
            Add Task
          </button>
        </div>
      </div>

      {taskData.length > 0 && (
        <div className="task-data">
          <h3>Task Data:</h3>
          <table>
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Task</th>
                <th>Hours</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {taskData.map((data, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={data.projectID}
                      onChange={(e) => handleTaskDataChange(index, 'projectID', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data.taskName}
                      onChange={(e) => handleTaskDataChange(index, 'taskName', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={data.hours}
                      onChange={(e) => handleTaskDataChange(index, 'hours', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data.comments}
                      onChange={(e) => handleTaskDataChange(index, 'comments', e.target.value)}
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => handleTaskDataDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Timesheet;

import React, { useState } from 'react';
import './OngoingProject.css';

const OngoingProject = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskName: 'Task 1',
      taskId: '500.001', // Add the Task ID field here
      hours: 5,
      manager: 'Manager A',
      status: 'ongoing',
    },
    {
      id: 2,
      taskName: 'Task 2',
      taskId: '600.002', // Add the Task ID field here
      hours: 8,
      manager: 'Manager B',
      status: 'ongoing',
    },
    // Add other tasks...
  ]);

  const handleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'completed' } : task
      )
    );
  };

  return (
    <div>
      <h2>Ongoing Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Task ID</th> {/* Add the Task ID header */}
            <th>Task Name</th>
            <th>Number of Hours</th>
            <th>Assigned By</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .filter((task) => task.status === 'ongoing')
            .map((task) => (
              <tr key={task.id}>
                <td>{task.taskId}</td> {/* Display the Task ID */}
                <td>{task.taskName}</td>
                <td>{task.hours}</td>
                <td>{task.manager}</td>
                <td>
                  <button onClick={() => handleTaskCompletion(task.id)}>
                    Finished
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>Completed Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Task ID</th> {/* Add the Task ID header */}
            <th>Task Name</th>
            <th>Number of Hours</th>
            <th>Assigned By</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .filter((task) => task.status === 'completed')
            .map((task) => (
              <tr key={task.id} className="completed">
                <td>{task.taskId}</td> {/* Display the Task ID */}
                <td>{task.taskName}</td>
                <td>{task.hours}</td>
                <td>{task.manager}</td>
                <td>{task.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OngoingProject;

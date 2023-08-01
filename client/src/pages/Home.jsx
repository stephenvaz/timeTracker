import React, { useState } from 'react';
import './home.css'; // Import the home.css file

const Home = () => {
  // Replace "Employee Name" with the actual employee's name from your data or state
  const employeeName = "John Doe";

  const [isArrivalStarted, setIsArrivalStarted] = useState(false);
  const [isArrivalEnded, setIsArrivalEnded] = useState(false);
  const [attendanceData, setAttendanceData] = useState({
    arrivalTime: null,
    leaveTime: null,
  });

  // Function to handle the logout action
  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out.");

    // Reset attendance data
    setIsArrivalStarted(false);
    setIsArrivalEnded(false);
    setAttendanceData({ arrivalTime: null, leaveTime: null });
  };

  // Function to handle marking the start time
  const handleStartArrivalTime = () => {
    if (!isArrivalStarted) {
      const startTime = new Date();
      setAttendanceData((prevState) => ({ ...prevState, arrivalTime: startTime }));
      setIsArrivalStarted(true);
    }
  };

  // Function to handle marking the end time
  const handleEndArrivalTime = () => {
    if (isArrivalStarted && !isArrivalEnded) {
      const endTime = new Date();
      setAttendanceData((prevState) => ({ ...prevState, leaveTime: endTime }));
      setIsArrivalEnded(true);
    }
  };

  // Calculate time worked in hours and minutes
  const calculateTimeWorked = () => {
    if (attendanceData.arrivalTime && attendanceData.leaveTime) {
      const timeDiff = Math.abs(attendanceData.leaveTime - attendanceData.arrivalTime);
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      return `${hours} hours ${minutes} minutes`;
    }
    return "Not available";
  };

  return (
    <div className="home-container">
      <div>
        <h1 className="employee-name">{employeeName}</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {isArrivalStarted && (
        <div className="present-indicator">Present</div>
      )}

      {/* Attendance Cards */}
      <div className="card-container">
        <div className="card">
          <h2>Arrival Time</h2>
          <p>{attendanceData.arrivalTime ? attendanceData.arrivalTime.toLocaleTimeString() : "Not marked"}</p>
          {!isArrivalStarted && (
            <button onClick={handleStartArrivalTime}>Start Arrival Time</button>
          )}
        </div>

        <div className="card">
          <h2>Leave Time</h2>
          <p>{attendanceData.leaveTime ? attendanceData.leaveTime.toLocaleTimeString() : "Not marked"}</p>
          {isArrivalStarted && !isArrivalEnded && (
            <button onClick={handleEndArrivalTime}>End Arrival Time</button>
          )}
        </div>
      </div>

      {/* Time Worked Card */}
      <div className="centered-card">
        <div className="card">
          <h2>Time Worked</h2>
          <p>{calculateTimeWorked()}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

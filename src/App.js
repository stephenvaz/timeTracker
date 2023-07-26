import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Timesheet from './pages/Timesheet';
import Apply from './pages/Apply';
import Status from './pages/Status';
import Attendance from './pages/Attendance';
import OngoingProject from './pages/OngoingProject';
import AssignTask from './pages/AssignTask'; // Add this line

import './styles.css';

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-logo">Your App Logo</div>
        <div className="navbar-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/timesheet">Timesheet</Link>
            </li>
            <li>
              <Link to="/apply">Apply</Link>
            </li>
            <li>
              <Link to="/status">Status</Link>
            </li>
            <li>
              <Link to="/attendance">Attendance</Link>
            </li>
            <li>
              <Link to="/ongoing_proj">Ongoing Project</Link>
            </li>
            <li>
               <Link to="/assign_task">Assign Task</Link> {/* Add this line */}
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/status" element={<Status />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/ongoing_proj" element={<OngoingProject />} />
        <Route path="/assign_task" element={<AssignTask />} /> {/* Add this line */}

      </Routes>
    </Router>
  );
};

export default App;

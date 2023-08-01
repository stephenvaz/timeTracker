import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Timesheet from './pages/Timesheet';
import Apply from './pages/Apply';
import Status from './pages/Status';
import Attendance from './pages/Attendance';
import OngoingProject from './pages/OngoingProject';
import AssignTask from './pages/AssignTask'; // Add this line
import Login from './pages/Login';
import './App.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <div>

      { isAuth ? 
        (<div>
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
                 <Link to="/assign_task">Assign Task</Link>
              </li>
            </ul>
          </div>
        </nav>
  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/timesheet" element={<Timesheet />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/status" element={<Status />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/ongoing_proj" element={<OngoingProject />} />
          <Route path="/assign_task" element={<AssignTask />} /> {/* Add this line */}
  
        </Routes>
      </Router>
      </div>
      ) : (
        <Login setIsAuth={setIsAuth}/>
      )}
      <ToastContainer
       position="top-center"
       autoClose={1500}
       limit={1}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover={false}
       theme="light"
       />
    </div>

  );
};

export default App;

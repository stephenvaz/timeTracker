import * as React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Login.css'

const Login = ({setIsAuth}) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const [loginStat, setLoginStat] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(userDetails);
        await axios.post("http://localhost:6969/api/users/login", userDetails)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("isAuth", 'true');
          window.location.href = "/home";
          // localStorage.setItem("isIn", 'true');
          // localStorage.setItem("user", res.data);
          // console.log(res.data.token);
        })
        .catch((err) => {
          console.log(err);
        })
        toast.success("Login Successful!")
      
    } catch (error) {
      setLoginStat(false);
      // localStorage.setItem("isIn", 'false');
      console.log(error);
      toast.error("Login Failed!", {
        toastId: "error"
      })
    }
  }

  function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      document.getElementById("togglePassword").className = "far fa-eye-slash";
      x.type = "text";
    } else {
      document.getElementById("togglePassword").className = "far fa-eye";
      x.type = "password";
    }
  }
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  }
  
  return (
    <div className="loginBox">
          <h2>Login</h2>
          <form>
            <div className="userBox">
              <input type="text" id="userid" name="email" onChange={handleChange} onKeyDown={handleKeyPress}></input>
              <label>Username</label>
            </div>
            <div className="userBox">
              <input type="password" id="myInput" name="password" onChange={handleChange} onKeyDown={handleKeyPress}></input>
              <label>Password</label>
              <i className="far fa-eye" id="togglePassword"
                onClick={() =>
                  myFunction()
                }
              ></i>
    
            </div>
            <a onClick={handleSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>
          </form>
    </div>
      )
}

export default Login
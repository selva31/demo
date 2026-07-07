import React, { useEffect, useRef, useState, useTransition } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import "../styles/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [active, setactive] = useState(true);
  const usernameref = useRef(null);
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const confirmref = useRef(null);
  const navigate = useNavigate();

  const handleclick = () => {
    navigate("/forgot");
  };

  const handleSubmit = () => {
    const data = active
      ? { email: emailref.current.value, password: passwordref.current.value }
      : {
          username: usernameref.current.value,
          email: emailref.current.value,
          password: passwordref.current.value,
        };
    const username = emailref.current.value;
    emailref.current.value = "";
    passwordref.current.value = "";
    if (!active && usernameref.current) {
      usernameref.current.value = "";
    }
    if (!active && confirmref.current) {
      confirmref.current.value = "";
    }
    const url = active
      ? `${process.env.REACT_APP_url}/v1/login`
      : `${process.env.REACT_APP_url}/v1/register`;

    axios
      .post(url, data)
      .then((response) => {
        console.log(`${process.env.REACT_APP_url}`);
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        // localStorage.setItem("sessions", response.data.message);
        // localStorage.setItem("user", username);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div id="root">
        <div id="center">
          <div className="content">
            <h2>Welcome Back...!</h2>
            <p>Please enter your details.</p>
          </div>
          .
          <div className="login">
            <div className="btns">
              <span
                className={active && "activebtn"}
                onClick={() => {
                  setactive(true);
                }}
              >
                login
              </span>
              <span
                className={!active && "activebtn"}
                onClick={() => {
                  setactive(false);
                }}
              >
                Sign up
              </span>
            </div>
            {!active && (
              <div className="username btnspace">
                <TextField
                  required
                  id="outlined-required"
                  label="username"
                  inputRef={usernameref}
                  placeholder="Enter your username"
                />
              </div>
            )}
            <div className="email btnspace">
              <TextField
                required
                id="outlined-required"
                label="email"
                inputRef={emailref}
                placeholder="Enter your email"
              />
            </div>
            <div className="password btnspace">
              {/* <label>password</label> */}
              <TextField
                required
                id="outlined-required"
                label="password"
                inputRef={passwordref}
                placeholder="Enter your password"
              />
            </div>
            {active && (
              <button className="forgot" onClick={handleclick}>
                Forgot password
              </button>
            )}

            {!active && (
              <div className="confirm password btnspace">
                {/* <label>password</label> */}
                <TextField
                  required
                  id="outlined-required"
                  label="confirm password"
                  inputRef={confirmref}
                  placeholder="confirm password"
                />
              </div>
            )}
          </div>
          <div className="trouble">
            <span>
              {active
                ? "Having trouble in Login?"
                : "Having trouble in signup?"}
            </span>
          </div>
          <div className="submitbtn">
            <Button variant="outlined" onClick={handleSubmit}>
              {active ? "login" : "sign up"}
            </Button>
          </div>
          <div className="social"></div>
        </div>
      </div>
    </>
  );
}

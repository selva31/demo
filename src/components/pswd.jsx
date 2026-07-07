import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import "../styles/pswd.css";
import axios from "axios";

function Forgotpassword() {
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const confirmref = useRef(null);

  async function Handleclick() {
    const email = emailref.current.value;
    const password = passwordref.current.value;
    emailref.current.value = "";
    passwordref.current.value = "";
    confirmref.current.value = "";
    const data = { password: password };
    const res = await axios.patch(
      `${process.env.REACT_APP_url}/v1/mdy/${email}`,
      data,
    );
    console.log(res.data);
  }

  return (
    <>
      <div id="container">
        <div className="forgotpassword">
          <TextField
            id="standard-basic"
            label="enter email"
            inputRef={emailref}
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="new paasword"
            inputRef={passwordref}
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="confirm password"
            inputRef={confirmref}
            variant="standard"
          />
        </div>
        <div className="changepassword">
          <button className="changebtn" onClick={Handleclick}>
            submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Forgotpassword;

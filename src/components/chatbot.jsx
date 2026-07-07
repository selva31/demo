import React, { useRef, useState } from "react";
import "..//styles/chat.css";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Fab from "@mui/material/Fab";
import axios from "axios";

export default function Chat() {
  const [message, setmessage] = useState([]);
  const messageref = useRef(null);

  const handleclick = async () => {
    const text = messageref.current.value;

    if (!text) return;

    messageref.current.value = "";

    try {
      const res = await axios.post(`${process.env.REACT_APP_url}/chat`, {
        userprompt: text,
        user_id: 1,
      });

      setmessage((prev) => [
        ...prev,
        {
          userprompt: text,
          message: res.data.message,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="rootcon">
        <div id="stylecon">
          <h2>HI,How Can i Help You?</h2>

          <div className="messages">
            {message.map((msg, index) => (
              <div key={index}>
                <p className="rightmsg">{msg.userprompt}</p>

                <p className="leftmsg">{msg.message}</p>
              </div>
            ))}
          </div>
          <div id="chatcontainer">
            <TextField
              fullWidth
              multiline
              placeholder="Ask anything..."
              inputRef={messageref}
            />
            <Fab aria-label="send" onClick={handleclick}>
              <SendIcon />
            </Fab>
          </div>
        </div>
      </div>
    </>
  );
}

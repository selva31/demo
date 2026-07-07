import React, { useEffect, useRef, useState } from "react";

export default function Notifications() {
  const [msg, setmsg] = useState("");
  Notification.requestPermission();
  useEffect(() => {
    const sse = new EventSource(`${process.env.REACT_APP_url}/v1/sse`, {
      withCredentials: true,
    });
    sse.onmessage = function (event) {
      if (event.data === "END") {
        sse.close();
        console.log("Finished");
        return;
      }
      // msg.innerHTML += event.data + "<br>";
      setmsg((prev) => prev + event.data);
      const notification = new Notification("This is the msg frm admin", {
        body: event.data,
      });
    };
    return () => {
      sse.close();
    };
  }, []);

  return (
    <>
      <p id="sse">{msg}</p>
    </>
  );
}

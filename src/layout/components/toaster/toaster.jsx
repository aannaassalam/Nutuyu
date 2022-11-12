import React, { useEffect, useRef, useState } from "react";
import "./toaster.css";

export default function Toaster({ message, positive }) {
  const [msg, setMsg] = useState("");
  const ref = useRef();
  useEffect(() => {
    if (message) {
      setMsg(message);
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  }, [message]);

  return (
    <div className="notification" ref={ref}>
      <p>{message}</p>
      <span className="progress"></span>
    </div>
  );
}

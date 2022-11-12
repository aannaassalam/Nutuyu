import React, { useEffect, useState } from "react";
import "./toaster.css";

export default function Toaster({ message }) {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (message) {
      setMsg(message);
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  }, [message]);

  return (
    <div className="notification">
      <p>{message}</p>
      <span className="progress"></span>
    </div>
  );
}

import React, { useState } from "react";
import "./notFound.css";
import Lottie from "react-lottie";
import notFound from "../../../assets/robot.json";
import { Button } from "@mui/material";

function NotFound() {
  return (
    <div className="notFound">
      <Lottie options={{ animationData: notFound }} width={300} height={300} />
      <h1>Page Not Found</h1>
      <Button
        variant="contained"
        onClick={() => (window.location.pathname = "/")}
      >
        Go Home{" "}
      </Button>
    </div>
  );
}

export default NotFound;

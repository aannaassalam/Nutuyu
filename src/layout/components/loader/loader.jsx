import React, { useEffect, useState } from "react";
import "./loader.css";
import Lottie from "react-lottie";
import loader from "../../../assets/lf30_editor_dbg5enxh.json";

export default function Loader({ loading }) {
  const [loadingTime, setLoadingTime] = useState(false);

  useEffect(() => {
    if (!window.sessionStorage.getItem("loading-nutuyu")) {
      setLoadingTime(true);
      window.sessionStorage.setItem("loading-nutuyu", true);
      setTimeout(() => {
        setLoadingTime(false);
      }, 2200);
    }
    setTimeout(() => {
      window.sessionStorage.setItem("loading-nutuyu", false);
    }, 2500);
  }, []);

  const loading_classname = () => {
    if (
      window.sessionStorage.getItem("loading-nutuyu") === "true" &&
      !loading &&
      !loadingTime
    ) {
      return "loader fade";
    } else if (!loading && !loadingTime) {
      return "loader snap";
    }
    return "loader";
  };

  return (
    <div className={loading_classname()}>
      {window.sessionStorage.getItem("loading-nutuyu") === "true" ? (
        <div className="loader-div">
          <p>Welcome to</p>
          <div className="company-name">
            <span>N</span>
            <span>u</span>
            <span>T</span>
            <span>u</span>
            <span>Y</span>
            <span>u</span>
            <span>7</span>
            <span>2</span>
          </div>
        </div>
      ) : window.sessionStorage.getItem("loading-nutuyu") === "false" ? (
        <Lottie
          options={{
            animationData: loader,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={80}
          width={80}
        />
      ) : null}
    </div>
  );
}

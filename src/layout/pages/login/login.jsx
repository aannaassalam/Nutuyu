import { TextField } from "@mui/material";
import React, { useState } from "react";
import "./login.css";
function Login() {
  const [handleSection, setHandleSection] = useState(2);
  return (
    <div className="Login">
      {handleSection === 0 ? (
        <>
          <h1>Log in</h1>
          <TextField id="standard-basic" label="Email" variant="standard" />
          <TextField id="standard-basic" label="Password" variant="standard" />
          <p className="forgot" onClick={() => setHandleSection(1)}>
            Forgot Password
          </p>
          <button>LogIn</button>
          <p>Don't Have an account?</p>
          <button className="lastButton" onClick={() => setHandleSection(2)}>
            Create an account
          </button>
        </>
      ) : handleSection === 1 ? (
        <>
          <h1>RESET PASSWORD</h1>
          <p className="reset">
            Please enter your email address below to get an email to reset your
            password.
          </p>
          <TextField id="standard-basic" label="Email" variant="standard" />
          <button>Submit</button>
          <p className="cancel" onClick={() => setHandleSection(0)}>
            Cancel
          </p>
        </>
      ) : (
        <>
          <h1>Create An Account</h1>
          <TextField id="standard-basic" label="Full Name" variant="standard" />

          <TextField id="standard-basic" label="Email" variant="standard" />

          <TextField id="standard-basic" label="Password" variant="standard" />
          <TextField
            id="standard-basic"
            label="Confirm Password"
            variant="standard"
          />

          <button>Create account</button>
          <p>Already Have an account?</p>
          <button className="lastButton" onClick={() => setHandleSection(0)}>
            login
          </button>
        </>
      )}
    </div>
  );
}

export default Login;

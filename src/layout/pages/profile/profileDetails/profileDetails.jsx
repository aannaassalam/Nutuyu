import React from "react";
import "./profileDetails.css";
import { Button, TextField } from "@mui/material";
function ProfileDetails() {
  return (
    <div className="ProfileDetails">
      <h2>Profile Details</h2>
      <div className="inputs">
        <TextField
          id="standard-basic"
          label="Full Name"
          variant="standard"
          value="John Doe"
          type="text"
        />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          type="email"
          value={"johndoe@example.com"}
        />
        <TextField
          id="standard-basic"
          label="Phone"
          variant="standard"
          type="number"
          value={1234567890}
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          value={12134}
        />
        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default ProfileDetails;

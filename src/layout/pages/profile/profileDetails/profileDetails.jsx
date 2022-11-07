import React, { useEffect, useState } from "react";
import "./profileDetails.css";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";

function ProfileDetails() {
  const user = useAuth();

  const [state, setState] = useState({
    full_name: "",
    password: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    if (user) {
      setState({
        full_name: user.full_name,
        password: user.password,
        email: user.email,
        phone_number: user.phone_number,
      });
    }
  }, [user]);

  return (
    <div className="ProfileDetails">
      <h2>Profile Details</h2>
      <div className="inputs">
        <TextField
          label="Full Name"
          variant="standard"
          type="email"
          value={state.full_name}
        />
        <TextField
          label="Email"
          variant="standard"
          type="email"
          value={state.email}
          disabled
        />
        <TextField
          label="Phone"
          variant="standard"
          type="number"
          value={state.phone_number}
        />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          value={state.password}
        />
        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default ProfileDetails;

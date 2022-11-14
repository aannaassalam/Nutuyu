import React, { useEffect, useState } from "react";
import "./profileDetails.css";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { getAuth, updatePassword } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

function ProfileDetails() {
  const user = useAuth();

  const [state, setState] = useState({
    full_name: "",
    password: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    if (!user.loading && user.user) {
      setState({
        full_name: user.user.full_name,
        email: user.user.email,
        phone_number: user.user.phone_number,
      });
    }
  }, [user]);

  const handleUpdate = () => {
    if (
      state.full_name.trim().length > 0 &&
      state.phone_number.trim().length > 8 &&
      state.password.trim().length > 7
    ) {
      console.log("in");
      updateDoc(doc(getFirestore(), "users", user.user.id), {
        full_name: state.full_name.trim(),
        phone_number: state.phone_number.trim(),
      })
        .then(() => {
          console.log("updated");
          updatePassword(getAuth().currentUser, state.password)
            .then(() => setState((prev) => ({ ...prev, password: "" })))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="ProfileDetails">
      <h2>Profile Details</h2>
      <div className="inputs">
        <TextField
          label="Full Name"
          variant="standard"
          type="email"
          value={state.full_name}
          onChange={(e) =>
            setState((prev) => ({ ...prev, full_name: e.target.value }))
          }
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
          onChange={(e) =>
            setState((prev) => ({ ...prev, phone_number: e.target.value }))
          }
        />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          value={state.password}
          sx={{ width: "100%" }}
          onChange={(e) =>
            setState((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <Button onClick={handleUpdate}>Submit</Button>
      </div>
    </div>
  );
}

export default ProfileDetails;

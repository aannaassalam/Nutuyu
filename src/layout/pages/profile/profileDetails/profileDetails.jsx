import React, { useEffect, useState } from "react";
import "./profileDetails.css";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.min.css";
function ProfileDetails() {
  const user = useAuth();

  const [state, setState] = useState({
    full_name: "",
    old_password: "",
    new_password: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    if (!user.loading && user.user) {
      setState((prev) => ({
        ...prev,
        full_name: user.user.full_name,
        email: user.user.email,
        phone_number: user.user.phone_number,
      }));
    }
  }, [user]);

  const reauthenticate = () => {
    // var local_user = getAuth().currentUser;
    var cred = EmailAuthProvider.credential(
      user.user.email,
      state.old_password
    );
    return reauthenticateWithCredential(getAuth().currentUser, cred);
  };

  const handleUpdate = () => {
    if (
      state.full_name.trim().length > 0 &&
      state.phone_number.trim().length > 8 &&
      state.old_password.trim().length > 7 &&
      state.new_password.trim().length > 7
    ) {
      updateDoc(doc(getFirestore(), "users", user.user.id), {
        full_name: state.full_name.trim(),
        phone_number: state.phone_number.trim(),
      })
        .then(() => {
          console.log("updated");
          reauthenticate()
            .then(() => {
              updatePassword(getAuth().currentUser, state.new_password)
                .then(() => {
                  user.updateUser();
                  setState((prev) => ({
                    ...prev,
                    new_password: "",
                    old_password: "",
                  }));
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else if (state.full_name.trim().length === 0) {
      toaster.notify("Please Enter Name");
    }
  };

  return (
    <div className="ProfileDetails">
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
      <h2>Profile Details</h2>
      <div className="inputs">
        <TextField
          label="Full Name"
          variant="standard"
          type="email"
          value={state.full_name}
          fullWidth
          sx={{ marginBottom: "20px" }}
          onChange={(e) =>
            setState((prev) => ({ ...prev, full_name: e.target.value }))
          }
        />
        <TextField
          label="Email"
          variant="standard"
          type="email"
          value={state.email}
          fullWidth
          sx={{ marginBottom: "20px" }}
          disabled
        />
        <TextField
          label="Phone"
          variant="standard"
          type="number"
          value={state.phone_number}
          fullWidth
          sx={{ marginBottom: "20px" }}
          onChange={(e) =>
            setState((prev) => ({ ...prev, phone_number: e.target.value }))
          }
        />
        <h2 style={{ marginLeft: 0 }}>Change Password</h2>

        <TextField
          label="Old Password"
          variant="standard"
          type="password"
          value={state.old_password}
          fullWidth
          sx={{ marginBottom: "20px" }}
          onChange={(e) =>
            setState((prev) => ({ ...prev, old_password: e.target.value }))
          }
        />
        <TextField
          label="New Password"
          variant="standard"
          type="password"
          value={state.new_password}
          fullWidth
          sx={{ marginBottom: "20px" }}
          onChange={(e) =>
            setState((prev) => ({ ...prev, new_password: e.target.value }))
          }
        />
        <Button onClick={handleUpdate}>Submit</Button>
      </div>
    </div>
  );
}

export default ProfileDetails;

import React, { useEffect, useState } from "react";
import "./login.css";
import { TextField } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import

function Login() {
  const [handleSection, setHandleSection] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_number] = useState("");

  const user = useAuth();
  const navigate = useNavigate();

  const createAccount = () => {
    console.log("in");
    if (
      email.trim().length > 0 &&
      email.includes("@") &&
      password.trim().length > 7 &&
      phone_number.length > 6
    ) {
      const q = query(
        collection(getFirestore(), "users"),
        where("email", "==", email)
      );
      getDocs(q)
        .then((snapshot) => {
          if (snapshot.size > 0) {
            console.log("User already exists!!!");
          } else {
            createUserWithEmailAndPassword(
              getAuth(),
              email.trim(),
              password.trim()
            )
              .then((userCredential) => {
                const user = userCredential.user;
                setDoc(doc(getFirestore(), "users", user.uid), {
                  full_name: name.trim(),
                  email: email.trim(),
                  phone_number: phone_number.trim(),
                  cart: [],
                  shipping_addresses: [],
                  billing_addresses: [],
                  date: new Date(),
                  orders: [],
                })
                  .then(() => console.log("User created"))
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("error");
    }
  };

  const login = () => {
    if (
      email.trim().length > 0 &&
      email.includes("@") &&
      password.trim().length > 7
    ) {
      const q = query(
        collection(getFirestore(), "users"),
        where("email", "==", email)
      );
      getDocs(q).then((snapshot) => {
        if (snapshot.size > 0) {
          signInWithEmailAndPassword(getAuth(), email, password)
            .then((user) => {
              console.log("logged In!!");
              // toaster
              window.location.href = "/";
            })
            .catch((err) => console.log(err));
        } else {
          console.log("User doesn't exists!!!");
        }
      });
    } else {
      console.log("somwthing went wrong");
    }
  };

  if (!user.loading && user.user) {
    return navigate("/products/clothing");
  }

  return (
    <div className="Login">
      {handleSection === 0 ? (
        <>
          <h1>Login</h1>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="forgot" onClick={() => setHandleSection(1)}>
            Forgot Password
          </p>
          <button type="button" onClick={login}>
            LogIn
          </button>
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
          <TextField
            id="standard-basic"
            label="Full Name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            id="standard-basic"
            label="Phone Number"
            variant="standard"
            value={phone_number}
            onChange={(e) => setPhone_number(e.target.value)}
          />

          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" onClick={createAccount}>
            Create account
          </button>
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

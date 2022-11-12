import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(
      getAuth(),
      (user) => {
        console.log(user);
        if (user) {
          onSnapshot(
            doc(getFirestore(), "users", user.uid),
            (doc) => {
              setUser({ ...doc.data(), ...user, id: doc.id });
              setLoading(false);
              console.log("object");
            },
            (err) => {
              console.log(err);
              setLoading(false);
            }
          );
        } else {
          setLoading(false);
          setUser(null);
        }
      },
      (err) => console.log(err)
    );
  }, []);

  return (
    <AuthContext.Provider value={{ loading, user }}>
      {children}
    </AuthContext.Provider>
  );
}

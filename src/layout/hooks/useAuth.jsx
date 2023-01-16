import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
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

  const updateUser = () => setUser(getAuth().currentUser);

  useEffect(() => {
    onAuthStateChanged(
      getAuth(),
      (user) => {
        if (user && user.email !== "admin@nutuyu72.com") {
          onSnapshot(
            doc(getFirestore(), "users", user.uid),
            (doc) => {
              setUser({ ...doc.data(), ...user, id: doc.id });
              setLoading(false);
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
    <AuthContext.Provider value={{ loading, user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

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

  useEffect(() => {
    onAuthStateChanged(
      getAuth(),
      (user) => {
        console.log(user);
        if (user) {
          onSnapshot(
            doc(getFirestore(), "users", user.uid),
            (doc) => setUser({ ...doc.data(), id: doc.id }),
            (err) => console.log(err)
          );
        } else {
          setUser(null);
        }
      },
      (err) => console.log(err)
    );
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

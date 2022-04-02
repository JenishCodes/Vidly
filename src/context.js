import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Services/firebase";
import { getHistory } from "./Services/user";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (res) => {
      if (res) {
        const history = await getHistory(res.uid)
        setUser({ uid: res.uid, name: res.displayName, email: res.email, history });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { signIn, signOut, signUp } from "./Services/auth";
import { notification } from "antd";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  const signin = (email, password) => {
    signIn(email, password)
      .then(() => setIsUserSignedIn(true))
      .catch((err) =>
        notification.error({
          message: err.message,
        })
      );
  };

  const signout = () => {
    signOut();
    setIsUserSignedIn(false);
  };

  const signup = async (name, email, password) => {
    await signUp(name, email, password);
    setIsUserSignedIn(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsUserSignedIn(true);
    }
  }, [isUserSignedIn]);

  return (
    <AuthContext.Provider value={{ isUserSignedIn, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext({currentUser: {}});

var settings = {
  url: "http://localhost:3000/verify",
  handleCodeInApp: true
};


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [idToken, setIdToken] = useState("");
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function sendSignInLinkToEmail(email) {
    return auth.sendSignInLinkToEmail(email, settings);
  }
  function signInWithEmailLink(email, url) {
    return auth.signInWithEmailLink(email, url);
  }
  function signInWithCustomToken(token) {
    return auth.signInWithCustomToken(token);
  }
  function isSignInWithEmailLink(url) {
    return auth.isSignInWithEmailLink(url);
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      user.getIdToken().then(function (idToken) {
        setIdToken(idToken);
      });
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    idToken,
    login,
    signup,
    logout,
    resetPassword,
    sendSignInLinkToEmail,
    signInWithCustomToken,
    signInWithEmailLink,
    isSignInWithEmailLink,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

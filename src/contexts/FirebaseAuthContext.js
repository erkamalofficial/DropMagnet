import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext({currentUser: {}});

let VERIFICATION_URL_SIGNIN = ""
let VERIFICATION_URL_SIGNUP = ""

if(process.env.NODE_ENV === 'development'){
  VERIFICATION_URL_SIGNIN = "http://localhost:3000/verify/signin"
  VERIFICATION_URL_SIGNUP = "http://localhost:3000/verify/signup"
}
else{
  VERIFICATION_URL_SIGNIN = "https://dropmagnet-develop.web.app/verify/signin"
  VERIFICATION_URL_SIGNUP = "https://dropmagnet-develop.web.app/verify/signup"
}


var signinSettings = {
  url: VERIFICATION_URL_SIGNIN,
  handleCodeInApp: true
};

var signupSettings = {
  url: VERIFICATION_URL_SIGNUP,
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
    return auth.sendSignInLinkToEmail(email, signinSettings);
  }
  function sendSignUpLinkToEmail(email) {
    return auth.sendSignInLinkToEmail(email, signupSettings);
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
    sendSignUpLinkToEmail,
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

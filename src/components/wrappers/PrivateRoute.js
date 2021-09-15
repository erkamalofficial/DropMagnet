import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/FirebaseAuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, idToken } = useAuth();
  const user = JSON.parse(localStorage.getItem('userDetails'))

  return (
    <Route
      {...rest}
      render={(props) => {
        return (currentUser || user) ? (
          <Component
            {...props}
            {...rest}
            idToken={idToken}
            uid={currentUser.uid}
          />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}

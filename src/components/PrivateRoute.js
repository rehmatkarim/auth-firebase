import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...rest} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}

export default PrivateRoute;

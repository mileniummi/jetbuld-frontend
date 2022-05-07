import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { userContext } from "../context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const { user } = useContext(userContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        Object.keys(user).length ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

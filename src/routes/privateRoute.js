import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isGuest = Cookies.get("isGuest");

  return (
    <Route
      {...rest}
      render={(props) =>
        isGuest === "true" ||
        isGuest === undefined ||
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

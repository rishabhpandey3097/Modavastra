import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isGuest = Cookies.get("isGuest");
  const isValid = Cookies.get("valid");
  // console.log(isValid);
  // console.log(localStorage.getItem("token"));
  return (
    <Route
      {...rest}
      render={(props) =>
        !isGuest || !localStorage.getItem("token") || !isValid ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
          // <Redirect
          //   to={{
          //     pathname: "/login",
          //     state: { from: props.location },
          //   }}
          // />
        )
      }
    />
  );
};

export default PrivateRoute;

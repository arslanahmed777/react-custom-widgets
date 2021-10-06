import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/User/User.Selectors";

const ProtectedRoute = ({ children, ...rest }) => {
  const currentUser = useSelector(selectCurrentUser);

  console.log(currentUser);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;

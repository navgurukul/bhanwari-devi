import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

// import { userHasAccess } from '../../services/auth'
import { PATHS } from "../../constant";

const OnlyLoggedIn = (passedProps) => {
  const { user = {}, component: Component, ...rest } = passedProps;

  // let isAuthorized = false
  // if (!roles) {
  //   isAuthorized = true
  // } else if (User && User.user) {
  //   isAuthorized = userHasAccess(User.user, roles || [])
  // }

  return (
    <Route
      {...rest}
      render={(props) => {
        return user && user.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: PATHS.LOGIN,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

OnlyLoggedIn.propTypes = {
  component: PropTypes.any,
  location: PropTypes.any,
};

export default OnlyLoggedIn;

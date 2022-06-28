import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { actions as userActions } from "../../components/User/redux/action";
import { PATHS } from "../../constant";

const OnlyLoggedIn = (passedProps) => {
  const { user = {}, component: Component, ...rest } = passedProps;
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");

  if (token && (!user || !user.isAuthenticated)) {
    // Registered user attempting to log in by using redirect token;
    //     let's send the token to our back-end to get profile data
    //     from /users/me
    dispatch(userActions.onUserSignin({ token }));
    localStorage.removeItem("Token");
  }

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

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { actions as userActions } from "../../components/User/redux/action";
import Loader from "../../components/common/Loader";

// import { userHasAccess } from '../../services/auth'
import { PATHS } from "../../constant";

const OnlyLoggedIn = (passedProps) => {
  const { user = {}, component: Component, ...rest } = passedProps;
  const dispatch = useDispatch();
  const { loading } = useSelector(({ User }) => User);
  const token = localStorage.getItem("Token");

  // let isAuthorized = false
  // if (!roles) {
  //   isAuthorized = true
  // } else if (User && User.user) {
  //   isAuthorized = userHasAccess(User.user, roles || [])
  // }

  if (loading) {
    return <Loader />;
  }

  if (token && (!user || !user.isAuthenticated)) {
    // Registered user attempting to log in by using redirect token; 
    //     let's send the token to our back-end to get profile data
    //     from /users/me
    dispatch(userActions.onUserSignin({token}));
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

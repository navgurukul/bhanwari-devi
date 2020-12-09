import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OnlyLoggedIn from "./OnlyLoggedIn";

const mapStateToProps = (state) => ({
  user: state.User.data,
});

export const PrivateRoute = withRouter(connect(mapStateToProps)(OnlyLoggedIn));

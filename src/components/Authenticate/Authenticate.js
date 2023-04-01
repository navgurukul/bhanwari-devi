import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions as userActions } from "../../components/User/redux/action";
import { useHistory } from "react-router-dom";
function Authenticate() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const urlParams = new URL(document.location.href);
    const tokenParams = urlParams.searchParams;
    const idToken = tokenParams.get("token");
    console.log(idToken);
    const googleData = {
      id: "123",
      idToken,
    };
    // let's send the data to our backend.
    dispatch(userActions.onUserSignin(googleData));
    history.push("/");
  }, [dispatch]);

  return <div>Authenticate</div>;
}

export default Authenticate;

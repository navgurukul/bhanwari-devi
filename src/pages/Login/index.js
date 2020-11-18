import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import LockOpenTwoToneIcon from "@material-ui/icons/LockOpenTwoTone";
import GoogleLogin from 'react-google-login';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  // Typography,
} from "@material-ui/core";
import useStyles from "../styles";
import { actions as userActions } from '../../components/User/redux/action'
import { PATHS } from '../../constant'

function Login(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, data } = useSelector(({User}) => User)
  const isAuthenticated = data && data.isAuthenticated
  //TODO: if authenticated redirect to home page
  if(isAuthenticated) window.location.assign(PATHS.ADD_CLASS)
  // const [isLogin, setLoginType] = useState(false);
  // console.log('setting datea')
  // let message = (
  //   <span>
  //     Already have an account?{" "}
  //     <u onClick={() => setLoginType(true)}>Login here</u>
  //   </span>
  // );
  // if (isLogin) {
  //   message = (
  //     <span>
  //       New to Meraki? <u onClick={() => setLoginType(false)}>Sign Up here</u>
  //     </span>
  //   );
  // }

  function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let { id_token: idToken } = googleUser.getAuthResponse()
    const googleData = {
      id: profile.getId(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
      idToken
    }
    // let's send the data to our backend.
    dispatch(userActions.onUserSignin(googleData))
  }

  const onGoogleLoginFail = (errorResponse) => {
    console.log('onGooog', errorResponse)
  }

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Card className={classes.card}>
          <CardContent>
            <LockOpenTwoToneIcon />
          </CardContent>
          <CardActions className={classes.cardContent}>
            <Button className={classes.button}>
            {loading
              ? 'Sending data to backend'
              : <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={onSignIn}
                    onFailure={onGoogleLoginFail}
                    cookiePolicy={'single_host_origin'}
                  />
            }
            </Button>
            {/* <Typography className={classes.swap}>{message}</Typography> */}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Login;

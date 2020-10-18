import React, { useState } from "react";
import LockOpenTwoToneIcon from "@material-ui/icons/LockOpenTwoTone";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";

function Login() {
  const classes = useStyles();
  const [isLogin, setLoginType] = useState(false);
  let message = (
    <span>
      Already have an account?{" "}
      <u onClick={() => setLoginType(true)}>Login here</u>
    </span>
  );
  if (isLogin) {
    message = (
      <span>
        New to Meraki? <u onClick={() => setLoginType(false)}>Sign Up here</u>
      </span>
    );
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
              <Typography variant="button" className={classes.loginText}>
                {isLogin ? "Login" : "Let's get started"}
              </Typography>
            </Button>
            <Typography className={classes.swap}>{message}</Typography>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Login;

import React, { useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { METHODS } from "../../services/api";
import { toast } from "react-toastify";
import FormHelperText from "@mui/material/FormHelperText";
import { useHistory } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
// import "./style.scss";

const LoginPage = () => {
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState("");

  const [formData, setFormData] = useState({
    login_id: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    login_id: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/users/login/meraki_student`,
      method: METHODS.POST,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        student_id: formData.login_id,
        password: formData.password,
      },
    })
      .then((data) => {
        if (data.data.error) throw new Error(data.data.message);

        setLoading(false);
        toast.success("Student Added Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        history.push(interpolatePath(PATHS.NEW_USER_DASHBOARD));
      })
      .catch((e) => {
        setLoading(false);
        setErrorData(e.message);
        setError(true);
      });

    // const newErrors = {};
    // let isValid = true;

    // if (formData.login_id.trim() !== "admin") {
    //   newErrors.login_id = "Username is incorrect";
    //   isValid = false;
    // }

    // if (formData.password.trim() !== "1234") {
    //   newErrors.password = "Password is incorrect";
    //   isValid = false;
    // }

    // if (!isValid) {
    //   setErrors(newErrors);
    //   return;
    // }
  };
  if (errorData) {
    return (
      <>
        {error && (
          <FormHelperText error={true} id="component-error-text">
            {errorData}
          </FormHelperText>
        )}
      </>
    );
  }
  return (
    <>
      <Container maxWidth="lg">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            padding: "20px 0",
          }}
        >
          <div
            style={{
              height: "1px",
              width: "40%",
              backgroundColor: "gray",
            }}
          ></div>
          <Typography
            variant="body1"
            style={{
              fontSize: "12px",
              color: "black",
              whiteSpace: "nowrap",
              backgroundColor: "white",
            }}
          >
            or login with Student ID and Password
          </Typography>
          <div
            style={{
              height: "1px",
              width: "40%",
              backgroundColor: "gray",
            }}
          ></div>
        </div>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: "20px" }}>
            <TextField
              fullWidth
              id="login_id"
              name="login_id"
              placeholder="Student ID"
              value={formData.login_id}
              onChange={handleChange}
              error={!!errors.login_id}
              helperText={errors.login_id}
              InputProps={{
                sx: {
                  borderRadius: "8px",
                  padding: "25px 2px",
                  height: "40px",
                },
              }}
              required
            />
          </Box>

          <Box sx={{ marginBottom: "20px" }}>
            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                sx: {
                  borderRadius: "8px",
                  padding: "25px 2px",
                  height: "40px",
                },
              }}
              required
            />
          </Box>

          <Grid container justifyContent="center" sx={{ mb: 3 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                borderRadius: "10px",
                padding: "18px",
                width: "100%",
              }}
            >
              Login
            </Button>
          </Grid>

          <Grid container justifyContent="left" sx={{ mb: 4 }}>
            <Typography variant="subtitle1" fontSize="14px">
              Forgot password or Don't have login details?
            </Typography>
            <Typography variant="body1" fontSize="13px" textAlign="left">
              Please connect with your teacher to get the Student ID and
              Password if you cannot login with Google
            </Typography>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default LoginPage;

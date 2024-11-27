import React from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { breakpoints } from "../../theme/constant";
import { useMediaQuery } from "@mui/material";

const StudentLogin = ({
  handleSubmit,
  loading,
  errors,
  handleChange,
  formData,
  handlePasswordVisibility,
}) => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  return (
    <>
      <Typography
        variant="subtitle1"
        fontSize="12px"
        textAlign="center"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "20px 0",
          textAlign: isActive ? "center" : "left",
        }}
      >
        <Box
          sx={{
            height: "1px",
            width: isActive ? "80%" : "40%",
            backgroundColor: "gray",
          }}
        />
        <Typography
          variant="body1"
          sx={{
            fontSize: "12px",
            color: "black",
            whiteSpace: "nowrap",
            backgroundColor: "white",
          }}
        >
          or login with Username and Password
        </Typography>
        <Box
          sx={{
            height: "1px",
            width: isActive ? "80%" : "40%",
            backgroundColor: "gray",
          }}
        />
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            marginBottom: errors.username ? "40px" : "25px",
            marginBlock: "10px",
          }}
        >
          <TextField
            fullWidth
            id="username"
            name="username"
            placeholder="Username"
            label={"Username"}
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            helperText={errors.username}
            InputProps={{
              sx: {
                borderRadius: "8px",
                padding: "25px 2px",
                height: "56px",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            marginBottom: errors.password ? "40px" : "25px",
            marginBlock: "25px",
          }}
        >
          <TextField
            fullWidth
            id="password"
            name="password"
            type={formData.showPassword ? "text" : "password"}
            placeholder="Password"
            label={"Password"}
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password}
            InputProps={{
              sx: {
                borderRadius: "8px",
                padding: "25px 2px",
                height: "56px",
                paddingRight: "15px",
              },
              endAdornment: (
                <InputAdornment position="end">
                  {formData.password.length > 0 && (
                    <IconButton onClick={handlePasswordVisibility} edge="end">
                      {formData.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Grid container justifyContent="center" sx={{ mb: 3 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
          >
            Login
          </Button>
        </Grid>

        <Grid container justifyContent="left" sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontSize="12px">
            Forgot password or Don't have login details?
          </Typography>
          <Typography variant="body1" fontSize="13px" textAlign="left">
            Please connect with your teacher to get the Username and Password
          </Typography>
        </Grid>
      </form>
    </>
  );
};

export default StudentLogin;

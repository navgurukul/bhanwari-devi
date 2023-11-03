import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { METHODS } from "../../../services/api";
import { useSelector, useDispatch } from "react-redux";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Avatar from "@mui/material/Avatar";
import img1 from "../assest/c4ca-profile-icon.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 588,
    height: 188,
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
  },
  leftSide: {
    textAlign: "left",
  },
  rightSide: {
    textAlign: "right",
  },
  c4ca: {
    fontSize: 4,
    fontWeight: "bold",
  },
  downloadLink: {
    textAlign: "center",
    marginTop: 16,
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
  },
}));

function C4CAProfile({ teacherData }) {
  const classes = useStyles();
  const user = useSelector(({ User }) => User);

  console.log(teacherData);
  // Create a new Date object to get the current date
  const today = new Date();

  // Define an array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the day, month, and year
  const day = today.getDate();
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();

  // Create the formatted date string
  const formattedDate = `${day} ${month} ${year}`;
  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        width={"60px"}
        marginTop={"144px"}
        marginLeft={"100px"}
      >
        {/* <img
          alt={userData.name}
          style={{
            height: 100,
            width: 100,
            borderRadius: "50%",
          }}
          src={
            
          }
        /> */}
        <Avatar
          sx={{
            color: "black",
            width: "50px",
            height: "50px",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          SR
        </Avatar>
        <Typography
          variant="h6"
          style={{ color: "#000000", marginTop: "2rem" }}
        >
          {teacherData?.data?.team_name}
          SkyRider
        </Typography>
        <Typography
          variant="body1"
          style={{ color: "#6D6D6D", marginTop: "32px" }}
        >
          Note: If any details are incorrect, please reach out to your teacher
          to have them corrected
        </Typography>
      </Grid>
      <Box
        width={"588px"}
        marginTop={"144px"}
        marginLeft={"100px"}
        gap={"36PX"}
      >
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h6"
            style={{ color: "#000000", marginBottom: "1rem" }}
          >
            My Certificate
          </Typography>
          <Box>
            <Paper
              className={classes.container}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box className={classes.leftSide}>
                <Box className={classes.flex} marginLeft={"-3rem"}>
                  <img src={img1} alt="c4ca" />
                  <Typography variant="subtitle1">C4CA</Typography>
                </Box>
                <br /> {/* Add a line break here */}
                <Box
                  className={classes.downloadLink}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    marginLeft: "0.5rem",
                  }}
                >
                  <Box color="green">
                    <DownloadIcon />
                  </Box>
                  <Link href="#"> Download Certificate</Link>
                </Box>
              </Box>
              <Box
                className={classes.flex}
                textAlign="right"
                marginTop={"-4rem"}
              >
                <Box color="green">
                  <CheckCircleIcon />
                </Box>
                <Typography variant="h6">{formattedDate}</Typography>
              </Box>
            </Paper>
          </Box>
          <Typography
            variant="h6"
            mt={"3rem"}
            mb={"1rem"}
            style={{ color: "#000000" }}
          >
            School Details
          </Typography>
          <hr style={{ width: "620px" }} />
          <Box style={{ display: "flex", gap: "2rem" }}>
            <Typography
              variant="h6"
              mt={"1rem"}
              fontWeight={"lighter"}
              style={{ color: "#708090" }}
            >
              School Name
            </Typography>
            <Typography
              variant="body1"
              mt={"1rem"}
              // style={{ color: "#708090" }}
            >
              {teacherData?.data?.school}
            </Typography>
          </Box>
          <Box style={{ display: "flex", gap: "6rem" }}>
            <Typography variant="h6" mt={"1rem"} style={{ color: "#708090" }}>
              District
            </Typography>
            <Typography
              variant="body1"
              mt={"1rem"}
              // style={{ color: "#708090" }}
            >
              {teacherData?.data?.district}
            </Typography>
          </Box>
          <Box style={{ display: "flex", gap: "7rem" }}>
            <Typography
              variant="h6"
              mt={"1rem"}
              fontWeight={"lighter"}
              style={{ color: "#708090" }}
            >
              State
            </Typography>
            <Typography
              variant="body1"
              mt={"1rem"}
              fontWeight={"lighter"}
              // style={{ color: "#708090" }}
            >
              {teacherData?.data?.state}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            style={{ color: "#000000", marginTop: "2rem" }}
          >
            Team Members
          </Typography>
          <hr style={{ width: "620px" }} />

          {teacherData?.data?.team_members?.map((item, index) => (
            <>
              <Grid container spacing={3}>
                <Grid item>
                  <Typography
                    variant="h6"
                    ml={"-1.5rem"}
                    mt={"1rem"}
                    fontWeight={"lighter"}
                    // style={{ color: "light" }}
                    style={{ color: "#708090" }}
                  >
                    student {index + 1}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    mt={"1rem"}
                    ml={"1rem"}
                    fontWeight={"lighter"}
                    style={{ color: "light" }}
                  >
                    {item?.name}
                  </Typography>
                </Grid>
                <Grid item style={{ marginLeft: "auto" }}>
                  <Typography
                    variant="h6"
                    ml={"-1.5rem"}
                    mt={"1rem"}
                    fontWeight={"lighter"}
                    style={{ color: "light" }}
                  >
                    Class {item?.class}
                  </Typography>
                </Grid>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
}
export default C4CAProfile;

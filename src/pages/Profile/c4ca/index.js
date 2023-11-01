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
    fontSize: 24,
    fontWeight: "bold",
  },
  downloadLink: {
    textAlign: "center",
    marginTop: 16,
  },
}));

function C4CAProfile({ teacherData }) {
  const classes = useStyles();
  const user = useSelector(({ User }) => User);

  console.log(teacherData);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4} marginLeft={4}>
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
        <Typography variant="h6" style={{ color: "#000000" }}>
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
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" style={{ color: "#000000" }}>
          My Certificate
        </Typography>
        <Box>
          <Paper className={classes.container}>
            <div className={classes.leftSide}>
              <Typography variant="h4" className={classes.c4ca}>
                c4ca
              </Typography>
              <br /> {/* Add a line break here */}
              <div className={classes.downloadLink}>
                <Link href="#">Download Certificate</Link>
              </div>
            </div>
            <div className={classes.rightSide}>
              <Typography variant="h6">{formattedDate}</Typography>
            </div>
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
        <Container
          maxWidth="sm"
          style={{
            width: "588px",
            height: "188px",
            gap: "16px",
          }}
        >
          <Typography
            variant="h6"
            ml={"-1.5rem"}
            mt={"1rem"}
            fontWeight={"lighter"}
            style={{ color: "#708090" }}
          >
            School Name {teacherData?.data?.school}
          </Typography>

          <Typography
            variant="h6"
            ml={"-1.5rem"}
            mt={"1rem"}
            fontWeight={"lighter"}
            style={{ color: "#708090" }}
          >
            District&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {teacherData?.data?.district}
          </Typography>
          <Typography
            variant="h6"
            ml={"-1.5rem"}
            mt={"1rem"}
            fontWeight={"lighter"}
            style={{ color: "#D1D5DB" }}
          >
            State&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {teacherData?.data?.state}
          </Typography>
        </Container>
        <Typography variant="h6" style={{ color: "#000000" }}>
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
                  style={{ color: "light" }}
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
    </Grid>
  );
}
export default C4CAProfile;

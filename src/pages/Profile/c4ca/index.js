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

function CertificateContainer() {
  const classes = useStyles();
  const [teacherData, setTeacherData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Replace 'YOUR_TEACHER_ID' with the specific teacher ID you want to fetch
    // const teacherId = 83;

    // Replace with the API endpoint URL
    const apiUrl = "https://merd-api.merakilearn.org/c4ca/team/83";

    axios
      .get(apiUrl)
      .then((response) => {
        setTeacherData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container
      style={{
        width: "588px",
        marginTop: "144px",
        marginLeft: "528px",
        gap: "36px",
      }}
    >
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
          School Name {JSON.stringify(teacherData.data.school)}
        </Typography>

        <Typography
          variant="h6"
          ml={"-1.5rem"}
          mt={"1rem"}
          fontWeight={"lighter"}
          style={{ color: "#708090" }}
        >
          District&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {JSON.stringify(teacherData.data.district)}
        </Typography>
        <Typography
          variant="h6"
          ml={"-1.5rem"}
          mt={"1rem"}
          fontWeight={"lighter"}
          style={{ color: "#D1D5DB" }}
        >
          State&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {JSON.stringify(teacherData.data.state)}
        </Typography>
      </Container>
      <Typography variant="h6" style={{ color: "#000000" }}>
        Team Members
      </Typography>
      <hr style={{ width: "620px" }} />
      {
        <Container
          maxWidth="sm"
          style={{
            width: "588px",
            height: "188px",
            gap: "16px",
          }}
        >
          {teacherData.data.team_members.map((item, index) => (
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
                    {item.name}
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
                    Class {item.class}
                  </Typography>
                </Grid>
              </Grid>
            </>
          ))}
        </Container>
      }
    </Container>
  );
}
export default CertificateContainer;

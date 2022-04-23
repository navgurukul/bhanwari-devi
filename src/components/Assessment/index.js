import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Paper, Button } from "@mui/material";
import useStyles from "./styles";

import { set } from "date-fns";
import { ClassNames } from "@emotion/react";

function Assessment() {
  const classes = useStyles();
  const [answer, setAnswer] = useState();
  const options = ["A", "B", "C", "D"];
  const code = true;
  return (
    <Container maxWidth="sm" sx={{ align: "center", mb: "32px" }}>
      {/* <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}> */}

      {code ? (
        <Box align="center">
          <Typography variant="h6" align="center">
            Find the Output
          </Typography>
          <Box
            sx={{
              mt: "32px",
              bgcolor: "#F7F7F7",
              height: "30vh",
              p: "16px 16px 22px 16px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6">Code</Typography>
          </Box>
        </Box>
      ) : (
        <Typography variant="h6">
          What is the output of 2 + 2 and 5 + 9?
        </Typography>
      )}

      <Box sx={{ mt: "32px" }}>
        {options.map((item) => {
          return (
            <Paper
              elevation={3}
              sx={{
                height: "59px",
                width: "544px",
                mb: "16px",
              }}
              className={answer === item && classes.option}
              onClick={() => setAnswer(item)}
            >
              <Typography variant="body1" sx={{ p: "16px" }}>
                {item}. Poonam
              </Typography>
            </Paper>
          );
        })}
      </Box>
      <Button
        variant="contained"
        sx={{ width: "256px", p: "8px 16px 8px 16px" }}
        color={answer ? "primary" : "disable"}
        align="center"
        // sx={{ align: "center" }}
        // bgcolor="#91C78F"
        // color="warning"
      >
        Submit
      </Button>
      {/* </Box> */}
    </Container>
  );
}

export default Assessment;

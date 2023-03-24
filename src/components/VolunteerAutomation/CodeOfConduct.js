import React, { useEffect } from "react";
import { Typography, Container, Box } from "@mui/material";
import ExternalLink from "../common/ExternalLink";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import useStyles from "./styles";

function CodeOfConduct({ setDisable }) {
  const classes = useStyles();

  useEffect(() => {
    setDisable(false);
  }, []);

  return (
    <Container sx={{ mt: 6 }} maxWidth="lg">
      <Container maxWidth="sm" mb={3} align="left">
        <Typography variant="h6" mb={2}>
          Code of Conduct
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          We work with girls (primarily minors) from low-income families. Hence,
          as a volunteer, you must understand and abide by the code of conduct
          and privacy policy.
        </Typography>
        <Box className={classes.displayIcon} mb={2}>
          <ArrowRightAltIcon />
          <Typography variant="body1" className={classes.TextContent}>
            Video during calls is optional. If enabling video, please maintain
            an appropriate dress standard.
          </Typography>
        </Box>
        <Box className={classes.displayIcon} mb={2}>
          <ArrowRightAltIcon />
          <Typography
            variant="body1"
            className={classes.TextContent}
            Typography
          >
            Please keep the interactions polite. No one should convey abusive
            language and irrelevant material in speech or writing.
          </Typography>
        </Box>
        <Box className={classes.displayIcon} mb={2}>
          <ArrowRightAltIcon />
          <Typography
            variant="body1"
            className={classes.TextContent}
            Typography
          >
            We respect your and the student's privacy. Please do not share/ask
            for personal contact details.
          </Typography>
        </Box>
        <Box className={classes.displayIcon} mb={2}>
          <ArrowRightAltIcon />
          <Typography
            variant="body1"
            className={classes.TextContent}
            Typography
          >
            Raise any concerns you witness to the Meraki team and treat all
            students fairly and equally.
          </Typography>
        </Box>
        <Typography variant="body1" className={classes.TextContent} mb={2}>
          The above are the most important points to keep in mind. However,
          please feel free to read our detailed{" "}
          <ExternalLink
            className={classes.link}
            href="https://www.merakilearn.org/course-content/miscellaneous/1/0"
          >
            <span style={{ color: "#48a145" }}>Volunteering with Meraki</span>
          </ExternalLink>{" "}
          To proceed to next step
        </Typography>
      </Container>
    </Container>
  );
}

export default CodeOfConduct;

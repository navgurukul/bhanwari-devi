import React, { useEffect } from "react";
import { Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
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
          We work with girls (mostly minor) from low income families. Hence, it
          is important that you as a volunteer understand and abide by the code
          of conduct and privacy policy
        </Typography>
        <Box className={classes.displayIcon} mb={2}>
          <ArrowRightAltIcon />
          <Typography variant="body1" className={classes.TextContent}>
            Video during calls are optional. If enabling video, please maintain
            an appropriate dress standard
          </Typography>
        </Box>
        <Box className={classes.displayIcon} mb={2}>
          <ArrowRightAltIcon />
          <Typography
            variant="body1"
            className={classes.TextContent}
            Typography
          >
            Please keep the interactions polite. No abusive language and no
            irrelevant materials should be shared in speech or writing
          </Typography>
        </Box>
        <Box className={classes.displayIcon} mb={2}>
          <ArrowRightAltIcon />
          <Typography
            variant="body1"
            className={classes.TextContent}
            Typography
          >
            We respect yours and students privacy. Please do not share/ask for
            personal contact details or social media handles
          </Typography>
        </Box>
        <Box className={classes.displayIcon} mb={2}>
          <ArrowRightAltIcon />
          <Typography
            variant="body1"
            className={classes.TextContent}
            Typography
          >
            Raise any concerns witnessed by you to the Meraki team and treat all
            the students with fairness and dignity
          </Typography>
        </Box>
        <Typography variant="body1" className={classes.TextContent} mb={2}>
          {/* <span> */}
          The above are the most important points to keep in mind. However,
          please feel free to read our detailed{" "}
          {/* <Link
            to="https://www.merakilearn.org/course-content/miscellaneous/218/4"
            target="_blank"
            ml={1}
          >
            Code of Conduct
          </Link> */}
          <ExternalLink
            className={classes.link}
            href="https://www.merakilearn.org/course-content/miscellaneous/218/4"
          >
            {/* <Typography color="primary"> */}
            {/* Code of Conduct  */}
            Volunteering with Meraki
            {/* </Typography> */}
          </ExternalLink>{" "}
          To proceed to next step
          {/* </span> */}
        </Typography>
      </Container>
    </Container>
  );
}

export default CodeOfConduct;

import React from "react";
import { Typography, Container, Grid, Button, Box, Link } from "@mui/material";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function CodeOfConduct() {
  return (
    <Container maxWidth="lg" align="center">
      <Grid maxWidth={550} mb={3} align="left">
        <Typography variant="h6" mb={2}>
          Code of Conduct
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          We work with girls (mostly minor) from low income families. Hence, it
          is important that you as a volunteer understand and abide by code of
          conduct and privacy policy
        </Typography>
        <Box sx={{ display: "flex" }} mb={2}>
          <ArrowRightAltIcon />
          <Typography variant="body1" sx={{ paddingLeft: "10px" }}>
            Video during calls are optional. If enabling video, please maintain
            an appropriate dress standard
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }} mb={2}>
          <ArrowRightAltIcon />
          <Typography variant="body1" sx={{ paddingLeft: "10px" }} Typography>
            Please keep the interactions polite. No abusive language and
            irrelevant material should be shared in speech or writing
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }} mb={2}>
          <ArrowRightAltIcon />
          <Typography variant="body1" sx={{ paddingLeft: "10px" }} Typography>
            We respect your and students privacy. Please do not share/ask for
            personal contact details
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }} mb={2}>
          <ArrowRightAltIcon />
          <Typography variant="body1" sx={{ paddingLeft: "10px" }} Typography>
            Raise any concerns witnessed by you to the Meraki team and treat all
            the students with fairness and dignity
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ paddingLeft: "10px" }} mb={2}>
          The above are the most important points to keep in mind. However,
          please feel free to read our detailed
          <Link target="_blank" ml={1}>
            Code of Conduct
          </Link>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="text"
            startIcon={<ArrowBackIosIcon />}
            ml={2}
            sx={{
              color: "#6D6D6D",
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIosIcon />}
          >
            Next Step
          </Button>
        </Box>
      </Grid>
    </Container>
  );
}

export default CodeOfConduct;

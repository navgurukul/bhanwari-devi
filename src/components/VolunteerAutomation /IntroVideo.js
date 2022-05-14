import React from "react";
import { Typography, Container, Box, Button, Card } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function IntroVideo() {
  return (
    <Container maxWidth="lg" align="center">
      <Container maxWidth="sm" mb={3}>
        <Typography variant="h6" align="left" mb={2}>
          Our teaching philosophy
        </Typography>
        <Card mb={2}>
          <CardActionArea>
            <Container maxWidth="sm">
              <CardMedia
                component="iframe"
                maxWidth=""
                image="https://www.youtube.com/embed/muuK4SpRR5M"
              />
            </Container>
          </CardActionArea>
        </Card>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
            marginTop: "20px",
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
      </Container>
    </Container>
  );
}

export default IntroVideo;

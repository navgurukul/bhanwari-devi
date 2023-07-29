import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import ExternalLink from "../../components/common/ExternalLink";

function SectionSix({ isActive }) {
  return (
    <Container
      sx={{ mt: isActive ? 3 : 6, mb: isActive ? 3 : 6 }}
      maxWidth="sm"
    >
      <Typography
        variant="h5"
        component="h6"
        align="center"
        color="textPrimary"
      >
        Have Questions?
      </Typography>
      <Grid
        marginTop="1px"
        display={isActive && "block"}
        container
        spacing={4}
        align="center"
        justifyContent="center"
      >
        <Grid item sm={isActive && 12}>
          <ExternalLink
            style={{
              textDecoration: "none",
              color: "#48a145",
              fontStyle: "normal",
            }}
            href="mailto:team@meraki.org"
          >
            <img
              // className={classes.playstoreImg}
              src={require("./assets/Email.svg")}
              alt="Google Playstore Icon"
              height="32px !important"
              width="32px !important"
            />

            <Typography variant="subtitle1">team@meraki.org</Typography>
          </ExternalLink>
        </Grid>
        <Grid item sm={isActive && 12}>
          <ExternalLink
            style={{
              textDecoration: "none",
              color: "#48a145",
              fontStyle: "normal",
            }}
            href="https://wa.me/918891300300"
          >
            <img
              // className={classes.playstoreImg}
              src={require("./assets/whatsapp.svg")}
              alt="Google Playstore Icon"
              height="32px"
              width="32px"
            />
            <Typography variant="subtitle1"> +91 8891300300</Typography>
          </ExternalLink>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SectionSix;

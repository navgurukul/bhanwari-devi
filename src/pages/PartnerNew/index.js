import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Button,
  Stack,
} from "@mui/material";

function NewPartner() {
  return (
    <Container maxWidth="lg">
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" gutterBottom>
          Our Partners
          {/* <hr color="primary" className={classes.partnerHrline} /> */}
        </Typography>

        <Typography variant="body2" align="center" paragraph>
          Meraki has partnered with individual schools, NGOs and state
          governments to provide students from low income families a step in the
          door of tech industry. Do you work with students that want to explore
          the world of programming? If so, look no further.
        </Typography>
      </Container>
    </Container>
  );
}

export default NewPartner;

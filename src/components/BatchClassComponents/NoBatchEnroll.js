import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
function NoBatchEnroll() {
  return (
    <>
      <Box mt={2} maxWidth={500} align="right" mb={5}>
        <Card>
          <CardContent align="left">
            <Typography variant="h6">
              Not seeing the batch to enroll?
            </Typography>
            <Typography variant="body1" mt={2}>
              Usually, it takes one day for the batch to show here once a
              partner’s students are onboarded. Please go ahead and take a look
              at the course content in the meantime.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default NoBatchEnroll;

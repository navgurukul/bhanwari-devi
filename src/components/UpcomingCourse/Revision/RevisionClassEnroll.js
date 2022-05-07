import React from "react";
import { Container, Typography } from "@mui/material";
import { CardContent, Card, Button } from "@mui/material";
import { Box } from "@mui/system";
import useStyles from "../styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function RevisionClassEnroll() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Box align="right" mt={1} maxWidth={350} mb={10}>
        <Card elevation={2} pl={10}>
          <CardContent>
            <Typography gutterBottom variant="subtitle1" align="start">
              Missed the class or need to revise? Enroll in a class from another
              batch
            </Typography>
            <Box display="flex" justifyContent="start">
              <FormControl>
                <RadioGroup>
                  <FormControlLabel
                    sx={{ fontWeight: 20 }}
                    value="Ankit_19SEP2"
                    control={<Radio />}
                    // you can put your value using {} <- this
                    label="20 Sep 21, 4 PM - 5 PM"
                  />
                  <FormControlLabel
                    value="Ankit_19SEP21"
                    control={<Radio />}
                    label="20 Sep 21, 4 PM - 5 PM"
                  />
                  <FormControlLabel
                    value="Ankit_19SEP1"
                    control={<Radio />}
                    label="20 Sep 21, 4 PM - 5 PM"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Button variant="contained" fullWidth>
              Enroll
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default RevisionClassEnroll;

import React, { useState } from "react";
import { Container, Box, Grid, Typography } from "@mui/material";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ExternalLink from "../../../components/common/ExternalLink";
import AdmissionForm from "./AdmissionForm";
import AdmissionVideo from "./AdmissionVideo";

function Admission(props) {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const [mobile, setMobile] = useState("");

  const partnerIdFromOpportunity =
    props.location.state && props.location.state.partnerId;

  return (
    <>
      <Container
        maxWidth="lg"
        className={
          isActive ? classes.admitionContaine1 : classes.admitionContainer
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "spaced-center",
            alignItems: "spaced-evenly",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              minWidth: "50%",
            }}
          >
            <AdmissionVideo />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "50%",
            }}
          >
            <AdmissionForm
              partnerIdFromOpportunity={partnerIdFromOpportunity}
            />
            <Grid
              container
              className={classes.admitionSpacing}
              mt={isActive ? "32px" : "47px"}
            >
              <Grid item xs={12} sm={12} md={6}>
                <Box component="form" sx={{ display: "grid", gap: 2.5 }}>
                  <Typography variant="h6">Check Test Result</Typography>
                  <TextField
                    label="Mobile Number"
                    type="number"
                    pattern="^[0-9]{10}$"
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                    value={mobile}
                    variant={isActive ? "standard" : "outlined"}
                    required
                  />
                  <Button variant="contained" color="primary">
                    <ExternalLink
                      href={`${process.env.REACT_APP_ADMISSIONS_URL}status/${mobile}`}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Check Result
                    </ExternalLink>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Admission;

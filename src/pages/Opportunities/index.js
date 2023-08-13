import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import axios from "axios";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import { breakpoints } from "../../theme/constant";

import { Container, Typography, Grid, useMediaQuery } from "@mui/material";
import AdmissionOpportunityCard from "./AdmissionOpportunityCard";
import GrantsHeading from "./GrantsHeading";

function Opportunities() {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const [partner, setPartner] = useState([]);
  const user = useSelector(({ User }) => User);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners`,
      headers: {
        accept: "application/json",
        Authorization: user.data ? user.data.token : "",
      },
    }).then((res) => {
      setPartner(res.data.partners);
    });
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          columnSpacing={2}
          mt={isActive ? 4 : 8}
          mb={!isActive && 4}
        >
          <Grid item xs={12}>
            <Typography variant="h5">
              Curated list of opportunities to skyrocket your career
            </Typography>
            <Grid className={classes.section_Heading}>
              <Typography variant="h6">Admission Opportunities</Typography>
            </Grid>
            <Grid container>
              <AdmissionOpportunityCard isActive={isActive} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <GrantsHeading isActive={isActive} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Opportunities;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import PartnerCard from "./PartnerCard";
import useStyles from "./Styles";

const OurPartner = () => {
  const classes = useStyles();
  const [partner, setPartner] = useState([]);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    axios
      .get(
        "https://navgurukul.github.io/tarabai-shinde/data/meraki_partners.json"
      )
      .then((response) => {
        setPartner(response.data);
      });
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ py: "32px", my: !isActive && "32px" }}>
        <Grid container md={12} spacing={{ xs: 4, sm: 4 }}>
          <Grid item xs={12} sm={7} md={7}>
            {/* ... (rest of the code remains the same) */}
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            {/* ... (rest of the code remains the same) */}
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth={false} className={classes.containerColor}>
        <Container>
          <Grid
            md={12}
            container
            columnSpacing={{ xs: 2, sm: 4 }}
            paddingY={isActive ? 4 : 8}
          >
            <Grid item xs={12} sm={6} md={6}>
              <img src={Image} className={classes.image} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} spacing={4}>
              {/* ... (rest of the code remains the same) */}
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Container sx={{ mt: 8, p: 0 }}>
        <Typography variant="h5" align="center" mb={isActive ? 2 : 4}>
          Partner List{" "}
        </Typography>
        <Grid container spacing={isActive ? 2 : 4} pb={isActive ? 2 : 4}>
          {Object.keys(partner).map((item) => {
            return (
              <Grid item xs={12} sm={3} md={3} key={item}>
                <PartnerCard partnerData={partner[item]} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default OurPartner;

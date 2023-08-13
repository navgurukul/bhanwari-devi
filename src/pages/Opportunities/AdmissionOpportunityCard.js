import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useStyles from "./styles";
import ExternalLink from "../../components/common/ExternalLink";

function AdmissionOpportunityCard({ isActive }) {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          elevation={2}
          className={isActive ? classes.mobileCards : classes.cards}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={7} sm={9} md={9} mr={{ xs: 5, sm: 0 }}>
                <Typography variant="subtitle1">
                  NavGurukul One-Year Residential Programmme
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                style={{ display: "flex", justifyContent: "right" }}
              >
                <Typography
                  variant="body2"
                  bgcolor="secondary.main"
                  sx={{
                    height: "24px",
                    py: "3px",
                    px: 1,
                    borderRadius: "16px",
                  }}
                >
                  Featured
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body1" mt="16px">
              Eligibility: Basic coding knowledge
            </Typography>
          </CardContent>
          <CardActions>
            <Grid className={classes.card_button}>
              <ExternalLink
                href="https://admissions.navgurukul.org/"
                Curated
                list
                of
                opportunities
                to
                skyrocket
                your
                career
                style={{ textDecoration: "none" }}
              >
                <Button endIcon={<ArrowForwardIosIcon />} mr={1}>
                  Apply Now
                </Button>
              </ExternalLink>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} pt={{ xs: 2, sm: 0 }}>
        <Card
          elevation={2}
          className={isActive ? classes.mobileCards : classes.cards}
        >
          <CardContent>
            <Typography variant="subtitle1">HyperVerge Fellowships</Typography>
            <Typography variant="body1" mt="16px">
              Eligibility: Basic coding knowledge
            </Typography>
          </CardContent>
          <Grid
            className={classes.card_button}
            mt={{ xs: 0, sm: "27px" }}
            mr={2}
          >
            <CardActions>
              <ExternalLink
                href="https://apply.workable.com/hyperverge/j/BDA16E2E25/"
                style={{ textDecoration: "none" }}
              >
                <Button endIcon={<ArrowForwardIosIcon />}>Apply Now</Button>
              </ExternalLink>
            </CardActions>
          </Grid>
        </Card>
      </Grid>
    </>
  );
}

export default AdmissionOpportunityCard;

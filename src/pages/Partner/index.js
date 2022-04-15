import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import axios from "axios";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import IconButton from "@mui/material/IconButton";
import { PATHS } from "../../constant";

const Partner = () => {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const [partners, setPartners] = useState([]);

  useEffect(() => {
    axios({
      url: `https://anandpatel504.github.io/tarabai-shinde/data/meraki_partners.json`,
    }).then((res) => {
      setPartners(res.data);
    });
  }, []);
  return (
    <Container maxWidth="lg" className={classes.partnerTopspacing}>
      <Container maxWidth="sm">
        <Typography variant="h5" align="center">
          Our Partners
          <hr color="primary" className={classes.partnerHrline} />
        </Typography>
        <Typography
          variant="body2"
          align={!isActive ? "center" : "left"}
          paragraph
        >
          Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui
          esse pariatur duis deserunt mollit dolore cillum minim tempor enim.
          Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate
          aute id deserunt nisi.
        </Typography>
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            className={!isActive ? classes.partnerBtn : classes.partnerBtn1}
          >
            Join as a Partner
          </Button>
        </Grid>
      </Container>

      <Container
        className={
          !isActive ? classes.partnerContainer : classes.partnerContainer1
        }
      >
        <Grid container spacing={!isActive ? 4 : 2}>
          <Grid item xs={12} sm={6} md={6}>
            <img
              src="https://www.linkfluence.com/hs-fs/hubfs/Amazon%20FMCG.jpg?width=689&name=Amazon%20FMCG.jpg"
              alt="Amazon box Robot"
              className={classes.partnerImg}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Stack spacing={1}>
              <Stack direction="row">
                <Button
                  variant="contained"
                  color="warning"
                  sx={
                    !isActive
                      ? { borderRadius: 25, height: 34 }
                      : { borderRadius: 15, height: 25 }
                  }
                  size="small"
                >
                  featured
                </Button>
              </Stack>
              <Typography variant="subtitle1" gutterBottom>
                Amazon Future Engineer
              </Typography>
              <Typography variant="body2" paragraph>
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat
                nostrud irure ex duis ea quis id quis ad et. Sunt qui esse
                pariatur duis deserunt mollit dolore cillum minim tempor enim.
              </Typography>
              <Link
                to={PATHS.AFE}
                underline="hover"
                color="primary"
                align={!isActive ? "left" : "center"}
                className={classes.link}
              >
                Learn More
                <ChevronRightOutlinedIcon className={classes.partnerIcon} />
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Typography variant="h5" align="center">
        Partners List
        <hr color="primary" className={classes.partnerHrline} />
      </Typography>
      <Grid container spacing={4}>
        {Object.keys(partners).length ? (
          Object.keys(partners).map((item) => {
            return (
              <Grid item xs={12} sm={4} md={4}>
                <Card className={classes.partnerCard}>
                  <CardHeader
                    title={partners[item].Name}
                    titleTypographyProps={{ variant: "subtitle1" }}
                  />
                  <CardContent
                    className={
                      !isActive
                        ? classes.partnerCardContainer
                        : classes.partnerCardContainer1
                    }
                  >
                    <Typography variant="body1">
                      {partners[item].Description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {partners[item].Url ? (
                      <IconButton>
                        <Link href={partners[item].Url}>
                          <PublicIcon
                            variant="outlined"
                            fontSize="small"
                            className={classes.partnerIconSize}
                          />
                        </Link>
                      </IconButton>
                    ) : (
                      <></>
                    )}
                    {partners[item].LinkedinId ? (
                      <IconButton>
                        <Link href={partners[item].LinkedinId}>
                          <LinkedInIcon
                            variant="outlined"
                            fontSize="small"
                            className={classes.partnerIconSize}
                          />
                        </Link>
                      </IconButton>
                    ) : (
                      <></>
                    )}
                    {partners[item].TwitterId ? (
                      <IconButton>
                        <Link href={partners[item].TwitterId}>
                          <TwitterIcon
                            variant="outlined"
                            fontSize="small"
                            className={classes.partnerIconSize}
                          />
                        </Link>
                      </IconButton>
                    ) : (
                      <></>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        ) : (
          <></>
        )}
      </Grid>
    </Container>
  );
};
export default Partner;

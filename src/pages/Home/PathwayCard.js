import React from "react";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import { Typography, CardMedia, CardContent, Card, Box } from "@mui/material";

function PathwayCard({ id, name, description, logo, hover }) {
  const classes = useStyles();

  return (
    <Link
      to={
        id
          ? interpolatePath(PATHS.PATHWAY_COURSE, { pathwayId: id })
          : PATHS.MISCELLANEOUS_COURSE
      }
      className={classes.link}
      style={{ pointerEvents: hover === false && "none" }}>
      {hover ? (
        <Card
          elevation={2}
          className={hover ? classes.card : logo && classes.imageCard}>
          {logo && (
            <CardMedia
              component="img"
              src={
                logo.includes("https")
                  ? logo
                  : require("./assets/" + logo + ".svg")
              }
              alt={logo + "logo"}
            />
          )}
          <CardContent>
            <Typography
              pb={1}
              variant="subtitle1"
              align="center"
              component="div">
              {name}
            </Typography>
            <Typography variant="body1" align="center">
              {description}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box
          elevation={2}
          className={hover ? classes.card : logo && classes.imageCard}
          >
          {logo && (
            <CardMedia
              component="img"
              src={logo}
              // src={require("./assets/" + logo + ".svg")}
              alt={logo + "image"}
            />
          )}
          <CardContent>
            <Typography
              pb={1}
              variant="subtitle1"
              align="center"
              component="div">
              {name}
            </Typography>
            <Typography variant="body1" align="center">
              {description}
            </Typography>
          </CardContent>
        </Box>
      )}
    </Link>
  );
}
export default PathwayCard;

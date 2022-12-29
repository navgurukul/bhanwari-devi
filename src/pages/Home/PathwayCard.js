import React from "react";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import { Typography, CardMedia, CardContent, Card, Box } from "@mui/material";

function PathwayCard({ id, title, description, image, hover }) {
  const classes = useStyles();
  

  return (
    <Link
      to={
        id
          ? interpolatePath(PATHS.PATHWAY_COURSE, { pathwayId: id })
          : title === "Open Courses"
          ? PATHS.MISCELLANEOUS_COURSE
          : title === "Residential Programmes" && PATHS.RESIDENTIAL_COURSE
      }
      className={classes.link}
      style={{ pointerEvents: hover === false && "none" }}
    >
      {hover ? (
        <Card
          elevation={2}
          className={hover ? classes.card : image && classes.imageCard}
        >
          {image && (
            <CardMedia
              component="img"
              src={require("./assets/" + image + ".svg")}
              alt={image + "image"}
            />
          )}
          <CardContent>
            <Typography
              pb={1}
              variant="subtitle1"
              align="center"
              component="div"
            >
              {title}
            </Typography>
            <Typography variant="body1" align="center">
              {description}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box
          elevation={2}
          className={hover ? classes.card : image && classes.imageCard}
        >
          {image && (
            <CardMedia
              component="img"
              src={require("./assets/" + image + ".svg")}
              alt={image + "image"}
            />
          )}
          <CardContent>
            <Typography
              pb={1}
              variant="subtitle1"
              align="center"
              component="div"
            >
              {title}
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

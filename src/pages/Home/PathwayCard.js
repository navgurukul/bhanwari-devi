import React from "react";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import { Typography, CardMedia, CardContent, Card } from "@mui/material";

function PathwayCard({ id, title, description, image, hover }) {
  const classes = useStyles();
  return (
    <>
      {id || title === "Open Courses" || title === "Residential Programmes" ? (
        <Link
          to={
            id
              ? interpolatePath(PATHS.PATHWAY_COURSE, { pathwayId: id })
              : title === "Open Courses"
              ? PATHS.MISCELLANEOUS_COURSE
              : title === "Residential Programmes" && PATHS.RESIDENTIAL_COURSE
          }
          className={classes.link}
        >
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
                gutterBottom
                variant="h6"
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
        </Link>
      ) : (
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
              gutterBottom
              variant="h6"
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
      )}
    </>
  );
}
export default PathwayCard;

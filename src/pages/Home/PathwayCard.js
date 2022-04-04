import React from "react";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import { Typography, CardMedia, CardContent, Card } from "@mui/material";

function PathwayCard({ id, title, description, image }) {
  const classes = useStyles();
  return (
    <Link
      to={
        id
          ? interpolatePath(PATHS.PATHWAY_COURSE, { pathwayId: id })
          : title === "Residential"
          ? PATHS.RESIDENTIAL_COURSE
          : PATHS.MISCELLENEOUS_COURSE
      }
      className={classes.link}
    >
      <Card elevation={2} className={image && classes.card}>
        {image && (
          <CardMedia
            component="img"
            src={require("./assets/" + image + ".svg")}
            alt={image + "image"}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" align="center" component="div">
            {title}
          </Typography>
          <Typography variant="body1" align="center">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
export default PathwayCard;

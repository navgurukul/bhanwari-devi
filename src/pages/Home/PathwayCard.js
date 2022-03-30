import React from "react";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant";
import { Typography, CardMedia, CardContent, Card } from "@mui/material";

function PathwayCard({ id, title, description, image }) {
  const classes = useStyles();
  console.log("id", id);
  return (
    <Link to={id ? `pathway/${id}` : PATHS.COURSE} className={classes.link}>
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

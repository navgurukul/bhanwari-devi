import React from "react";
import useStyles from "./styles";
import { Typography, CardMedia, CardContent, Card } from "@mui/material";

function PathwayCard({ title, description, image }) {
  const classes = useStyles();
  return (
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
  );
}
export default PathwayCard;

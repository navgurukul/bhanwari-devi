import React from "react";
import { Link } from "react-router-dom";
import {
  Chip,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { PATHS, interpolatePath } from "../../constant";
import { format } from "../../common/date";
import DropOut from "../BatchClassComponents/DropOut";
import useStyles from "./styles";

export function DropOutIndividualComponent(props) {
  const classes = useStyles();

  const { title, id, pathway_name, open, setOpen, start_time, end_time } =
    props;
  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.cardDrop}>
        <Link
          className={classes.link}
          to={interpolatePath(PATHS.PATHWAY_COURSE, {
            pathwayId: 1,
          })}
        >
          <CardContent className={classes.cardContent}>
            <Chip
              variant="filled"
              label={pathway_name}
              sx={{
                background: "lemonchiffon",
              }}
              className={classes.cardChip}
            />
            <Typography variant="subtitle1" color="black">
              {title}
            </Typography>
            <Typography variant="body1" mt={2} className={classes.cardImg}>
              <Typography variant="body1" ml={1}>
                From {format(start_time, "dd MMM yy")} -{" "}
                {format(end_time, "dd MMM yy")}
              </Typography>
            </Typography>
          </CardContent>
        </Link>
        <CardActions>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            color="error"
          >
            Drop Out
          </Button>
        </CardActions>
      </Card>
      <DropOut
        open={open}
        close={close}
        title={title}
        id={id}
        unregister_all={true}
      />
    </>
  );
}

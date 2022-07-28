import {
  Chip,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { format } from "../../common/date";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import DropOut from "../BatchClassComponents/DropOut";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import useStyles from "./styles";

function DropOutIndividualComponent(props) {
  const classes = useStyles();
  const { title, id, pathway_name, open, setOpen, start_time, end_time } =
    props;
  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.cardDrop}>
        <CardContent className={classes.cardContent}>
          <Chip
            variant="filled"
            label={pathway_name}
            // backgroundColor="lemonchiffon"
            sx={{
              background: "lemonchiffon",
            }}
            className={classes.cardChip}
          />
          <Typography variant="subtitle1" color="black">
            {title}
          </Typography>
          <Typography variant="body1" mt={2} className={classes.cardImg}>
            {/* <img src={require("./assest/calendar.svg")} /> */}
            <Typography variant="body1" ml={1}>
              From {format(start_time, "dd MMM yy")} -{" "}
              {format(end_time, "dd MMM yy")}
            </Typography>
          </Typography>
        </CardContent>
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

function DropOutBatchesProfile() {
  const [dropOutBatches, setDropOutBatches] = useState(null);
  const [open, setOpen] = useState(false);

  const user = useSelector(({ User }) => User);
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/EnrolledBatches`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      if (res?.data?.length > 0) {
        setDropOutBatches(res.data);
      } else {
        setDropOutBatches(null);
      }
    });
  }, [open]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        margin: "40px 0",
      }}
    >
      <div>
        {dropOutBatches && (
          <Typography variant="subtitle1" color="gray">
            Enrolled Batches
          </Typography>
        )}
        <Grid container spacing={2}>
          {dropOutBatches?.map((dropOutBatch, index) => {
            return (
              <Grid item xs={12} sm={6} md={6}>
                <DropOutIndividualComponent
                  key={index}
                  title={dropOutBatch.title}
                  id={dropOutBatch.id}
                  start_time={dropOutBatch.start_time}
                  end_time={dropOutBatch.end_time}
                  pathway_name={dropOutBatch.pathway_name}
                  open={open}
                  setOpen={setOpen}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default DropOutBatchesProfile;

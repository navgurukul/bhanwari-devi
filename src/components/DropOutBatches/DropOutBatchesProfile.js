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
  const { title, id, pathway_name, open, setOpen, start_time, end_time } =
    props;
  const classes = useStyles();

  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <Card style={{ minWidth: "300px", margin: "15px" }}>
        <CardContent sx={{ height: "145px" }}>
          <Chip
            variant="filled"
            label={pathway_name}
            style={{
              background: "lemonchiffon",
              margin: "10px 0px",
              borderRadius: 90,
              height: 30,
            }}
            className={classes.dropChip}
          />
          <Typography variant="subtitle1" color="black">
            {title}
          </Typography>
          <Typography variant="body1" sx={{ display: "flex", mt: "15px" }}>
            <img
              src={require("./assest/calendar.svg")}
              style={{ marginRight: "10px" }}
            />
            From {format(start_time, "dd MMM yy")} -{" "}
            {format(end_time, "dd MMM yy")}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            sx={{ color: "red" }}
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
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const user = useSelector(({ User }) => User);
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}users/EnrolledBatches`,
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
        marginTop: isActive ? "130px" : "200px",
      }}
    >
      <div>
        {dropOutBatches && (
          <Typography
            variant="subtitle1"
            color="gray"
            style={{
              margin: "15px",
            }}
          >
            Enrolled Batches
          </Typography>
        )}
        <Grid container spacing={4}>
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

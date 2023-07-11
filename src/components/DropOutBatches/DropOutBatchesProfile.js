import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Typography, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { METHODS } from "../../services/api";
import { breakpoints } from "../../theme/constant";
import { DropOutIndividualComponent } from "./DropOutBatchIndividual";

function DropOutBatchesProfile() {
  const [dropOutBatches, setDropOutBatches] = useState(null);
  const [open, setOpen] = useState(false);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

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
        margin: isActive ? "16px 0px" : "40px 0",
      }}
    >
      <div>
        {dropOutBatches && (
          <Typography variant="subtitle1" color="text.secondary" ml={3}>
            Enrolled Batches
          </Typography>
        )}
        <Grid container>
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

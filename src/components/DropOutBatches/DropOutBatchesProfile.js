import { Button, Typography, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import DropOut from "../BatchClassComponents/DropOut";

function DropOutIndividualComponent(props) {
  const { title, id, pathway_name, open, setOpen } = props;
  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item>
          <div>
            <Typography variant="subtitle1" color="black">
              {title}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              style={{ margin: "10px 2px", borderRadius: 90, height: 30 }}
            >
              <Typography variant="body2">{pathway_name}</Typography>
            </Button>
          </div>
        </Grid>
        <Grid item>
          <div
            style={{
              margin: "10px 20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                fill="#BDBDBD"
              />
            </svg>
          </div>
        </Grid>
      </Grid>
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
  const [dropOutBatches, setDropOutBatches] = useState([]);
  const [open, setOpen] = useState(false);

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
      setDropOutBatches(res.data);
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
        <Typography variant="subtitle1" color="gray">
          Enrolled Batches
        </Typography>

        {dropOutBatches.map((dropOutBatch, index) => {
          return (
            <DropOutIndividualComponent
              key={index}
              title={dropOutBatch.title}
              id={dropOutBatch.id}
              pathway_name={dropOutBatch.pathway_name}
              open={open}
              setOpen={setOpen}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DropOutBatchesProfile;

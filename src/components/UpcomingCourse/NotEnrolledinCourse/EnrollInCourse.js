import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CardMedia, CardContent, Card, Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import useStyles from "../styles";
import { useSelector } from "react-redux";
import { breakpoints } from "../../../theme/constant";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { dateTimeFormat } from "../../../constant.js";
// import { Button } from "framework7-react";
import AlertDialog from "../dilog.js";
const NotEnrolledSvg = require("./notEnrolled.svg");
const CourseEnroll = (props) => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const { upcomingBatchesData } = props;
  const data = upcomingBatchesData.slice(0, 3).map((item) => {
    return {
      id: item.id,
      title: item.title,
      startTime: item.start_time,
      endTime: item.end_time,
    };
  });

  const [BatchToEnroll, setBatchToEnroll] = useState(data[0].id);
  const [selectedBatchToEnroll, setSelectedBatchToEnroll] = useState(data[0]);
  const { open, setOpen } = props;
  const close = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          flexWrap: "wrap",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <img src={NotEnrolledSvg} />

          <Box align="right" mt={1} maxWidth={350} mb={10}>
            <Card elevation={2} pl={10}>
              <CardContent>
                <Typography gutterBottom variant="body1" align="start">
                  It seems you are not part of a batch. Please enroll in a batch
                  to attend the live classes.
                </Typography>
                <Box display="flex" justifyContent="start">
                  <FormControl>
                    <RadioGroup value={selectedBatchToEnroll.id}>
                      {data.map((item) => {
                        return (
                          <>
                            <FormControlLabel
                              onClick={() => {
                                setSelectedBatchToEnroll(item);
                              }}
                              sx={{ fontWeight: 20 }}
                              value={item.id}
                              control={<Radio />}
                              label={<b>{item.title}</b>}
                            />
                            <Typography mb={2} ml={3}>
                              {dateTimeFormat(item.startTime).finalDate} -
                              {dateTimeFormat(item.endTime).finalDate}
                            </Typography>
                          </>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Enroll in {selectedBatchToEnroll.title}
                </Button>
                <AlertDialog
                  open={open}
                  title={selectedBatchToEnroll.title}
                  start_time={selectedBatchToEnroll.startTime}
                  end_time={selectedBatchToEnroll.endTime}
                  id={selectedBatchToEnroll.id}
                  close={close}
                />
              </CardContent>
            </Card>
          </Box>
        </div>
      </div>
    </>
  );
};
export default CourseEnroll;

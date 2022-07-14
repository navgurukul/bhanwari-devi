import React, { useEffect, useState } from "react";
import { CardContent, Card, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useStyles from "../styles";
import { useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { format } from "../../../common/date";
import AlertDialog from "../AlertDialog.js";

const NotEnrolledSvg = require("./notEnrolled.svg");
const CourseEnroll = (props) => {
  const classes = useStyles();
  const upcomingBatchesData = useSelector((state) => {
    return state.Pathways?.upcomingBatches?.data;
  });
  const { reloadContent } = props;
  const data = upcomingBatchesData?.slice(0, 3).map((item) => {
    return {
      id: item.id,
      title: item.title,
      startTime: item.start_time,
      endTime: item.end_time,
    };
  });
  const [selectedBatchToEnroll, setSelectedBatchToEnroll] = useState(data[0]);
  useEffect(() => {
    console.log(selectedBatchToEnroll);
  }, [selectedBatchToEnroll]);
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };
  return (
    <>
      <Box className={classes.EnrollInCourseBox1}>
        <Box className={classes.EnrollInCourseBox2}>
          <img src={NotEnrolledSvg} />
          <Box className={classes.EnrollInCourseCard}>
            <Card elevation={2} pl={10}>
              <CardContent>
                <Typography gutterBottom variant="body1" align="start">
                  It seems you are not part of a batch. Please enroll in a batch
                  to attend the live classes.
                </Typography>
                <Box className={classes.EnrollInCourseFormBox}>
                  <FormControl>
                    <RadioGroup value={selectedBatchToEnroll?.id}>
                      {data?.map((item) => {
                        return (
                          <>
                            <FormControlLabel
                              onClick={() => {
                                setSelectedBatchToEnroll(item);
                              }}
                              key={item.id}
                              value={item.id}
                              control={<Radio />}
                              label={<b>{item?.title}</b>}
                            />
                            <Typography mb={2} ml={3}>
                              {format(item?.startTime, "dd MMM yy")} -
                              {format(item?.endTime, "dd MMM yy")}
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
                  Enroll
                </Button>
                <AlertDialog
                  open={open}
                  title={selectedBatchToEnroll?.title}
                  start_time={selectedBatchToEnroll?.startTime}
                  end_time={selectedBatchToEnroll?.endTime}
                  id={selectedBatchToEnroll?.id}
                  close={close}
                  registerAll={true}
                  type="batch"
                  reloadContent={reloadContent}
                />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default CourseEnroll;

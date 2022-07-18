import React from "react";
import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { CardContent, Card, Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import useStyles from "../styles";
import { useSelector } from "react-redux";
import { METHODS } from "../../../services/api";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { format } from "../../../common/date";
import AlertDialog from "../AlertDialog";
import ExerciseBatchClass from "../ExerciseBatchClass/ExerciseBatchClass";
import DropOut from "../DropOut";
function RevisionClassEnroll(props) {
  const classes = useStyles();
  const user = useSelector(({ User }) => User);
  const { id } = props;
  const [revisionData, setRevisionData] = useState([]);
  const [revisionId, setRevisionId] = useState(null);
  const [open, setOpen] = useState(false);
  const close = () => [setOpen(false)];
  const [DataToEnroll, setDataToEnroll] = useState(null);
  const [dropOutOpen, setDropOutOpen] = useState(false);
  const closeDropOut = () => [setDropOutOpen(false)];
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}classes/${id}/revision`,
      headers: {
        accept: "application/json",
        Authorization: user?.data?.token,
      },
    }).then((res) => {
      // setUserEnrolledClasses(res.data);
      const data = res.data;
      console.log(data);
      setRevisionData(data);
      setDataToEnroll(data[0]);
    });
  }, [dropOutOpen, open]);
  return (
    <Container mt={2} maxWidth="lg">
      <Box
        // align="right"
        // mt={4} maxWidth={350}
        // mb={10}
        className={classes.RevisionClassEnrollBox}
        // style={{marginTop : 4, maxWidth: 350, mb :10}}
      >
        {DataToEnroll?.is_enrolled ? (
          <>
            <ExerciseBatchClass
              id={revisionData[0].id}
              facilitator={revisionData[0].facilitator.name}
              start_time={revisionData[0].start_time}
              end_time={revisionData[0].end_time}
              meet_link={revisionData[0].meet_link}
            />
            <Typography
              variant="body2"
              color="red"
              align="center"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setDropOutOpen(true);
              }}
            >
              Can`t attend ?
            </Typography>{" "}
            <DropOut
              title={revisionData[0].title}
              open={dropOutOpen}
              close={closeDropOut}
              id={revisionData[0].id}
            />
          </>
        ) : (
          <Card elevation={2} pl={10}>
            <CardContent>
              <Typography gutterBottom variant="subtitle1" align="start">
                Missed the class or need to revise? Enroll in a class from
                another batch
              </Typography>
              <Box display="flex" justifyContent="start">
                <FormControl>
                  <RadioGroup>
                    {revisionData.map((item) => {
                      return (
                        <FormControlLabel
                          sx={{ fontWeight: 20 }}
                          value={item.id}
                          onChange={(e) => {
                            setRevisionId(e.target.value);
                            setDataToEnroll(item);
                            console.log(e.target.value);
                          }}
                          control={<Radio />}
                          // you can put your value using {} <- this
                          label={`${format(
                            item.start_time,
                            "dd MMM yy"
                          )}, ${format(
                            item.start_time,
                            "hh:mm aaa"
                          )} - ${format(item.end_time, "hh:mm aaa")}`}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </Box>
              <Button
                disabled={DataToEnroll == null}
                onClick={() => {
                  setOpen(true);
                }}
                variant="contained"
                fullWidth
              >
                Enroll
              </Button>
              <AlertDialog
                open={open}
                close={close}
                id={revisionId}
                title={DataToEnroll?.title}
                start_time={DataToEnroll?.start_time}
                end_time={DataToEnroll?.end_time}
                type="RevisionClass"
              />
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
}

export default RevisionClassEnroll;

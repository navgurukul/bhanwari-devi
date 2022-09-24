import { Box, Chip, Typography } from "@mui/material";
import React from "react";
// import { TimeLeft } from "../../../constant";
import { format } from "../../../common/date";
import FutureOrPast from "../../common/FutureOrPast";
import { breakpoints } from "../../../theme/constant";
import useMediaQuery from "@mui/material/useMediaQuery";

function ClassTopic({ courseData }) {
  const languageMap = {
    hi: "Hindi",
    en: "English",
    te: "Telugu",
    ta: "Tamil",
    mr: "Marathi",
  };
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  return (
    <>
      <Box m={isActive ? 0 : 4} sx={{ maxWidth: "300px" }}>
        <Typography variant="h6" mt={2}>
          {courseData.sub_title || courseData.title}
        </Typography>
        <Box mt={2}>
          <Chip
            label={courseData.type}
            variant="outlined"
            color="primary"
            style={{
              borderRadius: 90,
              height: 30,
              backgroundColor: "#E9F5E9",
            }}
          />
          <Chip
            label={languageMap[courseData.lang]}
            variant="outlined"
            color="primary"
            style={{
              marginLeft: 10,
              borderRadius: 90,
              height: 30,
            }}
          />
        </Box>
        <Box mt={2}>
          <Typography variant="body2">
            Clear your doubts related to the first class of Python and other
            queries during your studies
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body2">
            If you miss the class or need to revise, you can enroll in an extra
            class to catch up after {format(courseData.start_time, "dd MMM yy")}
          </Typography>
        </Box>
        <FutureOrPast
          date={courseData.start_time}
          past={
            <Box>
              <Box sx={{ display: "flex" }} mt={2}>
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0.5C15.5228 0.5 20 4.97715 20 10.5C20 16.0228 15.5228 20.5 10 20.5C4.47715 20.5 0 16.0228 0 10.5C0 4.97715 4.47715 0.5 10 0.5ZM13.2197 7.46967L8.75 11.9393L6.78033 9.96967C6.48744 9.67678 6.01256 9.67678 5.71967 9.96967C5.42678 10.2626 5.42678 10.7374 5.71967 11.0303L8.21967 13.5303C8.51256 13.8232 8.98744 13.8232 9.28033 13.5303L14.2803 8.53033C14.5732 8.23744 14.5732 7.76256 14.2803 7.46967C13.9874 7.17678 13.5126 7.17678 13.2197 7.46967Z"
                    fill="#48A145"
                  />
                </svg>

                <Typography ml={2} variant="body2">
                  Completed on {format(courseData.start_time, "dd MMM yy")}
                </Typography>
              </Box>
            </Box>
          }
        />
      </Box>
    </>
  );
}

export default ClassTopic;

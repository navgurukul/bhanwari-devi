import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { breakpoints } from "../../../theme/constant";
import { actions as classActions } from "../redux/action";
import Loader from "../../common/Loader";
import ClassCard from "../ClassCard";
import "./styles.scss";
import {
  Grid,
  TextField,
  Typography,
  Skeleton,
  Card,
  useMediaQuery,
  Alert,
  Box,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import NoClassesFound from "../NoClassesFound";
import NoVolunteerClass from "../NoVolunteerClass";

function ClassList({
  editClass,
  isShow,
  setFormType,
  showClass,
  toggleModalOpen,
  pathwayID,
  canSpecifyFacilitator,
}) {
  const dispatch = useDispatch();

  const { loading, data = [] } = useSelector(({ Class }) => Class.allClasses);
  const [recurring_classes_data_set, set_recurring_classes_data_set] =
    useState(null);
  const [filterText, setFilterText] = useState(null);
  useEffect(() => {
    if (isShow === false) {
      dispatch(classActions.getClasses());
    }
  }, [dispatch, isShow]);

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from(Array(8)).map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ p: 4 }}>
              <Typography variant="subtitle1">
                <Skeleton />
              </Typography>
              <Typography variant="subtitle2">
                <Skeleton />
              </Typography>
              <Typography variant="body1">
                <Skeleton />
              </Typography>
              <Typography variant="body1">
                <Skeleton />
              </Typography>
              <Typography variant="body1">
                <Skeleton />
              </Typography>
              <Typography variant="body1">
                <Skeleton />
              </Typography>
              <Typography variant="body1">
                <Skeleton />
              </Typography>
              <Typography variant="body1">
                <Skeleton />
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  let recurring_classes_data = [];
  let single_classes = [];
  data &&
    data.forEach((item) => {
      if (item.recurring_id) {
        recurring_classes_data.push(item);
      } else {
        single_classes.push(item);
      }
    });

  const _ = require("lodash");
  var recurring_classes = _.uniqBy(recurring_classes_data, "recurring_id");
  var classData = recurring_classes_data_set || recurring_classes;

  const pathwayFilter = canSpecifyFacilitator
    ? classData.filter((item) => {
        return item?.pathway_id === pathwayID;
      })
    : classData;

  return (
    <>
      <Box
        display="flex"
        sx={{ justifyContent: "space-between", marginTop: "32px" }}
      >
        <TextField
          size={"small"}
          variant="outlined"
          InputProps={{
            style: { paddingTop: "3px" },
            startAdornment: (
              <InputAdornment position="start">{<SearchIcon />}</InputAdornment>
            ),
          }}
          placeholder="Enter Batch or Class Name"
          value={filterText}
          sx={{
            margin: isActive ? "0 0 0 4px" : "0px 0 0 0px",
            maxWidth: isActive ? "100%" : "99%",
            borderRadius: "8px",
          }}
          onPaste={(e) => {
            e.preventDefault();
            setFilterText(e.clipboardData.getData("text"));

            let filtered_recurring_classes = recurring_classes.filter(
              (item) =>
                item.title
                  .toLowerCase()
                  .indexOf(e.clipboardData.getData("text").toLowerCase()) > -1
            );

            set_recurring_classes_data_set(filtered_recurring_classes);
          }}
          onChange={(e) => {
            setFilterText(e.target.value);
            if (filterText?.length > 0) {
              let filtered_recurring_classes = recurring_classes.filter(
                (item) =>
                  item.title
                    .toLowerCase()
                    .indexOf(e.target.value.toLowerCase()) > -1
              );
              set_recurring_classes_data_set(filtered_recurring_classes);
            } else {
              set_recurring_classes_data_set(null);
            }
          }}
        />
        {canSpecifyFacilitator && (
          <Button
            variant="contained"
            style={{
              width: isActive ? "100%" : "25%",
            }}
            fullWidth
            onClick={() => {
              setFormType(showClass ? "batch" : "doubt_class");
              toggleModalOpen();
            }}
            //  sx={{ m: !isActive ? "10px 16px 20px 5px" : "0px 0px"}}
          >
            {showClass ? "Create Batch" : "Create Doubt Class"}
          </Button>
        )}
      </Box>
      <>
        <Grid container spacing={isActive ? "0px" : "16px"}>
          {data && data.length > 0 ? (
            <>
              {!filterText?.length > 0
                ? single_classes.map((item, index) => {
                    return (
                      item.type ===
                        `${showClass ? "batch" : "doubt_class"}` && (
                        <Grid item xs={12} ms={6} md={4} sx={{ mb: 0 }}>
                          <ClassCard
                            item={item}
                            key={index}
                            index={index}
                            editClass={editClass}
                            enroll="Enroll to Cohort class"
                            style="class-enroll-cohort"
                            pathwayFilter={pathwayFilter}
                            showClass={showClass}
                          />
                        </Grid>
                      )
                    );
                  })
                : ""}
              {pathwayFilter.length > 0 ? (
                pathwayFilter.map((item, index) => {
                  return (
                    item.type === `${showClass ? "batch" : "doubt_class"}` && (
                      <Grid
                        item
                        xs={12}
                        ms={6}
                        md={canSpecifyFacilitator ? 4 : 3}
                        sx={{ mb: 0 }}
                        key={index}
                      >
                        <ClassCard
                          item={item}
                          key={index}
                          index={index}
                          editClass={editClass}
                          pathwayFilter={pathwayFilter}
                          enroll="Enroll to Cohort class"
                          style="class-enroll-cohort"
                          showClass={showClass}
                        />
                      </Grid>
                    )
                  );
                })
              ) : (
                <Grid item md={12} sx={{ mb: 0, mt: 4, p: 1 }}>
                  <NoClassesFound />
                </Grid>
              )}
            </>
          ) : (
            <div className="message">
              <NoClassesFound />
            </div>
          )}
        </Grid>
        {!pathwayFilter.length > 0 && !canSpecifyFacilitator && (
          <div>
            <NoVolunteerClass
              setFormType={setFormType}
              toggleModalOpen={toggleModalOpen}
            />
          </div>
        )}
      </>
    </>
  );
}
export default ClassList;

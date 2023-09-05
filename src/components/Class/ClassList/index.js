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
  Newpathways,
}) {
  const dispatch = useDispatch();

  const { loading, data = [] } = useSelector(({ Class }) => Class.allClasses);
  const [recurring_classes_data_set, set_recurring_classes_data_set] =
    useState(null);
  const [refreshKey, setRefreshKey] = useState(false);
  const [filterText, setFilterText] = useState(null);
  useEffect(() => {
    if (isShow === false) {
      dispatch(classActions.getClasses());
    }
  }, [dispatch, isShow]);

  useEffect(() => {
    if (refreshKey) {
      dispatch(classActions.getClasses());
      setRefreshKey(false);
    }
  }, [dispatch, refreshKey]);

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

  // separate recurring classes and single classes
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
  // remove duplicate classes
  var recurring_classes = _.uniqBy(recurring_classes_data, "recurring_id");

  // if user type in search box, it will filter the classes
  var classData =
    (filterText?.length > 0 && recurring_classes_data_set) || recurring_classes;

  const handleFilterChange = (e) => {
    // for filter the batch
    setFilterText(e.target.value);
    if (filterText?.length > 0) {
      const filtered_recurring_classes = recurring_classes.filter(
        (item) =>
          item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
      // for filter doubt class
      const filter_single_class = single_classes.filter(
        (item) =>
          item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );

      set_recurring_classes_data_set([
        ...filtered_recurring_classes,
        ...filter_single_class,
      ]);
    } else {
      set_recurring_classes_data_set(null);
    }
  };

  const handlePaste = (e) => {
    // when user paste in search box, it will filter the classes
    e.preventDefault();
    setFilterText(e.clipboardData.getData("text"));
    // when user paste in search box, batches should be filter by that pathway
    const filtered_recurring_classes = recurring_classes.filter(
      (item) =>
        item.title
          .toLowerCase()
          .indexOf(e.clipboardData.getData("text").toLowerCase()) > -1
    );
    // when user paste in search box, doubt class should be filter by that pathway
    const filter_single_class = single_classes.filter(
      (item) =>
        item.title
          .toLowerCase()
          .indexOf(e.clipboardData.getData("text").toLowerCase()) > -1
    );

    set_recurring_classes_data_set([
      ...filtered_recurring_classes,
      ...filter_single_class,
    ]);
  };

  const pathwayFilter = canSpecifyFacilitator
    ? classData.filter((item) => {
        // if I click on a pathway, batches should be filter by that pathway
        return item?.pathway_id === pathwayID;
      })
    : classData;

  const singlepathwayFilter = canSpecifyFacilitator
    ? // if I click on pathway, doubt class should be filter by that pathway
      single_classes.filter((item) => {
        return item?.pathway_id === pathwayID;
      })
    : single_classes;

  return (
    <>
      {(data?.length > 0 || canSpecifyFacilitator) && (
        <Box
          display={!isActive && "flex"}
          sx={{
            justifyContent: !isActive && "space-between",
            marginTop: "32px",
          }}
        >
          <TextField
            size={"small"}
            variant="outlined"
            InputProps={{
              style: { paddingTop: "3px" },
              startAdornment: (
                <InputAdornment position="start">
                  {<SearchIcon />}
                </InputAdornment>
              ),
            }}
            placeholder="Enter Batch or Class Name"
            value={filterText}
            sx={{
              margin: isActive ? "0 0 0 4px" : "0px 0 0 0px",
              maxWidth: isActive ? "100%" : "99%",
              borderRadius: "8px",
            }}
            fullWidth={isActive && true}
            onPaste={handlePaste}
            onChange={handleFilterChange}
          />

          {canSpecifyFacilitator && (
            <Button
              variant="contained"
              style={
                isActive
                  ? {
                      width: "100%",
                      marginTop: "32px",
                    }
                  : { width: "25%" }
              }
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
      )}
      <>
        <Grid container spacing={isActive ? "0px" : "16px"}>
          {data && data.length > 0 ? (
            <>
              {!filterText?.length > 0
                ? singlepathwayFilter.map((item, index) => {
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
                            Newpathways={Newpathways}
                            setRefreshKey={setRefreshKey}
                          />
                        </Grid>
                      )
                    );
                  })
                : ""}
              {pathwayFilter.length > 0
                ? pathwayFilter.map((item, index) => {
                    return (
                      item.type ===
                        `${showClass ? "batch" : "doubt_class"}` && (
                        <Grid
                          item
                          xs={12}
                          ms={6}
                          md={4}
                          sx={{ mb: 0 }}
                          key={index}
                        >
                          <ClassCard
                            item={item}
                            key={index}
                            index={index}
                            editClass={editClass}
                            pathwayFilter={pathwayFilter}
                            Newpathways={Newpathways}
                            enroll="Enroll to Cohort class"
                            style="class-enroll-cohort"
                            showClass={showClass}
                            setRefreshKey={setRefreshKey}
                          />
                        </Grid>
                      )
                    );
                  })
                : ""}
            </>
          ) : canSpecifyFacilitator ? (
            <Grid item md={12} sx={{ mb: 0, mt: 4, p: 1 }}>
              <NoClassesFound />
            </Grid>
          ) : (
            <Grid item md={12} xs={12} sm={12} sx={{ mb: 0, mt: 4, p: 1 }}>
              <NoVolunteerClass
                setFormType={setFormType}
                toggleModalOpen={toggleModalOpen}
              />
            </Grid>
          )}
        </Grid>
      </>
    </>
  );
}
export default ClassList;

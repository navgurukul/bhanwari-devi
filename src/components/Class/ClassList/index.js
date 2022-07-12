import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as classActions } from "../redux/action";
import ClassCard from "../ClassCard";
import "./styles.scss";
import {
  Grid,
  Container,
  Typography,
  Card,
  Skeleton,
  TextField,
} from "@mui/material";

function ClassList({ editClass, isShow }) {
  const dispatch = useDispatch();
  const [recurring_classes_data_set, set_recurring_classes_data_set] =
    useState(null);
  const { loading, data = [] } = useSelector(({ Class }) => Class.allClasses);
  const [filterText, setFilterText] = useState(null);
  useEffect(() => {
    if (isShow === false) {
      dispatch(classActions.getClasses());
    }
  }, [dispatch, isShow]);

  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from(Array(8)).map((_, index) => (
          <Grid item xs={2} sm={4} md={3} key={index}>
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

  return (
    <>
      <TextField
        size="small"
        placeholder="Enter Class Name"
        value={filterText}
        label="Enter Class Name"
        sx={{ margin: "15px 0 0 10px" }}
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
                item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) >
                -1
            );
            set_recurring_classes_data_set(filtered_recurring_classes);
          } else {
            set_recurring_classes_data_set(null);
          }
        }}
      />
      <>
        <Grid container spacing={2}>
          {data && data.length > 0 ? (
            <>
              {!filterText?.length > 0
                ? single_classes.map((item, index) => {
                    return (
                      <Grid item xs={12} ms={6} md={3} sx={{ mb: 10 }}>
                        <ClassCard
                          item={item}
                          key={index}
                          index={index}
                          editClass={editClass}
                          enroll="Enroll to class"
                          style="class-enroll"
                        />
                      </Grid>
                    );
                  })
                : ""}
              {classData.map((item, index) => {
                return (
                  <Grid item xs={12} ms={6} md={3} sx={{ mb: 3 }}>
                    <ClassCard
                      item={item}
                      key={index}
                      index={index}
                      editClass={editClass}
                      enroll="Enroll to Cohort class"
                      style="class-enroll-cohort"
                    />
                  </Grid>
                );
              })}
            </>
          ) : (
            <div className="message">
              <h2>No Classes Today....</h2>
            </div>
          )}
        </Grid>
      </>
    </>
  );
}
export default ClassList;

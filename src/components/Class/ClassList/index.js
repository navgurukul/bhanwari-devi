import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actions as classActions } from "../redux/action";
import Loader from "../../common/Loader";
import ClassCard from "../ClassCard";
import "./styles.scss";
import { Grid } from "@mui/material";

function ClassList({ editClass, isShow }) {
  const dispatch = useDispatch();

  const { loading, data = [] } = useSelector(({ Class }) => Class.allClasses);

  useEffect(() => {
    if (isShow === false) {
      dispatch(classActions.getClasses());
    }
  }, [dispatch, isShow]);

  if (loading) {
    return <Loader pageLoader={true} />;
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

  return (
    <div>
      <div className="ng-upcoming-class">
        {data && data.length > 0 ? (
          <>
            {single_classes.map((item, index) => {
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
            })}
            {recurring_classes.map((item, index) => {
              return (
                <Grid item xs={12} ms={6} md={3} sx={{ mb: 10 }}>
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
      </div>
    </div>
  );
}
export default ClassList;

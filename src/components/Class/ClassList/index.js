import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { actions as classActions } from "../redux/action";
import Loader from "../../common/Loader";
import "./styles.scss";

function ClassList() {
  const dispatch = useDispatch();

  const { loading, data = [] } = useSelector(({ Class }) => Class.allClasses);

  useEffect(() => {
    dispatch(classActions.getClasses());
  }, [dispatch]);

  if (loading) {
    return <Loader pageLoader={true} />;
  }
  const obj = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
    doubt_class: "Doubt Class",
    workshop: "Workshop",
  };

  return (
    <>
      <div className="ng-upcoming-class">
        {data && data.length > 0 ? (
          data.map((item, index) => {
            const classStartTime =
              item.start_time && item.start_time.replace("Z", "");
            const classEndTime =
              item.end_time && item.end_time.replace("Z", "");
            return (
              <div key={index} className="class-cards">
                <div className="card-content">
                  <div className="card-heading">
                    <div className="title">{item.title}</div>
                    <div className="class-type">{obj[item.type]}</div>
                  </div>
                  <div className="class-details">
                    <p>Facilitator Name : {item.facilitator.name} </p>
                    <p>Language : {obj[item.lang]} </p>
                    <p>Date : {moment(classStartTime).format("DD-MM-YYYY")} </p>
                    <p>
                      {" "}
                      Time : {moment(classStartTime).format("hh:mm a")} -{" "}
                      {moment(classEndTime).format("hh:mm a")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="message">
            <h2>No Classes Today</h2>
          </div>
        )}
      </div>
    </>
  );
}
export default ClassList;

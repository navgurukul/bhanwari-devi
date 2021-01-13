import React from "react";
import moment from "moment";

import "./styles.scss";

function ClassCard(props) {
  const { item, index } = props;

  const classStartTime = item.start_time && item.start_time.replace("Z", "");
  const classEndTime = item.end_time && item.end_time.replace("Z", "");

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
    doubt_class: "Doubt Class",
    workshop: "Workshop",
  };

  return (
    <div>
      <div key={index} className="class-cards">
        <div className="card-content">
          <div className="card-heading">
            <div className="title">{item.title}</div>
            <div className="class-type">{languageMap[item.type]}</div>
          </div>
          <div className="class-details">
            <p>Facilitator Name : {item.facilitator.name} </p>
            <p>Language : {languageMap[item.lang]} </p>
            <p>Date : {moment(classStartTime).format("DD-MM-YYYY")} </p>
            <p>
              {" "}
              Time : {moment(classStartTime).format("hh:mm a")} -{" "}
              {moment(classEndTime).format("hh:mm a")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassCard;

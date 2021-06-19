import React from "react";
import "./styles.scss";
import moment from "moment";

function StudentClassData(props) {
  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
  };

  return (
    <table className="student-class-table">
      <thead>
        <tr>
          <th>Class id</th>
          <th>Date of Class </th>
          <th>Language</th>
          <th>Facilitator Name</th>
          <th>Title</th>
          <th> Feedback rating </th>
        </tr>
      </thead>

      {props.location.state.pass && props.location.state.pass.length > 0 ? (
        props.location.state.pass.map((item) => {
          const classDate = item.start_time && item.start_time.replace("Z", "");
          return (
            <tr key={item.id}>
              <td data-column="Class Id">{item.id}</td>
              <td data-column="Date">
                {moment(classDate).format("DD-MM-YYYY")}
              </td>
              <td data-column="Language">{languageMap[item.lang]}</td>
              <td data-column="Facilitator Name">{item.facilitator_name}</td>
              <td data-column="Title">{item.title}</td>
              <td data-column="Feedback">
                {item.feedback.feedback || "" ? item.feedback.feedback : "NA"}{" "}
              </td>
            </tr>
          );
        })
      ) : (
        <div className="message">
          <h3>There are no results to display</h3>
        </div>
      )}
    </table>
  );
}

export default StudentClassData;

import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./styles.scss";

function ClassList() {
  const [allClass, setAllClass] = useState([]);

  const convertTime = (timeString) => {
    var hourEnd = timeString.indexOf(":");
    var H = +timeString.substr(0, hourEnd);
    var h = H % 12 || 12;
    var ampm = H < 12 ? "AM" : "PM";
    timeString = h + timeString.substr(hourEnd, 3) + ampm;
    return timeString;
  };

  useEffect((e) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5NiIsImVtYWlsIjoiaWFtc2FxdWlibmFzaW1AZ21haWwuY29tIiwiaWF0IjoxNjAwNTM1MzMxLCJleHAiOjE2MzIwOTI5MzF9.vuSZRabkDGa5kdx51D7K9R7lzZL3sElBUTnHs2x-GDY";
    Axios.get("http://dev-api.navgurukul.org/classes/all", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setAllClass(res.data);
    });
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Facilitator Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Language</th>
            <th>Class type</th>
            <th>Date</th>
            <th> Start Time </th>
            <th>End Time</th>
          </tr>
        </thead>
        {allClass.map((item, index) => {
          return (
            <tr>
              <td data-column="Facilitator Name"> {item.facilitator.name}</td>
              <td data-column="Title">{item.title}</td>
              <td data-column="Description">{item.description}</td>
              <td data-column="Language">{item.lang}</td>
              <td data-column="Class type">{item.type}</td>
              <td data-column="Date">{item.start_time.split("T")[0]}</td>
              <td data-column="End Time">
                {convertTime(item.start_time.split("T")[1])}
              </td>
              <td data-column="End Time">
                {convertTime(item.end_time.split("T")[1])}
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
}

export default ClassList;

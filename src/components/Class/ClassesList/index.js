import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { actions as classActions } from '../redux/action'
import Loader from '../../common/Loader'

import "./styles.scss";


function ClassList() {
  const dispatch = useDispatch()
  const { loading, data = []  } = useSelector(({ Class }) => Class.allClasses)

  const convertTime = (timeString) => {
    var hourEnd = timeString.indexOf(":");
    var H = +timeString.substr(0, hourEnd);
    var h = H % 12 || 12;
    var ampm = H < 12 ? "AM" : "PM";
    timeString = h + timeString.substr(hourEnd, 3) + ampm;
    return timeString;
  };

  useEffect((e) => {
    dispatch(classActions.getClasses())
  }, [dispatch]);

  if(loading) {
    return <Loader pageLoader={true} />
  }

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
        {data && data.map((item, index) => {
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

  
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { actions as classActions } from '../redux/action'
import Loader from '../../common/Loader'
import "./styles.scss";


function ClassList() {
  const dispatch = useDispatch()
  
  const { loading, data = []  } = useSelector(({ Class}) => Class.allClasses)
 
  useEffect((e) => {
    dispatch(classActions.getClasses())
  }, [dispatch]);
  
  if(loading) {
    return <Loader pageLoader={true} />
  }
  
  return (
    <React.Fragment>
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
        
        {data && data.length > 0 ? data.map((item, index) => {
          const classStartTime = item.start_time && item.start_time.replace('Z', '')
          const classEndTime = item.end_time && item.end_time.replace('Z', '')
          return (
            <tr key={index}>
              <td data-column="Facilitator Name"> {item.facilitator.name}</td>
              <td data-column="Title">{item.title}</td>
              <td data-column="Description">{item.description}</td>
              <td data-column="Language">{item.lang}</td>
              <td data-column="Class type">{item.type}</td>
              <td data-column="Date">{moment(classStartTime).format('DD-MM-YYYY')}</td>
              <td data-column="End Time">
                {moment(classStartTime).format('hh:mm a')}
              </td>
              <td data-column="End Time">
                {moment(classEndTime).format('hh:mm a')}
              </td>
            </tr>
          );
        }):<div className="message">
          <h2>No Classes Today</h2>
          </div>}
      </table>
   
      </React.Fragment>
  );
}
export default ClassList;
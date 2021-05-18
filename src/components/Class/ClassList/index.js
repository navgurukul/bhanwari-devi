import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actions as classActions } from "../redux/action";
import Loader from "../../common/Loader";
import ClassCard from "../ClassCard";
import "./styles.scss";

function ClassList({ editClass, isShow }) {
  const dispatch = useDispatch();

  const { loading, data = [] } = useSelector(({ Class }) => Class.allClasses);
  const [deleteItems, setdeleteItems] = useState([]);
  const [enrolledItems, setenrolledItems] = useState([]);
  const [dropOutItems, setdropOutItems] = useState([]);

  // LIST OF DROP OUT CLASSES
  const dropOutData = (id) => {
    var array = [...enrolledItems];
    var index = array.indexOf(id);
    if (index !== -1) {
      array.splice(index, 1);
      setenrolledItems(array);
      setdropOutItems((prevData) => [...prevData, id]);
    } else {
      setdropOutItems((prevData) => [...prevData, id]);
    }
  };

  // LIST OF ENROLL CLASSES
  const enrolledData = (id) => {
    setenrolledItems((prevData) => [...prevData, id]);
  };

  // LIST OF DELETE CLASSES
  const deleteData = (id) => {
    setdeleteItems((prevData) => [...prevData, id]);
  };

  useEffect(() => {
    dispatch(classActions.getClasses());
  }, [dispatch, isShow]);

  if (loading) {
    return <Loader pageLoader={true} />;
  }

  return (
    <div>
      <div className="ng-upcoming-class">
        {data && data.length > 0 ? (
          data.map((item, index) => {
            if (enrolledItems.indexOf(item.id) > -1) {
              item.enrolled = true;
            } else if (dropOutItems.indexOf(item.id) > -1) {
              item.enrolled = false;
            }
            return deleteItems.indexOf(item.id) > -1 ? null : (
              <ClassCard
                item={item}
                key={index}
                editClass={editClass}
                handleDeleteData={deleteData}
                handleEnrolledData={enrolledData}
                handleDropOutData={dropOutData}
              />
            );
          })
        ) : (
          <div className="message">
            <h2>No Classes Today....</h2>
          </div>
        )}
        {data && data.length && data.length === deleteItems.length ? (
          <div className="message">
            <h2>No Classes Today....</h2>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default ClassList;

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
            return deleteItems.includes(item.id) ? null : (
              <ClassCard
                item={item}
                key={index}
                editClass={editClass}
                handleDeleteData={deleteData}
              />
            );
          })
        ) : (
          <div className="message">
            <h2>No Classes Today</h2>
          </div>
        )}
      </div>
    </div>
  );
}
export default ClassList;

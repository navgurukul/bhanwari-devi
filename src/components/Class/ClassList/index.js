import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actions as classActions } from "../redux/action";
import Loader from "../../common/Loader";
import ClassCard from "../ClassCard";
import "./styles.scss";

function ClassList({ editClass, isShow }) {
  const dispatch = useDispatch();

  const { loading, data = [] } = useSelector(({ Class }) => Class.allClasses);
  const [deleteItemID, setdeleteItemID] = useState(0);

  useEffect(() => {
    dispatch(classActions.getClasses());
  }, [dispatch, isShow, deleteItemID]);

  if (loading) {
    return <Loader pageLoader={true} />;
  }
  const isId = (id) => {
    setdeleteItemID(id);
  };

  return (
    <div>
      <div className="ng-upcoming-class">
        {data && data.length > 0 ? (
          data.map((item, index) => {
            return (
              <ClassCard
                editClass={editClass}
                item={item}
                key={index}
                deleteItemIDFunction={isId}
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

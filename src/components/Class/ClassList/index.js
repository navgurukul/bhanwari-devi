import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actions as classActions } from "../redux/action";
import Loader from "../../common/Loader";
import ClassCard from "../ClassCard";
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

  return (
    <div>
      <div className="ng-upcoming-class">
        {data && data.length > 0 ? (
          data.map((item, index) => {
            return <ClassCard item={item} key={index} />;
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

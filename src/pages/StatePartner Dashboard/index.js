import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import Dashboard from "./Dashboard";

function StateDashboard() {
  const user = useSelector(({ User }) => User);
  const [states, setStates] = useState();
  const [stateId, setStateId] = useState();

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/clusters`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setStates(res.data.filter((item) => !item.name.includes("_REGION")));
      setStateId(res.data[0].id);
    });
  }, []);

  const selectedState = (id) => {
    setStateId(id);
  };

  return (
    <>
      {states && (
        <div className="state-name">
          <div className="first-state-name">
            <h2
              onClick={() => selectedState(states[0].id)}
              className={stateId === states[0].id ? "dark-text" : "light-text"}
            >
              {states[0].name} Dashboard
            </h2>
            {stateId === states[0].id && <hr />}
          </div>
          <div>
            <h2
              onClick={() => selectedState(states[1].id)}
              className={stateId === states[1].id ? "dark-text" : "light-text"}
            >
              {states[1].name[0] + states[1].name.slice(1).toLowerCase()}{" "}
              Dashboard
            </h2>
            {stateId === states[1].id && <hr />}
          </div>
        </div>
      )}
      <Dashboard stateId={stateId} />
    </>
  );
}
export default StateDashboard;

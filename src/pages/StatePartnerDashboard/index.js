import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import "./style.scss";
import Dashboard from "./Dashboard";

function StateDashboard() {
  const user = useSelector(({ User }) => User);
  const [states, setStates] = useState();
  const [stateId, setStateId] = useState();

  const clusterId = user.data.user.partner_group_id;
  const admin = user.data.user.rolesList.indexOf("admin") > -1;

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/clusters`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setStates(res.data);
      if (clusterId) {
        res.data.filter((item) => {
          if (clusterId === item.id) setStateId(item.id);
        });
      } else {
        setStateId(res.data[0].id);
      }
    });
  }, []);

  const selectedState = (id) => {
    setStateId(id);
  };

  return (
    <>
      {states && (
        <div className="state-name">
          {states.map((item) => {
            const name = `${
              item.name[0] + item.name.slice(1).toLowerCase()
            } Dashboard`;
            return (
              <div className="first-state-name">
                <h2
                  onClick={() => selectedState(item.id)}
                  className={
                    admin
                      ? stateId === item.id
                        ? "dark-text"
                        : "light-text"
                      : clusterId === item.id
                      ? "dark-text"
                      : "light-text"
                  }
                >
                  {(clusterId === item.id || admin) && name}
                </h2>
                {admin ? stateId === item.id && <hr /> : ""}
              </div>
            );
          })}
        </div>
      )}
      <Dashboard stateId={stateId} />
    </>
  );
}
export default StateDashboard;

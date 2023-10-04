import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constant";

const StateSchools = ({ filterData }) => {
  return (
    <div className="state-partner-state-schools">
      <div className="state-schools-cards">
        {filterData.map((item) =>
          item.partners.map((name) => (
            <div className="state-schools-card" key={name.partner_id}>
              <Link
                className="t-data"
                to={`${PATHS.PARTNERS}/${name.partner_id}`}
              >
                <h4>{name.partner_name}</h4>
                <div className="school-card-row">
                  <span className="student-card-numbers">
                    <span>{name.users_count}</span> Students
                  </span>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StateSchools;

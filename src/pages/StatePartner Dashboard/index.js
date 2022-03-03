import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant";
import { hasOneFrom } from "../../common/utils";
import { Redirect } from "react-router-dom";
import "./style.scss";

function StatePartnerDashboard() {
  const user = useSelector(({ User }) => User);
  const [districtPartner, setDistrictPartner] = useState([]);
  const [districtPartnerData, setDistrictPartnerData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [value, setValue] = useState();

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/23/groups`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setDistrictPartner(res.data);
      setDistrictPartnerData(res.data.partner_groups_data);
      setFilterData([...filterData, res.data.partner_groups_data[0]]);
    });
  }, []);

  const handleSelcet = (e) => {
    const stateFilterData = districtPartnerData.filter(
      (el) => el.partner_group_name === e.target.value
    );
    setFilterData(stateFilterData);
    setValue(e.target.value);
  };

  const canSpecifyPartnerGroupId =
    hasOneFrom(user.data.user.rolesList, [
      "admin",
      "partner",
      "partner_view",
    ]) && user.data.user.partner_group_id;

  if (canSpecifyPartnerGroupId) {
    return (
      <div className="state-partner-dashboard">
        {/* <h2> Hariyana Partnership dashboard</h2> */}
        <h2>{districtPartner.state_name} Dashboard</h2>
        <h4>Overview</h4>
        <div className="state-partner-overview">
          <div className="state-partner-overview-card">
            <span className="overview-card-number">
              {districtPartner.total_no_of_groups}
            </span>
            <span className="overview-card-label">Total Number of Groups</span>
          </div>
          <div className="state-partner-overview-card">
            <span className="overview-card-number">
              {districtPartner.total_no_of_partners}
            </span>
            <span className="overview-card-label">
              Total Number of Partners
            </span>
          </div>
          <div className="state-partner-overview-card">
            <span className="overview-card-number">
              {districtPartner.total_no_of_students}
            </span>
            <span className="overview-card-label">Total Enrolled Students</span>
          </div>
        </div>
        <div className="state-partner-choose-district">
          <h4>Please choose a group</h4>
          <select
            className="input-for-district"
            onChange={handleSelcet}
            value={value}
          >
            <option value="all">All</option>
            {districtPartnerData.map((item, i) => {
              return (
                <>
                  <option
                    key={i}
                    value={item.partner_group_name}
                    selected={i === 0}
                  >
                    {item.partner_group_name}
                  </option>
                </>
              );
            })}
          </select>
        </div>

        {value === "all" ? (
          <div className="State-dashboard-container">
            <table className="volunteer-class-table">
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Number of Partners</th>
                  <th>Number of Students</th>
                </tr>
              </thead>
              <tbody>
                {districtPartnerData.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td data-column="Group Name">
                        {item.partner_group_name}
                      </td>
                      <td data-column="No Partners">{item.total_partners}</td>
                      <td data-column="No Students">{item.total_students}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="state-partner-state-schools">
            <div className="state-schools-heading"></div>
            <div className="state-schools-cards">
              {filterData.map((item) => {
                return item.partners.map((name) => {
                  return (
                    <div className="state-schools-card">
                      <Link
                        className="t-data"
                        to={`${PATHS.PARTNERS}/${name.partner_id}`}
                      >
                        <h4>{name.partner_name} </h4>
                        <div className="school-card-row">
                          <span className="student-card-numbers">
                            <span>{name.users_count}</span> Students
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
  return <Redirect to={PATHS.HOME_PATH} />;
}

export default StatePartnerDashboard;

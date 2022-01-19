import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant";
import "./style.scss";

function StatePartnerDashboard() {
  const user = useSelector(({ User }) => User);
  const [districtPartner, setDistrictPartner] = useState([]);
  const [districtPartnerData, setDistrictPartnerData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [myData, setMyData] = useState(
    Object.keys(filterData).length ? filterData : "poonam"
  );

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/23/groups`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      console.log(res, "data");
      setDistrictPartner(res.data);
      setDistrictPartnerData(res.data.partner_groups_data);
      setFilterData([...filterData, res.data.partner_groups_data[0]]);
    });
  }, []);

  const handleSelcet = (e) => {
    const stateFilterData = districtPartnerData.filter(
      (el) => el.partner_group_name == e.target.value
    );
    setFilterData(stateFilterData);

    setMyData(e.target.value);
    setIsShow(false);
  };

  console.log(myData, "MYDATA");

  console.log("filterData", filterData);

  return (
    <div className="state-partner-dashboard">
      <h2> State Partnership Dashboard</h2>
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
          <span className="overview-card-label">Total Number of Partners</span>
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
          // value={myData}
        >
          {/* <option value="all">All</option> */}
          {districtPartnerData.map((item, i) => {
            return (
              <option key={i} value={item.partner_group_name}>
                {item.partner_group_name}
              </option>
            );
          })}
        </select>

        <button
          className="all-btn"
          onClick={() => {
            setIsShow(true);
          }}
        >
          All
        </button>
      </div>

      {isShow ? (
        <div className="volunteer-class-page-container">
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
                    <td data-column="Class Title">{item.partner_group_name}</td>
                    <td data-column="Class Title">{item.total_partners}</td>
                    <td data-column="Class Title">{item.total_students}</td>
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
                    </Link>
                    <div className="school-card-row">
                      <span className="student-card-numbers">
                        <span>{name.users_count}</span> Students
                      </span>
                    </div>
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

export default StatePartnerDashboard;

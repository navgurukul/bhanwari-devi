import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { METHODS } from "../../../services/api";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constant";
import { hasOneFrom } from "../../../common/utils";
import { Redirect } from "react-router-dom";
import "../style.scss";

function Dashboard({ stateId }) {
  const user = useSelector(({ User }) => User);
  const [districtPartner, setDistrictPartner] = useState([]);
  const [districtPartnerData, setDistrictPartnerData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [value, setValue] = useState();
  const [region, setRegion] = useState();
  const [isRegion, setIsRegion] = useState();
  const [regionData, setRegionData] = useState();
  const [regionDistrictPartner, setRegionDistrictPartner] = useState([]);
  const [district, setDistrict] = useState();

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/${stateId}/groups`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setRegion();
      const partnerGroups = res.data.partner_groups_data;
      const includesRegion =
        partnerGroups[0].partner_group_name.includes("_REGION");

      setDistrictPartner(res.data);
      setIsRegion(includesRegion);

      setDistrictPartnerData(partnerGroups);
      setRegionData(partnerGroups);

      if (includesRegion) {
        setValue();
        setRegionDistrictPartner(
          partnerGroups[0].partner_groups_data.partner_groups_data
        );
        setFilterData([
          partnerGroups[0].partner_groups_data.partner_groups_data[0],
        ]);
      } else {
        setFilterData([partnerGroups[0]]);
        setDistrict();
      }
    });
  }, [stateId]);

  const handleSelcet = (e) => {
    const stateFilterData = districtPartnerData.filter(
      (el) => el.partner_group_name === e.target.value
    );
    setFilterData(stateFilterData);
    setValue(e.target.value);
  };

  const tableDistrict = (region) => {
    const regionItem = regionData.find(
      (item) => item.partner_group_name === region
    );
    setRegion(region);
    const regionPartner =
      regionItem && regionItem.partner_groups_data.partner_groups_data;

    setRegionDistrictPartner(regionPartner);
    setDistrict("all");
  };

  const selectRegion = (e) => {
    const regionItem = regionData.find(
      (item) => item.partner_group_name === e.target.value
    );
    const regionPartner =
      regionItem && regionItem.partner_groups_data.partner_groups_data;

    setRegionDistrictPartner(regionPartner);
    setRegion(e.target.value);
    if (e.target.value !== "all") {
      setFilterData([regionPartner[0]]);
    }
  };

  const selecetDistrict = (e) => {
    const districtPartner = [
      regionDistrictPartner.find(
        (item) => item.partner_group_name === e.target.value
      ),
    ];
    setDistrict(e.target.value);
    setFilterData(districtPartner);
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
        {isRegion ? (
          <>
            <div className="state-partner-choose-district">
              <h4>Please choose a Region</h4>
              <select
                className="input-for-district"
                onChange={selectRegion}
                value={region}
              >
                <option value="all">All</option>
                {regionData &&
                  regionData.map((item, i) => {
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

            {region !== "all" && (
              <div className="state-partner-choose-district">
                <h4>Please choose a group</h4>
                <select
                  className="input-for-district"
                  onChange={selecetDistrict}
                  value={district}
                >
                  <option value="all">All</option>
                  {regionDistrictPartner &&
                    regionDistrictPartner.map((item, i) => {
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
            )}
          </>
        ) : (
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
        )}

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
                      <td data-column="No Partners">
                        {item.total_no_of_partners}
                      </td>
                      <td data-column="No Students">
                        {item.total_no_of_students}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : region === "all" ? (
          <div className="State-dashboard-container">
            <table className="volunteer-class-table">
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Number of Districts</th>
                  <th>Number of ITIs</th>
                  <th>Number of Students</th>
                </tr>
              </thead>
              <tbody>
                {districtPartnerData.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      onClick={() => {
                        tableDistrict(
                          item.partner_groups_data.partner_group_name
                        );
                      }}
                    >
                      <td data-column="Group Name">
                        {item.partner_groups_data.partner_group_name}
                      </td>

                      <td data-column="Group Name">
                        {item.partner_groups_data.total_no_of_groups}
                      </td>

                      <td data-column="No Partners">
                        {item.partner_groups_data.total_no_of_partners}
                      </td>
                      <td data-column="No Students">
                        {item.partner_groups_data.total_no_of_students}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : district === "all" ? (
          <div className="State-dashboard-container">
            <table className="volunteer-class-table">
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Number of ITIs</th>
                  <th>Number of Students</th>
                </tr>
              </thead>
              <tbody>
                {regionDistrictPartner.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td data-column="Group Name">
                        {item.partner_group_name}
                      </td>
                      <td data-column="No Partners">
                        {item.total_no_of_partners}
                      </td>
                      <td data-column="No Students">
                        {item.total_no_of_students}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="state-partner-state-schools">
            {/* <div className="state-schools-heading"></div> */}
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

export default Dashboard;

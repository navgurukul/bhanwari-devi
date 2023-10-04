import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { METHODS } from "../../../services/api";
import { Redirect } from "react-router-dom";
import { PATHS } from "../../../constant";
import { hasOneFrom } from "../../../common/utils";
import DashboardTable from "./DashboardTable";
import StateSchools from "./StateSchools";
import "../style.scss";

function Dashboard({ stateId }) {
  const user = useSelector(({ User }) => User);
  const [dashboardData, setDashboardData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [value, setValue] = useState("all");
  const [region, setRegion] = useState("all");
  const [isRegion, setIsRegion] = useState(false);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/${stateId}/groups`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setRegion("all");
      const partnerGroups = res.data.partner_groups_data;
      const includesRegion =
        partnerGroups[0].partner_group_name.includes("_REGION");
      setDashboardData(res.data);
      setIsRegion(includesRegion);
      setFilterData(partnerGroups);
    });
  }, [stateId]);

  const tableDistrict = (region) => {
    const regionItem = dashboardData.find(
      (item) => item.partner_group_name === region
    );
    const regionPartner =
      regionItem && regionItem.partner_groups_data.partner_groups_data;
    setRegion(region);
    setFilterData(regionPartner);
  };

  const handleSelect = (e) => {
    const selectedFilterData = dashboardData.filter(
      (el) => el.partner_group_name === e.target.value
    );
    setFilterData(selectedFilterData);
    setValue(e.target.value);
  };

  const selectRegion = (e) => {
    const regionPartner = dashboardData.find(
      (item) => item.partner_group_name === e.target.value
    ).partner_groups_data.partner_groups_data;
    setRegion(e.target.value);
    setFilterData(regionPartner);
  };

  if (
    hasOneFrom(user.data.user.rolesList, [
      "admin",
      "partner",
      "partner_view",
    ]) &&
    user.data.user.partner_group_id
  ) {
    return (
      <div className="state-partner-dashboard">
        <h4>Overview</h4>
        {/* Overview content */}
        <DashboardTable
          data={dashboardData}
          district={value}
          region={region}
          tableDistrict={tableDistrict}
        />
        {isRegion ? (
          <>
            {/* Dropdown for region */}
            <div className="state-partner-choose-district">
              <h4>Please choose a Region</h4>
              <select
                className="input-for-district"
                onChange={selectRegion}
                value={region}
              >
                <option value="all">All</option>
                {dashboardData.map((item, i) => (
                  <option
                    key={i}
                    value={item.partner_group_name}
                    selected={i === 0}
                  >
                    {item.partner_group_name}
                  </option>
                ))}
              </select>
            </div>
            {region !== "all" && (
              // Dropdown for group when region is selected
              <div className="state-partner-choose-district">
                <h4>Please choose a group</h4>
                <select
                  className="input-for-district"
                  onChange={handleSelect}
                  value={value}
                >
                  <option value="all">All</option>
                  {filterData.map((item, i) => (
                    <option
                      key={i}
                      value={item.partner_group_name}
                      selected={i === 0}
                    >
                      {item.partner_group_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        ) : (
          // Dropdown for group when region is not selected
          <div className="state-partner-choose-district">
            <h4>Please choose a group</h4>
            <select
              className="input-for-district"
              onChange={handleSelect}
              value={value}
            >
              <option value="all">All</option>
              {dashboardData.map((item, i) => (
                <option
                  key={i}
                  value={item.partner_group_name}
                  selected={i === 0}
                >
                  {item.partner_group_name}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Display data based on selections */}
        {value === "all" ? (
          <DashboardTable
            data={dashboardData}
            district={value}
            region={region}
            tableDistrict={tableDistrict}
          />
        ) : region === "all" ? (
          <DashboardTable
            data={filterData}
            district={value}
            region={region}
            tableDistrict={tableDistrict}
          />
        ) : (
          <StateSchools filterData={filterData} />
        )}
      </div>
    );
  }
  return <Redirect to={PATHS.HOME_PATH} />;
}

export default Dashboard;

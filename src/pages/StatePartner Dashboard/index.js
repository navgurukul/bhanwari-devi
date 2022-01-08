import React, { useState } from "react";

import "./style.scss";

function StatePartnerDashboard() {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="state-partner-dashboard">
      <h2>Haryana State Partnership Dashboard</h2>
      <h4>Overview</h4>
      <div className="state-partner-overview">
        <div className="state-partner-overview-card">
          <span className="overview-card-number">22</span>
          <span className="overview-card-label">Total Number of Districts</span>
        </div>
        <div className="state-partner-overview-card">
          <span className="overview-card-number">140</span>
          <span className="overview-card-label">Total Number of Schools</span>
        </div>
        <div className="state-partner-overview-card">
          <span className="overview-card-number">140</span>
          <span className="overview-card-label">Total Enrolled Students</span>
        </div>
      </div>
      <div className="state-partner-choose-district">
        <h4>Please choose a district</h4>
        <div
          className="choose-district-dropdown"
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          Ambala
          <span
            className="choose-district-dropdown-content"
            style={dropdown ? { display: "block" } : {}}
          >
            <ul>
              <li>Jaipur</li>
              <li>Surat</li>
              <li>Banglore</li>
            </ul>
          </span>
        </div>
      </div>
      <div className="state-partner-state-schools">
        <div className="state-schools-heading">
          <h4>Ambala . </h4>7 Schools
        </div>
        <div className="state-schools-cards">
          <div className="state-schools-card">
            <h4>GSMM School</h4>
            <div className="school-card-row">
              <span className="student-card-icon"></span>
              <span className="student-card-icon"></span>
              <span className="student-card-numbers">
                <span>200</span> Students
              </span>
            </div>
          </div>
          <div className="state-schools-card">
            <h4>GSMM School</h4>
            <div className="school-card-row">
              <span className="student-card-icon"></span>
              <span className="student-card-icon"></span>
              <span className="student-card-numbers">
                <span>200</span> Students
              </span>
            </div>
          </div>
          <div className="state-schools-card">
            <h4>GSMM School</h4>
            <div className="school-card-row">
              <span className="student-card-icon"></span>
              <span className="student-card-icon"></span>
              <span className="student-card-numbers">
                <span>200</span> Students
              </span>
            </div>
          </div>
          <div className="state-schools-card">
            <h4>GSMM School</h4>
            <div className="school-card-row">
              <span className="student-card-icon"></span>
              <span className="student-card-icon"></span>
              <span className="student-card-numbers">
                <span>200</span> Students
              </span>
            </div>
          </div>
          <div className="state-schools-card">
            <h4>GSMM School</h4>
            <div className="school-card-row">
              <span className="student-card-icon"></span>
              <span className="student-card-icon"></span>
              <span className="student-card-numbers">
                <span>200</span> Students
              </span>
            </div>
          </div>
          <div className="state-schools-card">
            <h4>GSMM School</h4>
            <div className="school-card-row">
              <span className="student-card-icon"></span>
              <span className="student-card-icon"></span>
              <span className="student-card-numbers">
                <span>200</span> Students
              </span>
            </div>
          </div>
          <div className="state-schools-card">
            <h4>GSMM School</h4>
            <div className="school-card-row">
              <span className="student-card-icon"></span>
              <span className="student-card-icon"></span>
              <span className="student-card-numbers">
                <span>200</span> Students
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatePartnerDashboard;

import React from "react";
import "./style.css";

function Admission() {
  return (
    <div className="Admission">
      <div className="left">
        <video src="../../asset/video.mp4" className="video" controls></video>
        <div className="video-label">Experience of NG Alumni & Graduates</div>
      </div>
      <div className="right">
        <div className="test-form">
          <h2>Software Engineering Scholarship Test</h2>
          <div className="field">
            <div className="row">
              <div className="input">
                <span>First Name</span>
                <input type="text" placeholder="Peter..." />
              </div>
              <div className="input">
                <span>Middle Name (Optional)</span>
                <input type="text" placeholder="Edward..." />
              </div>
            </div>
            <div className="row">
              <div className="input">
                <span>Last Name</span>
                <input type="text" placeholder="Parke..." />
              </div>
              <div className="input">
                <span>Mobile Number</span>
                <input type="text" placeholder="9456..." />
              </div>
            </div>
          </div>
          <button>Give Admissions Test</button>
        </div>
        <div className="test-form down">
          <h2>Check Test Result via Registered Mobile Number </h2>
          <div className="field">
            <div className="input">
              <span>Mobile Number</span>
              <input type="text" placeholder="9456..." />
            </div>
          </div>
          <button>Give Admissions Test</button>
        </div>
      </div>
    </div>
  );
}

export default Admission;

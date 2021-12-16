import React from "react";
import "./styles.scss";

function Admission() {
  return (
    <div className="admission">
      <div className="left-section">
        {/* <video src="" className="video" controls></video> */}
        <video src="../../asset/video.mp4" className="video" controls></video>
        <div className="video-label">Experience of NG Alumni & Graduates</div>
      </div>
      <div className="right-section">
        <div className="test-form">
          <h2>Software Engineering Scholarship Test</h2>
          <div className="input-form">
            <div className="form-row">
              <div className="input">
                <span>First Name</span>
                <input type="text" placeholder="First Name..." />
              </div>
              <div className="input">
                <span>Middle Name (Optional)</span>
                <input type="text" placeholder="Middle Name..." />
              </div>
            </div>
            <div className="form-row">
              <div className="input">
                <span>Last Name</span>
                <input type="text" placeholder="Last Name..." />
              </div>
              <div className="input">
                <span>Mobile Number</span>
                <input type="text" placeholder="Mobile Number..." />
              </div>
            </div>
          </div>
          <button>Give Admissions Test</button>
        </div>
        <div className="test-form down">
          <h2>Check Test Result via Registered Mobile Number </h2>
          <div className="input-form">
            <div className="input">
              <span>Mobile Number</span>
              <input type="text" placeholder="Mobile Number..." />
            </div>
          </div>
          <button>Give Admissions Test</button>
        </div>
      </div>
    </div>
  );
}

export default Admission;

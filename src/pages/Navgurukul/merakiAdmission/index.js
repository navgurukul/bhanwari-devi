import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";

function Admission() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
  });

  const [enrolmentKey, setEnrolmentKey] = useState("");
  // console.log("url", process.env.REACT_APP_CHANAKYA_BASE_URL);

  const partnerId = 112;

  const generateTestLink = async () => {
    try {
      // const partnerId = this.state.partnerId ? this.state.partnerId : null;
      const mobile = `0${userDetails.mobileNumber}`;
      // this.props.fetchingStart();
      const dataURL = `${process.env.REACT_APP_CHANAKYA_BASE_URL}helpline/register_exotel_call`;
      const response = await axios.get(dataURL, {
        params: {
          ngCallType: "getEnrolmentKey",
          From: mobile,
          partner_id: partnerId,
        },
      });
      console.log("response.data.key", response.data.key);
      setEnrolmentKey("response.data.key", response.data.key);
      return response;
    } catch (e) {
      console.log(e);
      // this.props.fetchingFinish();
    }
  };

  // const generateTestLink = () => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_CHANAKYA_BASE_URL}helpline/register_exotel_call?ngCallType=getEnrolmentKey&From=0${userDetails.mobileNumber}&partner_id=112`
  //     )
  //     .then((res) => {
  //       console.log("res", res);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // };

  const changeHandler = (e) => {
    console.log("e.target.name", e.target.name);
    console.log("e.target.value", e.target.value);
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  console.log("userDetails", userDetails);

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
                <input
                  type="text"
                  placeholder="First Name..."
                  value={userDetails.firstName}
                  name="firstName"
                  onChange={changeHandler}
                />
              </div>
              <div className="input">
                <span>Middle Name (Optional)</span>
                <input
                  type="text"
                  placeholder="Middle Name..."
                  value={userDetails.middleName}
                  name="middleName"
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="input">
                <span>Last Name</span>
                <input
                  type="text"
                  placeholder="Last Name..."
                  value={userDetails.lastName}
                  name="lastName"
                  onChange={changeHandler}
                />
              </div>
              <div className="input">
                <span>Mobile Number</span>
                <input
                  type="text"
                  placeholder="Mobile Number..."
                  value={userDetails.mobileNumber}
                  name="mobileNumber"
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <button onClick={generateTestLink}>Give Admissions Test</button>
        </div>
        <div className="test-form down">
          <h2>Check Test Result via Registered Mobile Number </h2>
          <div className="input-form">
            <div className="input">
              <span>Mobile Number</span>
              <input
                type="text"
                placeholder="Mobile Number..."
                value={userDetails.mobileNumber}
                name="mobileNumber"
              />
            </div>
          </div>
          <button>Give Admissions Test</button>
        </div>
      </div>
    </div>
  );
}

export default Admission;

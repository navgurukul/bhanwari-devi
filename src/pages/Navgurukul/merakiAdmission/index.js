import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./styles.scss";

function Admission() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
  });

  const [mobile, setMobile] = useState("");
  const [enrolmentKey, setEnrolmentKey] = useState("");

  const partnerId = 112;
  const testUrl = "http://dev-join.navgurukul.org/k/";

  const generateTestLink = async () => {
    try {
      // const partnerId = this.state.partnerId ? this.state.partnerId : null;
      const mobile = `0${userDetails.mobileNumber}`;
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
      axios
        .get(
          `${process.env.REACT_APP_CHANAKYA_BASE_URL}helpline/register_exotel_call?ngCallType=getEnrolmentKey&From=0${userDetails.mobileNumber}&partner_id=112`
        )
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
      const params = {
        firstName: userDetails.firstName,
        middleName: userDetails.middleName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber,
      };
      const queryString = Object.keys(params)
        .map((filter) => {
          if (params[filter]) {
            return `${filter}=${params[filter]}`;
          }
          return null;
        })
        .filter((item) => item)
        .join("&");

      const url = `${testUrl}${enrolmentKey}?${queryString}`;
      console.log("url", url);

      window.open(url, "_blank");
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const giveTest = async () => {
    if (
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.mobileNumber
    ) {
      toast.error(
        "To attempt the test, it is compulsory to enter your First Name, Last Name and Mobile Number. Middle Name is optional, you can choose not to enter.",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      return;
    }
    if (userDetails.mobileNumber.toString().length !== 10) {
      toast.error("Please give 10 digits of the mobile number.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    await isDuplicate();
  };

  const isDuplicate = () => {
    const { firstName, middleName, lastName, mobileNumber } = userDetails;
    axios
      .get(`${process.env.REACT_APP_CHANAKYA_BASE_URL}/check_duplicate`, {
        params: {
          Name: firstName.concat(" ", middleName, lastName),
          Number: mobileNumber,
        },
      })
      .then(async (data) => {
        const response = data.data.data;
        console.log("alreadyGivenTest", response.alreadyGivenTest);
        const stage = response.pendingInterviewStage;
        const url = `https://admissions.navgurukul.org/check_duplicate/Name=${firstName}${middleName}${lastName}&Number=${mobileNumber}&Stage=${stage}`;
        if (response.alreadyGivenTest) {
          window.open(url, "_blank");
        } else {
          generateTestLink();
        }
      });
  };

  const changeHandler = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  console.log("userDetails", userDetails);

  return (
    <div className="admission">
      <div className="left-section">
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
          <button onClick={giveTest}>Give Admissions Test</button>
        </div>
        <div className="test-form down">
          <h2>Check Test Result via Registered Mobile Number </h2>
          <div className="input-form">
            <div className="input">
              <span>Mobile Number</span>
              <input
                type="text"
                placeholder="Mobile Number..."
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                value={mobile}
              />
            </div>
          </div>
          <button>
            <a
              className="result-btn"
              href={`https://admissions.navgurukul.org/status/${mobile}`}
              target="_blank"
            >
              Check Result{" "}
            </a>{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admission;

// http://dev-join.navgurukul.org/api/on_assessment/questions/A73OG2

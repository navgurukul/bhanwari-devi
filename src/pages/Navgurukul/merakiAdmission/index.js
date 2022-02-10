import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import YouTube from "react-youtube";
import { METHODS } from "../../../services/api";
import { useSelector } from "react-redux";
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
  const [partnerId, setPartnerId] = useState("");
  const user = useSelector(({ User }) => User);

  let userToken = localStorage.getItem("Token");

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
      headers: {
        accept: "application/json",
        Authorization: userToken != null ? userToken : user.data.token,
      },
    }).then((res) => {
      setPartnerId(res.data.user.partner_id);
    });
  }, []);

  const testUrl = "http://dev-join.navgurukul.org/k/";

  const generateTestLink = async () => {
    try {
      const mobile = `0${userDetails.mobileNumber}`;
      const dataURL = `${process.env.REACT_APP_CHANAKYA_BASE_URL}helpline/register_exotel_call`;
      const response = await axios.get(dataURL, {
        params: {
          ngCallType: "getEnrolmentKey",
          From: mobile,
          partner_id: partnerId || null,
        },
      });
      setEnrolmentKey(response.data.key);
      const params = {
        firstName: userDetails.firstName,
        middleName: userDetails.middleName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber,
      };
      const queryString = Object.keys(params)
        .filter((key) => params[key])
        .map((key) => `${key}=${params[key]}`)
        .join("&");

      const url = `${testUrl}${enrolmentKey}?${queryString}`;

      window.open(url, "_blank");
      return response;
    } catch (e) {}
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
    if (!/^[0-9]{10}$/.test(userDetails.mobileNumber.toString())) {
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
          Name: firstName + " " + middleName + lastName,
          Number: mobileNumber,
        },
      })
      .then(async (data) => {
        const response = data.data.data;
        const stage = response.pendingInterviewStage;
        const url =
          `${process.env.REACT_APP_ADMISSIONS_URL}check_duplicate/` +
          new URLSearchParams({
            Name: `${firstName}${middleName}${lastName}`,
            Number: mobileNumber,
            Stage: stage,
          }).toString();
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

  return (
    <div className="admission">
      <div className="left-section">
        <YouTube className={"video-alumni"} videoId={`vuSwndj5cbs`} />;
        <div className="video-label">Experience of NG Alumni & Graduates</div>
      </div>
      <div className="right-section">
        <div className="test-form">
          <h2 className="scholarship-test">
            Software Engineering Scholarship Test
          </h2>
          <div className="input-form">
            <div className="form-row">
              <div className="input-field-test">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  placeholder="Abhi..."
                  value={userDetails.firstName}
                  name="firstName"
                  onChange={changeHandler}
                  id="firstName"
                  required
                />
              </div>
              <div className="input-field-test">
                <label htmlFor="middleName">Middle Name (Optional)</label>
                <input
                  type="text"
                  placeholder="Kumar..."
                  value={userDetails.middleName}
                  name="middleName"
                  onChange={changeHandler}
                  id="middleName"
                />
              </div>
              <div className="input-field-test">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  placeholder="Garg..."
                  value={userDetails.lastName}
                  name="lastName"
                  onChange={changeHandler}
                  id="lastName"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="input-field-test">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="tel"
                  pattern="^[0-9]{10}$"
                  placeholder="9874500000"
                  value={userDetails.mobileNumber}
                  name="mobileNumber"
                  onChange={changeHandler}
                  id="mobileNumber"
                  required
                />
              </div>
            </div>
          </div>
          <button className="test-btn" onClick={giveTest}>
            Give Admissions Test
          </button>
        </div>

        <form className="test-form down">
          <h2>Check Test Result via Registered Mobile Number </h2>
          <div className="input-form">
            <div className="input-field-test">
              <label>Mobile Number</label>
              <input
                type="tel"
                pattern="^[0-9]{10}$"
                placeholder="9874500000"
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                value={mobile}
              />
            </div>
          </div>
          <button className="test-btn">
            <a
              className="result-btn"
              href={`${process.env.REACT_APP_ADMISSIONS_URL}status/${mobile}`}
              target="_blank"
            >
              Check Result
            </a>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admission;

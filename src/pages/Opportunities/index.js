import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";

function Opportunities() {
  const [partner, setPartner] = useState([]);
  const [users, setUsers] = useState();
  const user = useSelector(({ User }) => User);
  const userId = user.data.user.partner_id;

  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzMTYiLCJlbWFpbCI6InBvb25hbUBuYXZndXJ1a3VsLm9yZyIsImlhdCI6MTYzNDU0ODc1OCwiZXhwIjoxNjY2MTA2MzU4fQ.PbvSCQbum3kigzwJs7BoSJPOFrqx6F70Rj6c-5AWOOo";

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
      headers: {
        accept: "application/json",
        Authorization: Token,
      },
    }).then((res) => {
      setUsers(res.data.user.partner_id);
    });
  }, []);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      // console.log(res, '===========')
      setPartner(res.data.partners);
    });
  }, []);

  let slug;
  for (const item of partner) {
    if (item.id == userId) {
      slug = item.slug;
      break;
    } else if (item.id == users) {
      slug = item.slug;
      break;
    } else {
      slug = null;
    }
  }

  return (
    <div className="container-for-course-opportunity">
      <div className="content-section">
        <section>
          <h2 className="section-heading">
            {" "}
            Curated list of opportunities to skyrocket your career
          </h2>
          <p className="advanced-course-heading "> Admission Opportunities </p>
          <div className="opportunity-cards-container">
            <div className="opportunity-info-card">
              <div className="dispaly">
                <div className="opportunity-card-title">
                  NavGurukul One-Year Residential Programmme
                </div>
                <div>
                  <span className="featured"> Featured</span>
                </div>
              </div>
              <div className="opportunity-card-description">
                Eligibility: Basic coding knowledge
              </div>

              {slug ? (
                <a
                  className="opportunity-card-form"
                  href={`https://admissions.navgurukul.org/partnerLanding/${slug}`}
                  target="_blank"
                >
                  Take a Test Today{" "}
                  <i class="fas fa-angle-right test-icon"> </i>{" "}
                </a>
              ) : (
                <a
                  className="opportunity-card-form"
                  href="https://admissions.navgurukul.org/"
                  target="_blank"
                >
                  Take a Test Today{" "}
                  <i class="fas fa-angle-right test-icon"> </i>{" "}
                </a>
              )}
            </div>
            <div className="opportunity-info-card">
              <div className="opportunity-card-title">
                HyperVerge Fellowships{" "}
              </div>
              <div className="opportunity-card-description">
                Eligibility: Basic coding knowledge
              </div>
              <a
                className="opportunity-link"
                href="https://apply.workable.com/hyperverge/j/BDA16E2E25/"
                target="_blank"
              >
                Apply Now <i class="fas fa-angle-right  test-icon "> </i>
              </a>
            </div>
          </div>
        </section>
        <section>
          <p className="advanced-course-heading">
            Grants / Advanced Courses / Mentorships{" "}
          </p>
          <p className="details-of-advanced-courses">
            By learning with Meraki, you can avail benefits such as:
            <ul>
              <li> Grants such as free keyboards for typing practice</li>
              <li> Coursera Membership</li>
              <li> Advanced english courses</li>
              <li> 1:1 Mentorship sessions</li>
            </ul>
          </p>
          <p className="more-opportunities">
            {" "}
            Are you interested in one or more of the above opportunities?
          </p>
          <div>
            <button className="apply-btn">
              {" "}
              <a
                className="button-apply"
                href="https://docs.google.com/forms/d/e/1FAIpQLSd7XgipoTYVME5xovEffKOLr0vzjDIfbnJ-fDK5KpIjZSqZgA/viewform"
                target="_blank"
              >
                Apply Now{" "}
              </a>{" "}
              <i class="fas fa-angle-right aplly-icon"> </i>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Opportunities;

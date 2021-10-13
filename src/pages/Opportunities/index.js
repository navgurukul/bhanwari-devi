import React from "react";
import "./styles.scss";

function Opportunities() {
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

              <a className="opportunity-card-form" href="#">
                Take a Test Today <i class="fas fa-angle-right test-icon"> </i>{" "}
              </a>
            </div>
            <div className="opportunity-info-card">
              <div className="opportunity-card-title">
                HyperVerge Fellowships{" "}
              </div>
              <div className="opportunity-card-description">
                Eligibility: Basic coding knowledge
              </div>
              <a className="opportunity-link" href="#">
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
              <span className="button-apply">Apply Now </span>{" "}
              <i class="fas fa-angle-right aplly-icon"> </i>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Opportunities;

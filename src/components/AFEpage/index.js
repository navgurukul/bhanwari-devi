import React from "react";
import "./styles.scss";

function AFEpage() {
  return (
    <div className="AFE-container">
      <div className="amazon_logo">
        <img src={require("../../asset/amazon_logo.png")} />
      </div>
      <div className="AFE-section">
        <h2 className="AFE-title">Closing the gender gap in technology</h2>
        <div className="AFE-details">
          <p>
            India’s tech industry employs 10 million people; however, women only
            make up 34% of the workforce. Women represent 40% of entry-level
            tech jobs & the representation gets lower as they move up with 30%
            at the mid-level positions and as low as 20% in senior roles.
          </p>
          <p>
            To reduce the gender gap in technology and equip them with CS
            readiness skills, we work with young women from underserved
            communities.
          </p>
        </div>
        <div className="AFE-details">
          <h2 className="heading">Our Mission</h2>
          <p>
            NavGurukul is a registered non-profit organization working towards
            the financial empowerment of students from underserved communities.
            Started in 2016 by IIT-D Alumnus, the organization equips the youth
            with 21st-century skills through programming, coding, critical
            thinking, and problem-solving with a commitment to support its
            students until their placements.
          </p>
          <p>
            Navgurukul offers a 1-year fully-funded skilling and recruitment
            program in software engineering that enables them to secure
            aspirational careers.
          </p>
        </div>
        <div className="AFE-details">
          <h2 className="heading">Our Approach</h2>
          <p>
            Navgurukul is working with a two-step approach to make our students
            CS ready and placed in tech jobs.
            <ul>
              <li>
                <div className="AFE-approaches-title">
                  Accessibility and readiness program: Meraki
                </div>
                Age group: 13+ girls/ women
              </li>
              <li>
                <div className="AFE-approaches-title">
                  Skilling and job placement program: Residential Program
                </div>
                Age group 18 - 29 years
              </li>
            </ul>
          </p>
        </div>
        <div className="AFE-details">
          <h2 className="heading">NavGurukul 🤝 Amazon Future Engineer</h2>
          <p>
            Amazon Future Engineer (AFE) is a comprehensive childhood-to-career
            program to increase access to computer science education for
            children and young adults who typically lack these opportunities.
          </p>
          <p>
            To take its mission forward in India, AFE has partnered with
            Navguruku in its Meraki program to close the gender gap in
            technology. Meraki is an android application focused on making
            programming and digital skills accessible to learners from different
            communities through a smartphone to create direct job opportunities
            or admissions to aspirational training programs. The focus area is
            young women and girls to bridge the gender gap in the digital
            literacy sector.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AFEpage;

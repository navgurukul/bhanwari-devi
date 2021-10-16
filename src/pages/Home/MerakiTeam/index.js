import React, { useState } from "react";
import "./styles.scss";
import { teamMembers, volunteers } from "./config/index.js";

function MerakiTeam() {
  const [members, setMembers] = useState(teamMembers);

  console.log("teamMembers", teamMembers);

  return (
    <>
      <main className="home">
        <section className="page-section">
          <div className="bg-image">
            <div className="core-members">
              <p className="team-number">20</p>
              <p className="team-word">Core Members</p>
            </div>
            <hr class="team-hr-line" />
            <div className="volunteers">
              <p className="volunteer-word">Volunteer</p>
              <p className="volunteer-number">100+</p>
              {/* <hr class="horizontal-line" /> */}
            </div>
            <hr class="volunteer-hr-line" />
            <p className="about-team">
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
              qui esse pariatur duis deserunt mollit dolore cillum minim tempor
              enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut
              voluptate aute id deserunt nisi.
            </p>
            <button type="button" className="join-us">
              Join Us
            </button>
            <button type="button" className="meraki-volunteer">
              Volunteer at Meraki
            </button>
          </div>
        </section>
        <section className="page-section">
          {/* <h2 className="Meraki-section-title">Core Members</h2> */}
          <div className="core-team">
            <button
              className="Meraki-section-title"
              onClick={() => {
                setMembers(teamMembers);
              }}
            >
              Core Team
            </button>
            <hr class="hr-line" />
          </div>
          <div className="our-suppoters">
            <button
              className="Meraki-section-title"
              onClick={() => {
                setMembers(volunteers);
              }}
            >
              Our Supporters
            </button>
            <hr class="hr-line" />
          </div>
          <div className="team-info-cards-container">
            {console.log("members", members)}
            {members.map((item) => {
              return (
                <>
                  <div class="card-details">
                    <img
                      src={require("./assets/teamMember.png")}
                      className="team-info-card-img"
                      //   className="bio-social-media-image"
                    />
                    <div className="team-info-card-title">{item.name}</div>
                    <div className="team-info-card-designation">
                      {item.designation}
                    </div>
                    <div className="hide">{item.description}</div>
                  </div>
                  {/* <div className="hide">{item.description}</div> */}
                </>
              );
            })}
          </div>
          {/* <hr class="new5"></hr> */}
        </section>
      </main>
    </>
  );
}

export default MerakiTeam;

import React from "react";
import "./styles.scss";
import Gallery from "../../components/Gallery";
import BioItem from "../../components/BioItem";

const teamMembers = [
  {
    name: "Abhishek Gupta",
    bio: "CEO, Navgurukul & Meraki",
    image: require("./assets/teamMember.png"),
    description:
      "IITD '13 CS graduate. Co-founded Zumbl.com and FranklyMe. Zumbl was acquired and FranklyMe raised more than 2.6M$ from Matrix Partners and others.",
    socialMedia: [
      {
        image: require("./assets/linkedin.svg"),
        link: "",
      },
      {
        image: require("./assets/twitter.svg"),
        link: "",
      },
    ],
  },
  {
    name: "Abhishek Gupta",
    bio: "CEO, Navgurukul & Meraki",
    image: require("./assets/teamMember.png"),
    description:
      "IITD '13 CS graduate. Co-founded Zumbl.com and FranklyMe. Zumbl was acquired and FranklyMe raised more than 2.6M$ from Matrix Partners and others.",
    socialMedia: [
      {
        image: require("./assets/linkedin.svg"),
        link: "",
      },
      {
        image: require("./assets/twitter.svg"),
        link: "",
      },
    ],
  },
  {
    name: "Abhishek Gupta",
    bio: "CEO, Navgurukul & Meraki",
    image: require("./assets/teamMember.png"),
    description:
      "IITD '13 CS graduate. Co-founded Zumbl.com and FranklyMe. Zumbl was acquired and FranklyMe raised more than 2.6M$ from Matrix Partners and others.",
    socialMedia: [
      {
        image: require("./assets/linkedin.svg"),
        link: "",
      },
      {
        image: require("./assets/twitter.svg"),
        link: "",
      },
    ],
  },
  {
    name: "Abhishek Gupta",
    bio: "CEO, Navgurukul & Meraki",
    image: require("./assets/teamMember.png"),
    description:
      "IITD '13 CS graduate. Co-founded Zumbl.com and FranklyMe. Zumbl was acquired and FranklyMe raised more than 2.6M$ from Matrix Partners and others.",
    socialMedia: [
      {
        image: require("./assets/linkedin.svg"),
        link: "",
      },
      {
        image: require("./assets/twitter.svg"),
        link: "",
      },
    ],
  },
  {
    name: "Abhishek Gupta",
    bio: "CEO, Navgurukul & Meraki",
    image: require("./assets/teamMember.png"),
    description:
      "IITD '13 CS graduate. Co-founded Zumbl.com and FranklyMe. Zumbl was acquired and FranklyMe raised more than 2.6M$ from Matrix Partners and others.",
    socialMedia: [
      {
        image: require("./assets/linkedin.svg"),
        link: "",
      },
      {
        image: require("./assets/twitter.svg"),
        link: "",
      },
    ],
  },
];

const partners = [
  {
    name: "Hope Foundation",
    footerMsg: "- Suresh G, Program Director",
    image: require("./assets/partner.png"),
    description:
      "IITD '13 CS graduate. Co-founded Zumbl.com and FranklyMe. Zumbl was acquired and FranklyMe raised more than 2.6M$ from Matrix Partners and others.",
    socialMedia: [
      {
        image: require("./assets/linkedin.svg"),
        link: "",
      },
      {
        image: require("./assets/twitter.svg"),
        link: "",
      },
    ],
  },
  {
    name: "Hope Foundation",
    footerMsg: "- Suresh G, Program Director",
    image: require("./assets/partner.png"),
    description:
      "IITD '13 CS graduate. Co-founded Zumbl.com and FranklyMe. Zumbl was acquired and FranklyMe raised more than 2.6M$ from Matrix Partners and others.",
    socialMedia: [
      {
        image: require("./assets/linkedin.svg"),
        link: "",
      },
      {
        image: require("./assets/twitter.svg"),
        link: "",
      },
    ],
  },
  {
    name: "Hope Foundation",
    footerMsg: "- Suresh G, Program Director",
    image: require("./assets/partner.png"),
    description:
      "IITD '13 CS graduate. Co-founded Zumbl.com and FranklyMe. Zumbl was acquired and FranklyMe raised more than 2.6M$ from Matrix Partners and others.",
    socialMedia: [
      {
        image: require("./assets/linkedin.svg"),
        link: "",
      },
      {
        image: require("./assets/twitter.svg"),
        link: "",
      },
    ],
  },
  {
    name: "Hope Foundation",
    footerMsg: "- Suresh G, Program Director",
    image: require("./assets/partner.png"),
    description:
      "IITD '13 CS graduate. Co-founded Zumbl.com and FranklyMe. Zumbl was acquired and FranklyMe raised more than 2.6M$ from Matrix Partners and others.",
    socialMedia: [
      {
        image: require("./assets/linkedin.svg"),
        link: "",
      },
      {
        image: require("./assets/twitter.svg"),
        link: "",
      },
    ],
  },
  {
    name: "Hope Foundation",
    footerMsg: "- Suresh G, Program Director",
    image: require("./assets/partner.png"),
    description:
      "IITD '13 CS graduate. Co-founded Zumbl.com and FranklyMe. Zumbl was acquired and FranklyMe raised more than 2.6M$ from Matrix Partners and others.",
    socialMedia: [
      {
        image: require("./assets/linkedin.svg"),
        link: "",
      },
      {
        image: require("./assets/twitter.svg"),
        link: "",
      },
    ],
  },
];

export const Home = () => {
  return (
    <main className="home">
      <div className="page-content">
        <h1 className="page-title">
          Let income not be a barrier to your career dreams
        </h1>
        <section className="page-section first-page-section">
          <p className="page-subtitle">
            With Meraki, begin your programming journey for free today
          </p>
          <button className="primary-btn">Start Learning</button>
          <button
            className="primary-btn primary-btn--inverted home-playstore-download-btn"
            style={{ marginLeft: 20 }}
          >
            <img
              src={require("./assets/playstore.svg")}
              className="home-playstore-icon"
            />
            <span className="home-playstore-btn-text">Download Meraki</span>
          </button>
        </section>
        <section className="page-section relative">
          <div className="user-card" style={{ left: 80 }}>
            <div className="popup-card" style={{ maxWidth: 150 }}>
              I want to be a typing assistant
            </div>
            <img
              className="home-user-image"
              src={require("./assets/user1.png")}
            />
          </div>
          <div className="user-card" style={{ right: 30 }}>
            <div className="popup-card" style={{ maxWidth: 250 }}>
              I want to to be the first software engineer in my family
            </div>
            <img
              className="home-user-image"
              src={require("./assets/user2.png")}
            />
          </div>
          <img
            className="home-user-image absolute"
            style={{ top: 180, transform: "translateX(-150px)" }}
            src={require("./assets/user3.png")}
          />
          <img
            className="home-user-image absolute"
            style={{ top: 180, right: 300 }}
            src={require("./assets/user4.png")}
          />
          <img
            className="home-user-image absolute"
            style={{ top: 300, left: 100 }}
            src={require("./assets/user5.png")}
          />
          <img
            className="home-user-image absolute"
            style={{ top: 300, right: 100 }}
            src={require("./assets/user6.png")}
          />
          <img src={require("./assets/android.svg")} />
          <hr className="section-bottom-border" />
        </section>
        <section className="page-section">
          <h2 className="section-title">Explore the learning tracks</h2>
          <div className="info-cards-container">
            <div className="info-card">
              <img
                className="info-card-img"
                src={require("./assets/python.svg")}
              />
              <div className="info-card-title">Python</div>
              <div className="info-card-description">
                Get familiar with programming with bite sized lesson
              </div>
            </div>
            <div className="info-card">
              <img
                className="info-card-img"
                src={require("./assets/typing.svg")}
              />
              <div className="info-card-title">Typing</div>
              <div className="info-card-description">
                Learn to type with accuracy and speed
              </div>
            </div>
            <div className="info-card">
              <img
                className="info-card-img"
                src={require("./assets/web-development.svg")}
              />
              <div className="info-card-title">Web Development</div>
              <div className="info-card-description">
                Learn the basics of tech that power the web
              </div>
            </div>
            <div className="info-card">
              <img
                className="info-card-img"
                src={require("./assets/language.svg")}
              />
              <div className="info-card-title">English</div>
              <div className="info-card-description">
                Master English with easy to understand courses
              </div>
            </div>
            <div className="info-card">
              <img
                className="info-card-img"
                src={require("./assets/soft-skills.svg")}
              />
              <div className="info-card-title">Soft Skills</div>
              <div className="info-card-description">
                Interview preparation to get you job ready
              </div>
            </div>
            <div className="info-card">
              <img
                className="info-card-img"
                src={require("./assets/misc.svg")}
              />
              <div className="info-card-title">Miscellaneous</div>
              <div className="info-card-description">
                Courses on Android, Game dev, projects and more
              </div>
            </div>
          </div>
        </section>
        <section className="page-section">
          <h2 className="section-title">
            How can Meraki help with your concerns?
          </h2>
          <div className="info-cards-container">
            <div className="info-card">
              <img
                className="info-card-img"
                src={require("./assets/learn-python.svg")}
              />
              <div className="info-card-description">
                How will I learn Python without a teacher?
              </div>
            </div>
            <div className="info-card">
              <img
                className="info-card-img"
                src={require("./assets/never-typed.svg")}
              />
              <div className="info-card-description">
                I have never typed on a computer keyboard before
              </div>
            </div>
            <div className="info-card">
              <img
                className="info-card-img"
                src={require("./assets/difficulty-english.svg")}
              />
              <div className="info-card-description">
                I face difficulty in understanding and speaking English
              </div>
            </div>
            <div>
              <img src={require("./assets/down-swirly.svg")} />
              <div className="info-card-description info-card">
                Learn through interactive classes and self study material
              </div>
            </div>
            <div>
              <img src={require("./assets/down-swirly.svg")} />
              <div className="info-card-description info-card">
                Get accurate and fast with our typing guru track
              </div>
            </div>
            <div>
              <img src={require("./assets/down-swirly.svg")} />
              <div className="info-card-description info-card">
                Become confident with our spoken English track
              </div>
            </div>
          </div>
          <div>
            <img src={require("./assets/down-swirly.svg")} />
            <div style={{ marginTop: 20 }}>
              Our aim is to help you get technical and soft skills to become
              ready for advanced learning schools such as Zoho or Navgurukul
            </div>
          </div>
        </section>
        <section className="page-section">
          <h2 className="section-title">The Team behind Meraki</h2>
          <Gallery Component={BioItem} items={teamMembers} />
          <p className="base-font home-see-all-members page-section-footer">
            <span>See all team members and volunteers </span>
            <i className="fa fa-chevron-right" />
          </p>
        </section>
        <section className="page-section">
          <h2 className="section-title">Our Partners</h2>
          <p className="base-font">
            22 partners &bull; Across 7 states &bull; Offering volunteering and
            funding
          </p>
          <Gallery Component={BioItem} items={partners} />
          <p className="base-font home-see-all-members page-section-footer">
            <span>See all our partners </span>
            <i className="fa fa-chevron-right" />
          </p>
        </section>
      </div>
    </main>
  );
};

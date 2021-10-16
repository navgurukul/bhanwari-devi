import React from "react";
import "./styles.scss";

function Partners() {
  const partners = [
    {
      name: "Hope Foundation",
      footerMsg: "- Suresh G, Program Director",
      image: require("./assets/partner.png"),
      description:
        "IITD '13 CS graduate. Co-founded Zumbl.com and FranklyMe. Zumbl was acquired and FranklyMe raised more than 2.6M$ from Matrix Partners and others.",
      socialMedia: [
        {
          //   image: require("./assets/linkedin.svg"),
          link: "",
        },
        {
          image: require("./assets/twitter.svg"),
          link: "",
        },
        {
          image: require("./assets/reshot-icon.png"),
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
        {
          image: require("./assets/reshot-icon.png"),
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
        {
          image: require("./assets/reshot-icon.png"),
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
        {
          image: require("./assets/reshot-icon.png"),
          link: "",
        },
      ],
    },
  ];

  return (
    <div className="container-for-partners">
      <div className="partner-content">
        <h2 className="deading-of-partners">Our Partners</h2>
        <div className="partner-overview-cards-container">
          <div className="partner-overview-card">
            <div className="partner-overview-card-title">50</div>
            <div className="partner-overview-card-description">
              Total Partners
            </div>
          </div>
          <div className="partner-overview-card">
            <div className="partner-overview-card-title">2000+</div>
            <div className="partner-overview-card-description">Students</div>
          </div>
          <div className="partner-overview-card">
            <div className="partner-overview-card-title">8</div>
            <div className="partner-overview-card-description">
              Indian States
            </div>
          </div>
        </div>
        <p className="about-partners">
          Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui
          esse pariatur duis deserunt mollit dolore cillum minim tempor enim.
          Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate
          aute id deserunt nisi.
        </p>
        <div>
          <button className="Join-partner-btn">Join as a Partner</button>
        </div>
        <h2 className="recent-partners">Recent Partners</h2>
        <div className="partners-info-cards-container">
          {partners.map((item) => {
            return (
              <>
                <div className="partners-info-card">
                  <div className="partners-info-card-title">{item.name}</div>
                  <div className="partners-info-card-description">
                    {item.description}
                  </div>
                  <div className="social-media">
                    <div className="social-img">
                      <img
                        className="partners-info-card-img"
                        src={require("./assets/reshot-icon.png")}
                      />

                      <img
                        className="partners-info-card-img"
                        src={require("./assets/linkedin.svg")}
                      />
                      <img
                        className="partners-info-card-img"
                        src={require("./assets/twitter.svg")}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <h2 className="long-partners">
          Long Term Parnters (With us &#62; 1 Year)
        </h2>
        <div className="partners-info-cards-container">
          {partners.map((item) => {
            return (
              <>
                <div className="partners-info-card">
                  <div className="partners-info-card-title">{item.name}</div>
                  <div className="partners-info-card-description">
                    {item.description}
                  </div>
                  <div className="social-media">
                    <div className="social-img">
                      <img
                        className="partners-info-card-img"
                        src={require("./assets/reshot-icon.png")}
                      />

                      <img
                        className="partners-info-card-img"
                        src={require("./assets/linkedin.svg")}
                      />
                      <img
                        className="partners-info-card-img"
                        src={require("./assets/twitter.svg")}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Partners;

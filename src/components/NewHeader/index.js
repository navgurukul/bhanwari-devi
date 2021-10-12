import React from "react";
import "./styles.scss";

function Header() {
  return (
    <div class="wrapper">
      <nav>
        <input type="checkbox" id="show-menu" />
        <label for="show-menu" class="menu-icon">
          <i class="fas fa-bars"></i>
        </label>
        <div class="content">
          <div class="meraki">
            <a href="#"></a>
          </div>
          <div class="meraki-name">
            <a href="#"></a>
          </div>
          <ul class="links">
            <li>
              <a href="#" class="desktop-link">
                Explore{" "}
                <span>
                  <i className="fa fa-angle-down"></i>
                </span>
              </a>
              <input type="checkbox" id="show-features" />
              <label for="show-features">Explore</label>
              <ul className="komal">
                <section className="page-sectionm">
                  {/* <h2 className="section-title"> learning tracks</h2> */}
                  <div className="nav-info-cards-container">
                    <div className="nav-info-card">
                      <div className="course-image-contain">
                        <div className="nav-info-card-title">Python</div>
                        <img
                          className="nav-info-card-img"
                          src={require("./assets/python.svg")}
                        />
                      </div>

                      <div className="nav-info-card-description">
                        Get familiar with programming with bite sized lesson
                      </div>
                    </div>
                    <div className="nav-info-card">
                      <div className="course-image-contain">
                        <div className="nav-info-card-title">Typing</div>
                        <img
                          className="nav-info-card-img"
                          src={require("./assets/typing.svg")}
                        />
                      </div>
                      <div className="nav-info-card-description">
                        Learn to type with accuracy and speed
                      </div>
                    </div>

                    <div className="nav-info-card">
                      <div className="course-image-contain">
                        <div className="nav-info-card-title">
                          Web Development
                        </div>
                        <img
                          className="nav-info-card-img"
                          src={require("./assets/web-development.svg")}
                        />
                      </div>
                      <div className="nav-info-card-description">
                        Learn the basics of tech that power the web
                      </div>
                    </div>
                    <div className="nav-info-card">
                      <div className="course-image-contain">
                        <div className="nav-info-card-title">English</div>
                        <img
                          className="nav-info-card-img"
                          src={require("./assets/language.svg")}
                        />
                      </div>
                      <div className="nav-info-card-description">
                        Master English with easy to understand courses
                      </div>
                    </div>
                    <div className="nav-info-card">
                      <div className="course-image-contain">
                        <div className="nav-info-card-title">Soft Skills</div>
                        <img
                          className="nav-info-card-img"
                          src={require("./assets/soft-skills.svg")}
                        />
                      </div>

                      <div className="nav-info-card-description">
                        Interview preparation to get you job ready
                      </div>
                    </div>
                    <div className="nav-info-card">
                      <div className="course-image-contain">
                        <div className="nav-info-card-title">Miscellaneous</div>
                        <img
                          className="nav-info-card-img"
                          src={require("./assets/misc.svg")}
                        />
                      </div>

                      <div className="nav-info-card-description">
                        Courses on Android, Game dev, projects and more
                      </div>
                    </div>
                  </div>
                </section>
              </ul>
            </li>
            <li>
              <a href="#" class="desktop-link">
                About{" "}
                <span>
                  <i className="fa fa-angle-down"></i>
                </span>
              </a>
              <input type="checkbox" id="show-services" />
              <label for="show-services">About</label>
              <ul>
                <li>
                  <a href="#">Meraki Team</a>
                </li>
                <li>
                  <a href="#">Alumni</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Join Us</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Partners</a>
            </li>
            <li>
              <input
                className="search-course"
                type="text"
                placeholder="Courses,tracks..."
              />
            </li>
            <li className="nav-left">
              <a href="#" class="desktop-link">
                English{" "}
                <span>
                  <i className="fa fa-angle-down"></i>
                </span>
              </a>
              <input type="checkbox" id="show-services" />
              <label for="show-services">English</label>
              <ul>
                <li>
                  <a href="#">Hindi</a>
                </li>
              </ul>
            </li>
            {/* <li className="komala"><a href="#">English <span><i className="fa fa-angle-down"></i></span></a></li> */}
            <li className="nav-login">
              <button className="btn">Log In</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;

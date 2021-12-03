import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { METHODS } from "../../../services/api";
import star from "../../../asset/ratingIcon.svg";
import moment from "moment";
import "./styles.scss";

function VolunteerDashboard() {
  const [volunteer, setVolunteer] = useState([]);
  const [cacheVolunteer, setCacheVolunteer] = useState([]);
  const [language, setLangue] = useState({
    All: true,
    Hindi: false,
    English: false,
  });
  const [selctedPathway, setSelectedPathway] = useState("");
  const [dropdowns, setDropdowns] = useState({
    duration: false,
    language: false,
    rating: false,
  });
  const [week, setWeek] = useState({
    one: false,
    four: false,
    eight: false,
    twelve: false,
  });

  const handleDropdown = (e) => (key) => {
    setDropdowns({ ...dropdowns, [key]: !dropdowns[key] });
  };

  // handle language function
  const handleLanguage = (e) => (key) => {
    setLangue({ ...language, [key]: !language[key] });
  };

  const user = useSelector(({ User }) => User);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/volunteers`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      console.log(res.data, "data");
      setVolunteer(res.data);
      setCacheVolunteer(res.data);
    });
  }, []);

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
  };

  function filterPathway(pathway, volunteer) {
    return volunteer.filter((el) => {
      for (let i of el.pathways) {
        if (i === pathway) {
          return true;
        }
      }
    });
  }

  function filterweek() {
    let date = Date.now();
    return volunteer.filter((el) => {
      const cur_date = new Date(el.classes[el.classes.length - 1].end_time);
      if (week["one"] && cur_date <= date - 7 * 24 * 60 * 60 * 1000) {
        return true;
      } else if (week["four"] && cur_date <= date - 28 * 24 * 60 * 60 * 1000) {
        return true;
      } else if (week["eight"] && cur_date <= date - 56 * 24 * 60 * 60 * 1000) {
        return true;
      } else if (
        week["twelve"] &&
        cur_date <= date - 84 * 24 * 60 * 60 * 1000
      ) {
        return true;
      }
    });
  }

  function numberOfWeek(el) {
    let last_date = new Date(el.classes[el.classes.length - 1].end_time);
    let new_date = new Date(el.classes[0].end_time);
    return Math.ceil((last_date - new_date) / (7 * 24 * 60 * 60 * 1000));
  }

  function filterLanguage() {
    return cacheVolunteer.filter((el) => {
      if (language["All"]) return true;
      return language[languageMap[el.classes[el.classes.length - 1].lang]];
    });
  }

  return (
    <>
      <div className="volunteer-container">
        <div>
          <input
            className="volunteer-search-bar"
            type="text"
            placeholder="Search by Name "
          />
        </div>

        <div className="filter-items">
          <button
            className={
              "filter-button " +
              (selctedPathway === "Python" ? "selectedPathway" : "")
            }
            onClick={() => {
              setVolunteer(filterPathway("Python", cacheVolunteer));
              setSelectedPathway("Python");
            }}
          >
            Python(100)
          </button>
          <button
            className={
              "filter-button " +
              (selctedPathway === "JavaScript" ? "selectedPathway" : "")
            }
            onClick={() => {
              setVolunteer(filterPathway("JavaScript", cacheVolunteer));
              setSelectedPathway("JavaScript");
            }}
          >
            Spoken English (20)
          </button>
          <button
            className={
              "filter-button " +
              (selctedPathway === "Typing" ? "selectedPathway" : "")
            }
            onClick={() => {
              setVolunteer(filterPathway("Typing", cacheVolunteer));
              setSelectedPathway("Typing");
            }}
          >
            Typing (10)
          </button>
          <button
            className={
              "filter-button " +
              (selctedPathway === "Filter" ? "selectedPathway" : "")
            }
            onClick={() => {
              setSelectedPathway("Filter");
              setVolunteer(cacheVolunteer);
            }}
          >
            Filter
          </button>
        </div>

        {selctedPathway === "Filter" ? (
          <div className="filterBar">
            <div className="filter">
              <span>Duration</span>
              <button onClick={(e) => handleDropdown(e)("duration")}>
                All Time
              </button>
              {dropdowns.duration ? (
                <div className="dropdown">
                  <ul>
                    <li>All Time</li>
                    <li>Past 1 week</li>
                    <li>Past 4 week</li>
                    <li>Past 8 week</li>
                    <li>Past 12 week</li>
                  </ul>
                  <span>Apply</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="filter">
              <span>Language</span>
              <button onClick={(e) => handleDropdown(e)("language")}>
                All Languages
              </button>
              {dropdowns.language ? (
                <div className="dropdown">
                  <ul>
                    <li
                      onClick={(e) => {
                        handleLanguage(e)("All");
                      }}
                      className={language["All"] ? "checked" : ""}
                    >
                      All
                    </li>
                    <li
                      onClick={(e) => {
                        handleLanguage(e)("English");
                      }}
                      className={language["English"] ? "checked" : ""}
                    >
                      English
                    </li>
                    <li
                      onClick={(e) => {
                        handleLanguage(e)("Hindi");
                      }}
                      className={language["Hindi"] ? "checked" : ""}
                    >
                      Hindi
                    </li>
                  </ul>
                  <span
                    onClick={(e) => {
                      setVolunteer(filterLanguage());
                      handleDropdown(e)("language");
                    }}
                  >
                    Select (1)
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="filter">
              <span>Avg. Rating</span>
              <button onClick={(e) => handleDropdown(e)("rating")}>All</button>
              {dropdowns.rating ? (
                <div className="dropdown">
                  <ul>
                    <li>
                      <img src={star} />
                      <img src={star} />
                      <img src={star} />
                      <img src={star} />& Above
                    </li>
                    <li>
                      <img src={star} />
                      <img src={star} />
                      <img src={star} />
                    </li>
                    <li>
                      <img src={star} />
                      <img src={star} />
                    </li>
                    <li>
                      <img src={star} />
                    </li>
                  </ul>
                  <span>Select (1)</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        <table className="volunteer-overview-table">
          <thead>
            <tr>
              <th> Name</th>
              <th> No. of Classes </th>
              <th>Engagement (Weeks)</th>
              <th>Last Class Date</th>
              <th>Last Class Title</th>
              <th> Last Class Lang </th>
              <th>Avg.Rating</th>
            </tr>
          </thead>
          <tbody>
            {volunteer.map((item) => {
              const sortedClasses = item.classes.sort((a, b) => {
                return new Date(a.start_time) - new Date(b.start_time);
              });
              // console.log(sortedClasses[sortedClasses.length - 1])
              let getStars = 0;
              let totalStarts = item.classes.length * 5;
              item.classes.map((stars) => {
                getStars = getStars + Number(stars.classes);
              });

              return (
                <tr key={item.id}>
                  {/* <td data-column="Name">{item.name}</td> */}
                  <td data-column="Name">
                    <Link
                      className="t-data"
                      to={{
                        pathname: `/volunteer/${item.id}`,
                        state: {
                          pass: item,
                          passName: item.name,
                        },
                      }}
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td data-column="No.of Classes">{item.classes.length}</td>
                  <td data-column="Engagement Week">{numberOfWeek(item)}</td>
                  <td data-column="Last Class Date">
                    {moment(
                      sortedClasses[sortedClasses.length - 1].start_time
                    ).format("DD-MM-YYYY")}
                  </td>
                  <td data-column="Last Class Title">
                    {item.classes &&
                    item.classes.length > 0 &&
                    item.classes[item.classes.length - 1]["title"] != ""
                      ? item.classes[item.classes.length - 1]["title"]
                      : "NA"}
                  </td>
                  <td data-column="Last class lang">
                    {item.classes &&
                    item.classes.length > 0 &&
                    item.classes[item.classes.length - 1]["lang"] != ""
                      ? languageMap[
                          item.classes[item.classes.length - 1]["lang"]
                        ]
                      : "NA"}
                  </td>
                  <td data-column="Avg.Rating">
                    {/* {item.classes.ratings} */}
                    {/* {item.classes &&
                                            item.classes.length > 0 && item.classes[item.classes.length - 1
                                            ]["ratings"] != ""
                                            ? item.classes[
                                            item.classes.length - 1
                                            ]["ratings"]
                                            : "NA"} */}
                    {[1, 2, 3, 4, 5].map((star) => {
                      return Math.ceil(item.averageRating) > 0 &&
                        star <= Math.ceil(item.averageRating) ? (
                        <span
                          className="fa fa-star"
                          style={{ color: "#D55F31" }}
                        ></span>
                      ) : (
                        <span
                          className="fa fa-star"
                          style={{ color: "gray" }}
                        ></span>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default VolunteerDashboard;

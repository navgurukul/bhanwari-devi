import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { METHODS } from "../../../services/api";
import star from "../../../asset/ratingIcon.svg";
import moment from "moment";
import "./styles.scss";
import { useDebounce } from "use-debounce";
import ReactPaginate from "react-paginate";
import { BsArrowUpDown } from "react-icons/bs";

function VolunteerDashboard() {
  const [volunteer, setVolunteer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [slicedVolunteer, setSlicedVolunteer] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [cacheVolunteer, setCacheVolunteer] = useState([]);
  const [sortMethod, setSortMethod] = useState("dsc");
  const [debouncedText] = useDebounce(searchTerm);
  const [language, setLangue] = useState({
    All: true,
    Hindi: false,
    English: false,
  });

  const limit = 10;
  const pageCount = Math.ceil(volunteer && volunteer.length / limit);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [selctedPathway, setSelectedPathway] = useState("");
  const [dropdowns, setDropdowns] = useState({
    duration: false,
    language: false,
    rating: false,
  });
  const [week, setWeek] = useState("All");

  const handleDropdown = (e) => (key) => {
    setDropdowns({ ...dropdowns, [key]: !dropdowns[key] });
  };

  // handle language function
  const handleLanguage = (e) => (key) => {
    setLangue({ ...language, [key]: !language[key] });
  };

  const handleWeek = (e) => (key) => {
    setWeek({ ...week, [key]: !week[key] });
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
      setSlicedVolunteer(
        res.data.slice(pageNumber * limit, (pageNumber + 1) * limit)
      );
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
    return cacheVolunteer.filter((el) => {
      const cur_date = new Date(el.classes[el.classes.length - 1].end_time);
      if (week === "All") {
        return true;
      }
      if (cur_date >= date - week * 7 * 24 * 60 * 60 * 1000) {
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

  const sortVolunteers = (byMethod) => {
    let sortedVolunteers;
    if (byMethod === "enroll_date") {
      sortedVolunteers = volunteer.sort((a, b) =>
        sortMethod === "asc"
          ? new Date(a.last_class_date) - new Date(b.last_class_date)
          : new Date(b.last_class_date) - new Date(a.last_class_date)
      );
    }
    setVolunteer(sortedVolunteers);
    setSlicedVolunteer(
      sortedVolunteers.slice(pageNumber * limit, (pageNumber + 1) * limit)
    );
    if (sortMethod === "asc") {
      setSortMethod("dsc");
    } else {
      setSortMethod("asc");
    }
  };

  useEffect(() => {
    const data =
      volunteer &&
      volunteer.filter((searchValue) => {
        if (searchTerm == "") {
          return searchValue;
        } else if (
          searchValue.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return searchValue;
        }
      });
    const slicedData = data.slice(pageNumber * limit, (pageNumber + 1) * limit);
    // setVolunteer(data);
    setSlicedVolunteer(slicedData);
  }, [debouncedText, pageNumber]);

  return (
    <>
      <div className="volunteer-container">
        <div>
          <input
            className="volunteer-search-bar"
            type="text"
            placeholder="Search by Name "
            value={debouncedText}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        <div className="filter-items">
          <button
            className={
              "filter-button " +
              (selctedPathway === "Python" ? "selectedPathway" : "")
            }
            onClick={() => {
              setSlicedVolunteer(filterPathway("Python", cacheVolunteer));
              setSelectedPathway("Python");
            }}
          >
            Python(100)
          </button>
          <button
            className={
              "filter-button " +
              (selctedPathway === "spoken-english" ? "selectedPathway" : "")
            }
            onClick={() => {
              setSlicedVolunteer(
                filterPathway("spoken-english", cacheVolunteer)
              );
              setSelectedPathway("spoken-english");
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
              setSlicedVolunteer(filterPathway("Typing", cacheVolunteer));
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
              setSlicedVolunteer(cacheVolunteer);
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
                {week === "All" ? "All Time" : `Past ${week} week`}
              </button>
              {dropdowns.duration ? (
                <div className="dropdown">
                  <ul>
                    <li
                      onClick={() => {
                        setWeek("All");
                      }}
                      className={week === "All" ? "checked" : ""}
                      value="All Time"
                    >
                      All Time
                    </li>
                    <li
                      onClick={() => {
                        setWeek(1);
                      }}
                      className={week === 1 ? "checked" : ""}
                      value="Past 1 week"
                    >
                      Past 1 week
                    </li>
                    <li
                      onClick={() => {
                        setWeek(4);
                      }}
                      className={week === 4 ? "checked" : ""}
                      value="Past 4 week"
                    >
                      Past 4 week
                    </li>
                    <li
                      onClick={() => {
                        setWeek(8);
                      }}
                      className={week === 8 ? "checked" : ""}
                      value="Past 8 week"
                    >
                      Past 8 week
                    </li>
                    <li
                      onClick={() => {
                        setWeek(12);
                      }}
                      className={week === 12 ? "checked" : ""}
                      value="Past 12 week"
                    >
                      Past 12 week
                    </li>
                  </ul>
                  <span
                    onClick={(e) => {
                      setSlicedVolunteer(filterweek());
                      handleDropdown(e)("duration");
                    }}
                  >
                    Apply
                  </span>
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
                      setSlicedVolunteer(filterLanguage());
                      handleDropdown(e)("language");
                    }}
                  >
                    Apply
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
              <th>
                Last Class Date
                <button
                  className="sort-volunteer"
                  onClick={() => sortVolunteers("enroll_date")}
                >
                  <BsArrowUpDown />
                </button>
              </th>
              <th>Last Class Title</th>
              <th> Last Class Lang </th>
              <th>Avg.Rating</th>
            </tr>
          </thead>
          <tbody>
            {volunteer && volunteer.length > 0 ? (
              slicedVolunteer &&
              slicedVolunteer.map((item) => {
                const sortedClasses = item.classes.sort((a, b) => {
                  return new Date(a.start_time) - new Date(b.start_time);
                });
                item.last_class_date =
                  sortedClasses[sortedClasses.length - 1].start_time;
                let getStars = 0;
                let totalStarts = item.classes.length * 5;
                item.classes.map((stars) => {
                  getStars = getStars + Number(stars.classes);
                });

                return (
                  <tr key={item.id}>
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
                        item.last_class_date
                        // sortedClasses[sortedClasses.length - 1].start_time
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
                      : "NA"}  */}
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
              })
            ) : (
              <div className="message ">
                <h3>There are no results to display...</h3>
              </div>
            )}
          </tbody>
        </table>

        <div className="pagination-footer">
          <div>
            <p className="page-descrption">
              Showing {pageNumber * limit + 1}-{(pageNumber + 1) * limit} of{" "}
              {volunteer.length}
            </p>
          </div>
          <div className="pagination">
            <ReactPaginate
              previousLabel={<i className="fa fa-angle-left"></i>}
              nextLabel={<i className="fa fa-angle-right"></i>}
              initialPage={0}
              marginPagesDisplayed={0}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName="paginationBttns-volunteer"
              previousLinkClassName="previousBttn"
              nextLinkClassName="nextBttn"
              disabledClassName="paginationDisabled"
              activeClassName="paginationActive-volunteer"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default VolunteerDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsArrowUpDown } from "react-icons/bs";
import { METHODS } from "../../services/api";
import { useDebounce } from "use-debounce";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./styles.scss";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const getPartnerIdFromUrl = () => {
  let partnerId;
  if (window.location.pathname.includes("partner")) {
    partnerId = window.location.pathname.split("/").pop();
  }
  return partnerId;
};

function MerakiUsers() {
  const [pageNumber, setPageNumber] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);
  const [slicedStudents, setSlicedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMethod, setSortMethod] = useState("dsc");
  const [sort_class, setSortClass] = useState("sorter");
  const [filterVal, setFilterVal] = useState([0, 0]);
  const [filteredData, setFilteredData] = useState(false);
  const [debouncedText] = useDebounce(searchTerm, 400);

  const user = useSelector(({ User }) => User);

  const limit = 10;
  let id = getPartnerIdFromUrl();
  useEffect(() => {
    // let id = getPartnerIdFromUrl();
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/students/classes${
        searchTerm.length > 0 ? `?name=${searchTerm}` : ""
      }`,
      headers: { accept: "application/json", Authorization: user.data.token },
    }).then((res) => {
      if (
        id == user.data.user.partner_id ||
        user.data.user.rolesList.indexOf("admin") > -1
      ) {
        if (res.data.students.length < 1) {
          setMessage("There are no results to display");
        } else {
          const data = res.data.students
            .map((item) => {
              if (item.classes_registered.length > 0) {
                item.averageRating = 0;
                let avg = 0;
                let count = 0;
                item.classes_registered.map((f) => {
                  if (f.feedback.feedback) {
                    avg = avg + parseInt(f.feedback.feedback);
                    count += 1;
                  }
                });
                if (avg > 0) item.averageRating = avg / count;
                else item.averageRating = avg;
                item.classes_registered = item.classes_registered.sort(
                  (c1, c2) => {
                    return new Date(c1.start_time) - new Date(c2.start_time);
                  }
                );
              }
              return {
                ...item,
                // not overwriting original created_at because we need the date object to sort by date
                formatted_created_at: item.created_at
                  ? moment(item.created_at.replace("Z", "")).format(
                      "DD-MM-YYYY"
                    )
                  : "",
                classes_registered: item.classes_registered.map((item) => {
                  return {
                    ...item,
                    formatted_start_time: item.start_time
                      ? moment(item.start_time.replace("Z", "")).format(
                          "DD-MM-YYYY"
                        )
                      : "",
                    /**
                     * REVIEW
                     * Why item is there again in the next line?
                     */
                    item,
                    formatted_end_time: item.end_time
                      ? moment(item.end_time.replace("Z", "")).format("hh:mm a")
                      : "",
                  };
                }),
              };
            })
            .sort((a, b) => {
              return a.name.localeCompare(b.name);
            });
          setStudents(data);
          setSlicedStudents(
            data.slice(pageNumber * limit, (pageNumber + 1) * limit)
          );
          setTotalCount(res.data.count);
        }
      }
    });
  }, [debouncedText]);

  const pageCount = Math.ceil(totalCount / limit);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const sortStudents = (byMethod) => {
    const students = filteredData ? filter : students;
    let sortedStudents;
    if (byMethod === "name") {
      sortedStudents = students.sort().reverse();
    } else if (byMethod === "enroll_date") {
      sortedStudents = students.sort((a, b) =>
        sortMethod === "asc"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (byMethod === "total_classes") {
      sortedStudents = students.sort((a, b) =>
        sortMethod === "asc"
          ? a.classes_registered.length - b.classes_registered.length
          : b.classes_registered.length - a.classes_registered.length
      );
    } else if (byMethod === "last_class_title") {
      const zeroClass = students.filter((a) => {
        return a.classes_registered.length <= 0;
      });
      sortedStudents = students
        .filter((a) => {
          return a.classes_registered.length > 0;
        })
        .sort((a, b) => {
          return sortMethod === "asc"
            ? a.classes_registered[
                a.classes_registered.length - 1
              ].title.localeCompare(
                b.classes_registered[b.classes_registered.length - 1].title
              )
            : b.classes_registered[
                b.classes_registered.length - 1
              ].title.localeCompare(
                a.classes_registered[a.classes_registered.length - 1].title
              );
        });
      sortedStudents = [...sortedStudents, ...zeroClass];
    } else if (byMethod === "last_class_date") {
      const zeroClass = students.filter((a) => {
        return a.classes_registered.length <= 0;
      });
      sortedStudents = students
        .filter((a) => {
          if (a.classes_registered.length > 0) {
            a.classes_registered = a.classes_registered.sort((c1, c2) => {
              return new Date(c1.start_time) - new Date(c2.start_time);
            });
            return a;
          }
        })
        .sort((a, b) => {
          const startTimeOfA = [];
          const startTimeOfB = [];
          a.classes_registered.forEach((c) =>
            startTimeOfA.push(new Date(c.start_time))
          );
          b.classes_registered.forEach((c) =>
            startTimeOfB.push(new Date(c.start_time))
          );
          return sortMethod === "asc"
            ? Math.max(...startTimeOfA) - Math.max(...startTimeOfB)
            : Math.max(...startTimeOfB) - Math.max(...startTimeOfA);
        });
      sortedStudents = [...sortedStudents, ...zeroClass];
    } else if (byMethod === "rating") {
      const zeroClass = students.filter((a) => {
        return a.classes_registered.length <= 0;
      });
      sortedStudents = students.sort((a, b) => {
        return sortMethod === "asc"
          ? a.averageRating - b.averageRating
          : b.averageRating - a.averageRating;
      });
      sortedStudents = [...sortedStudents, ...zeroClass];
    }
    setStudents(sortedStudents);
    setSlicedStudents(
      sortedStudents.slice(pageNumber * limit, (pageNumber + 1) * limit)
    );
    if (sortMethod === "asc") {
      setSortClass("sorter");
      setSortMethod("dsc");
    } else {
      setSortClass("sorter turn");
      setSortMethod("asc");
    }
  };

  const handleChange = (value) => {
    setFilteredData(true);
    setFilterVal(value);
  };

  let filter = [];
  students.filter((item) => {
    if (filterVal[0] === 0) {
      if (item.classes_registered.length === 0) {
        filter.push(item);
      }
    } else if (filterVal[0] === 30) {
      if (item.classes_registered.length >= 30) {
        filter.push(item);
      }
    } else {
      const range = (min, max) =>
        Array.from({ length: max - min + 1 }, (_, i) => min + i);
      range(filterVal[0], filterVal[1]).map((range) => {
        if (item.classes_registered.length === range) {
          filter.push(item);
        }
      });
    }
  });

  useEffect(() => {
    if (filteredData) {
      const slicedData = filter.slice(
        pageNumber * limit,
        (pageNumber + 1) * limit
      );
      setSlicedStudents(slicedData);
    } else {
      const slicedData = students.slice(
        pageNumber * limit,
        (pageNumber + 1) * limit
      );
      setSlicedStudents(slicedData);
    }
  }, [pageNumber, filterVal]);

  return (
    <div className="container-table">
      <div className="container-for-search">
        <div>
          <input
            className="Search-bar"
            type="text"
            placeholder="Search by student Name class"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <div className="last-item">
          <ReactPaginate
            previousLabel={<i className="fa fa-angle-left"></i>}
            nextLabel={<i className="fa fa-angle-right"></i>}
            initialPage={0}
            marginPagesDisplayed={0}
            onPageChange={changePage}
            pageCount={pageCount}
            containerClassName="paginationBttns"
            previousLinkClassName="previousBttn"
            nextLinkClassName="nextBttn"
            disabledClassName="paginationDisabled"
            activeClassName="paginationActive"
          />
        </div>
      </div>
      <div className="slider-label">
        <label>Total attended classes </label>
        <div className="slider">
          <Range
            min={0}
            max={40}
            defaultValue={[0, 0]}
            step={null}
            tipFormatter={(value) => (value === 40 ? (value = "30+") : value)}
            value={filterVal}
            onChange={handleChange}
            marks={{
              0: 0,
              1: 1,
              6: 6,
              10: 10,
              15: 15,
              20: 20,
              25: 25,
              30: 30,
              40: `${30}+`,
            }}
          />
        </div>
        <button
          onClick={() => {
            setFilteredData(false);
            setFilterVal([0, 0]);
          }}
          className="filter-clear"
        >
          clear
        </button>
      </div>
      <table className="student-overview-table">
        <thead>
          <tr>
            <th className="student-name">
              Students Name
              <button
                className={sort_class}
                onClick={() => sortStudents("name")}
              >
                <BsArrowUpDown />
              </button>
            </th>
            <th className="student-name">
              Partner Name
              {/* <button
                className={sort_class}
                onClick={() => sortStudents("name")}
              >
                <BsArrowUpDown />
              </button> */}
            </th>

            <th>
              Enroll date
              <button
                className={sort_class}
                onClick={() => sortStudents("enroll_date")}
              >
                <BsArrowUpDown />
              </button>
            </th>
            <th>
              Classes Attended
              <button
                className={sort_class}
                onClick={() => sortStudents("total_classes")}
              >
                <BsArrowUpDown />
              </button>
            </th>
            <th>
              Last Class Title
              <button
                className={sort_class}
                onClick={() => sortStudents("last_class_title")}
              >
                <BsArrowUpDown />
              </button>
            </th>
            <th>
              Last Class Date
              <button
                className={sort_class}
                onClick={() => sortStudents("last_class_date")}
              >
                <BsArrowUpDown />
              </button>
            </th>
            <th>Last Class Time</th>
            <th>
              Average Rating
              <button
                className={sort_class}
                onClick={() => sortStudents("rating")}
              >
                <BsArrowUpDown />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            ? slicedStudents.map((item) => {
                let getStars = 0;
                let totalStarts = item.classes_registered.length * 5;
                item.classes_registered.map((stars) => {
                  getStars = getStars + Number(stars.feedback.feedback);
                });
                return (
                  <tr key={item.id}>
                    <td data-column="Name">{item.name}</td>

                    <td data-column="Partner">
                      {item.partner ? item.partner.name : "NA"}
                    </td>

                    <td data-column="Enrolled On">
                      {item.formatted_created_at}
                    </td>
                    <td data-column="Total classes ">
                      {" "}
                      {item.classes_registered.length}
                    </td>

                    <td data-column="Last class title">
                      {item.classes_registered &&
                      item.classes_registered.length > 0 &&
                      item.classes_registered[
                        item.classes_registered.length - 1
                      ]["title"] != ""
                        ? item.classes_registered[
                            item.classes_registered.length - 1
                          ]["title"]
                        : "NA"}
                    </td>
                    <td data-column="Last class date">
                      {item.classes_registered &&
                      item.classes_registered.length > 0 &&
                      item.classes_registered[
                        item.classes_registered.length - 1
                      ]["formatted_start_time"]
                        ? item.classes_registered[
                            item.classes_registered.length - 1
                          ]["formatted_start_time"]
                        : "NA"}
                    </td>
                    <td data-column="Last class time">
                      {item.classes_registered &&
                      item.classes_registered.length > 0 &&
                      item.classes_registered[
                        item.classes_registered.length - 1
                      ]["formatted_end_time"]
                        ? item.classes_registered[
                            item.classes_registered.length - 1
                          ]["formatted_end_time"]
                        : "NA"}
                    </td>
                    <td data-column="Avg rating ">
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
            : slicedStudents.map((item) => {
                let getStars = 0;
                let totalStarts = item.classes_registered.length * 5;
                item.classes_registered.map((stars) => {
                  getStars = getStars + Number(stars.feedback.feedback);
                });
                return (
                  <tr key={item.id}>
                    <td data-column="Name">{item.name}</td>

                    <td data-column="Partner">
                      {item.partner ? item.partner.name : "NA"}
                    </td>

                    <td data-column="Enrolled On">
                      {item.formatted_created_at}
                    </td>
                    <td data-column="Total classes ">
                      {" "}
                      {item.classes_registered.length}
                    </td>

                    <td data-column="Last class title">
                      {item.classes_registered &&
                      item.classes_registered.length > 0 &&
                      item.classes_registered[
                        item.classes_registered.length - 1
                      ]["title"] != ""
                        ? item.classes_registered[
                            item.classes_registered.length - 1
                          ]["title"]
                        : "NA"}
                    </td>
                    <td data-column="Last class date">
                      {item.classes_registered &&
                      item.classes_registered.length > 0 &&
                      item.classes_registered[
                        item.classes_registered.length - 1
                      ]["formatted_start_time"]
                        ? item.classes_registered[
                            item.classes_registered.length - 1
                          ]["formatted_start_time"]
                        : "NA"}
                    </td>
                    <td data-column="Last class time">
                      {item.classes_registered &&
                      item.classes_registered.length > 0 &&
                      item.classes_registered[
                        item.classes_registered.length - 1
                      ]["formatted_end_time"]
                        ? item.classes_registered[
                            item.classes_registered.length - 1
                          ]["formatted_end_time"]
                        : "NA"}
                    </td>
                    <td data-column="Avg rating ">
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
          {message ? <h1 className="Message">{message}</h1> : null}
        </tbody>
      </table>
    </div>
  );
}

export default MerakiUsers;

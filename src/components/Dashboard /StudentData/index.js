import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsArrowUpDown } from "react-icons/bs";

import { METHODS } from "../../../services/api";
import { useDebounce } from "use-debounce";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { Link } from "react-router-dom";
import "./styles.scss";

const getPartnerIdFromUrl = () => {
  let partnerId;
  if (window.location.pathname.includes("partners")) {
    partnerId = window.location.pathname.split("/").pop();
  }
  return partnerId;
};

function StudentData() {
  const [pageNumber, setPageNumber] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);
  const [originalResponse, setOriginalReponse] = useState([]);
  const [slicedStudents, setSlicedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMethod, setSortMethod] = useState("dsc");
  const [debouncedText] = useDebounce(searchTerm, 400);
  const user = useSelector(({ User }) => User);

  const limit = 10;

  useEffect(() => {
    let id = getPartnerIdFromUrl();
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/${id}/users${
        searchTerm.length > 0 ? `?name=${searchTerm}` : ""
      }`,
      headers: { accept: "application/json", Authorization: user.data.token },
    }).then((res) => {
      if (res.data.students.length < 1) {
        setMessage("There are no results to display");
      } else {
        setOriginalReponse(res.data.students);
        const data = res.data.students
          .map((item) => {
            if (item.classes_registered.length > 0) {
              item.classes_registered = item.classes_registered.sort(
                (c1, c2) => {
                  return new Date(c1.start_time) - new Date(c2.start_time);
                }
              );
            }
            return {
              ...item,
              created_at: moment(item.created_at.replace("Z", "")).format(
                "DD-MM-YYYY"
              ),
              classes_registered: item.classes_registered.map((item) => {
                return {
                  ...item,
                  start_time: moment(item.start_time.replace("Z", "")).format(
                    "DD-MM-YYYY"
                  ),
                  item,
                  end_time: moment(item.end_time.replace("Z", "")).format(
                    "hh:mm a"
                  ),
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
    });
  }, [debouncedText]);

  useEffect(() => {
    const slicedData = students.slice(
      pageNumber * limit,
      (pageNumber + 1) * limit
    );
    setSlicedStudents(slicedData);
  }, [pageNumber]);

  const pageCount = Math.ceil(totalCount / limit);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const sortStudents = (byMethod) => {
    let sortedStudents;
    if (byMethod === "name") {
      sortedStudents = students.sort().reverse();
      setStudents(sortedStudents);
      setSlicedStudents(
        sortedStudents.slice(pageNumber * limit, (pageNumber + 1) * limit)
      );
    } else if (byMethod === "enroll_date") {
      sortedStudents = originalResponse
        .sort((a, b) =>
          sortMethod === "asc"
            ? new Date(a.created_at) - new Date(b.created_at)
            : new Date(b.created_at) - new Date(a.created_at)
        )
        .map((item) => {
          return {
            ...item,
            created_at: moment(item.created_at.replace("Z", "")).format(
              "DD-MM-YYYY"
            ),
            classes_registered: item.classes_registered.map((item) => {
              return {
                ...item,
                start_time: moment(item.start_time.replace("Z", "")).format(
                  "DD-MM-YYYY"
                ),
                item,
                end_time: moment(item.end_time.replace("Z", "")).format(
                  "hh:mm a"
                ),
              };
            }),
          };
        });
      setStudents(sortedStudents);
      setSlicedStudents(
        sortedStudents.slice(pageNumber * limit, (pageNumber + 1) * limit)
      );
      sortMethod === "asc" ? setSortMethod("dsc") : setSortMethod("asc");
    } else if (byMethod === "total_classes") {
      sortedStudents = students.sort((a, b) =>
        sortMethod === "asc"
          ? a.classes_registered.length - b.classes_registered.length
          : b.classes_registered.length - a.classes_registered.length
      );
      setStudents(sortedStudents);
      setSlicedStudents(
        sortedStudents.slice(pageNumber * limit, (pageNumber + 1) * limit)
      );
      sortMethod === "asc" ? setSortMethod("dsc") : setSortMethod("asc");
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
      setStudents(sortedStudents);
      setSlicedStudents(
        sortedStudents.slice(pageNumber * limit, (pageNumber + 1) * limit)
      );
      sortMethod === "asc" ? setSortMethod("dsc") : setSortMethod("asc");
    } else if (byMethod === "last_class_date") {
      const zeroClass = students.filter((a) => {
        return a.classes_registered.length <= 0;
      });
      sortedStudents = originalResponse
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
        })
        .map((item) => {
          return {
            ...item,
            created_at: moment(item.created_at.replace("Z", "")).format(
              "DD-MM-YYYY"
            ),
            classes_registered: item.classes_registered.map((item) => {
              return {
                ...item,
                start_time: moment(item.start_time.replace("Z", "")).format(
                  "DD-MM-YYYY"
                ),
                item,
                end_time: moment(item.end_time.replace("Z", "")).format(
                  "hh:mm a"
                ),
              };
            }),
          };
        });
      sortedStudents = [...sortedStudents, ...zeroClass];
      setStudents(sortedStudents);
      setSlicedStudents(
        sortedStudents.slice(pageNumber * limit, (pageNumber + 1) * limit)
      );
      sortMethod === "asc" ? setSortMethod("dsc") : setSortMethod("asc");
    } else if (byMethod === "rating") {
      const zeroClass = students.filter((a) => {
        return a.classes_registered.length <= 0;
      });

      sortedStudents = students
        .filter((a) => {
          if (a.classes_registered.length > 0) {
            a.averageRating = 0;
            let avg = 0;
            let count = 0;
            a.classes_registered.map((f) => {
              if (f.feedback.feedback) {
                avg = avg + parseInt(f.feedback.feedback);
                count += 1;
              }
            });
            if (avg > 0) a.averageRating = avg / count;
            else a.averageRating = avg;
            return a;
          }
        })
        .sort((a, b) => {
          return sortMethod === "asc"
            ? a.averageRating - b.averageRating
            : b.averageRating - a.averageRating;
        });
      console.log(sortedStudents);
      sortedStudents = [...sortedStudents, ...zeroClass];
      setStudents(sortedStudents);
      setSlicedStudents(
        sortedStudents.slice(pageNumber * limit, (pageNumber + 1) * limit)
      );
      sortMethod === "asc" ? setSortMethod("dsc") : setSortMethod("asc");
    }
  };

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
      <table className="student-overview-table">
        <thead>
          <tr>
            <th>
              Students Name
              <button onClick={() => sortStudents("name")}>
                <BsArrowUpDown />
              </button>
            </th>
            <th>
              Enroll date
              <button onClick={() => sortStudents("enroll_date")}>
                <BsArrowUpDown />
              </button>
            </th>
            <th>
              Total Classes Attended
              <button onClick={() => sortStudents("total_classes")}>
                <BsArrowUpDown />
              </button>
            </th>
            <th>
              Last Class Title
              <button onClick={() => sortStudents("last_class_title")}>
                <BsArrowUpDown />
              </button>
            </th>
            <th>
              Last Class Date
              <button onClick={() => sortStudents("last_class_date")}>
                <BsArrowUpDown />
              </button>
            </th>
            <th>Last Class Time</th>
            <th>
              Avg Class Rating
              <button onClick={() => sortStudents("rating")}>
                <BsArrowUpDown />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {slicedStudents.map((item) => {
            let getStars = 0;
            let totalStarts = item.classes_registered.length * 5;
            item.classes_registered.map((stars) => {
              getStars = getStars + Number(stars.feedback.feedback);
            });
            return (
              <tr key={item.id}>
                <td data-column="Name">
                  <Link
                    className="t-data"
                    to={{
                      pathname: "/student",
                      state: {
                        pass: item.classes_registered,
                        passName: item.name,
                      },
                    }}
                  >
                    {item.name}
                  </Link>
                </td>
                <td data-column="Enrolled On">{item.created_at}</td>
                <td data-column="Total classes ">
                  {" "}
                  {item.classes_registered.length}
                </td>

                <td data-column="Last class title">
                  {item.classes_registered &&
                  item.classes_registered.length > 0 &&
                  item.classes_registered[item.classes_registered.length - 1][
                    "title"
                  ] != ""
                    ? item.classes_registered[
                        item.classes_registered.length - 1
                      ]["title"]
                    : "NA"}
                </td>
                <td data-column="Last class date">
                  {item.classes_registered &&
                  item.classes_registered.length > 0 &&
                  item.classes_registered[item.classes_registered.length - 1][
                    "start_time"
                  ]
                    ? item.classes_registered[
                        item.classes_registered.length - 1
                      ]["start_time"]
                    : "NA"}
                </td>
                <td data-column="Last class time">
                  {item.classes_registered &&
                  item.classes_registered.length > 0 &&
                  item.classes_registered[item.classes_registered.length - 1][
                    "end_time"
                  ]
                    ? item.classes_registered[
                        item.classes_registered.length - 1
                      ]["end_time"]
                    : "NA"}
                </td>
                <td data-column="Avg rating ">
                  {[1, 2, 3, 4, 5].map((star) => {
                    return Math.ceil(getStars / totalStarts) > 0 &&
                      star <= Math.ceil(getStars / totalStarts) ? (
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

export default StudentData;

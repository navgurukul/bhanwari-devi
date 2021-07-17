import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedText] = useDebounce(searchTerm, 400);
  const user = useSelector(({ User }) => User);

  const limit = 10;

  useEffect(() => {
    let id = getPartnerIdFromUrl();
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/${id}/users?${
        searchTerm.length > 0
          ? `name=${searchTerm}`
          : `limit=${limit}&page=${pageNumber + 1}`
      }`,
      headers: { accept: "application/json", Authorization: user.data.token },
    }).then((res) => {
      console.log(res, "data");
      if (res.data.students.length < 1) {
        setMessage("There are no results to display");
      } else {
        const data = res.data.students.map((item) => {
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
        setStudents(data);
        setTotalCount(res.data.count);
      }
    });
  }, [debouncedText, pageNumber]);

  const pageCount = Math.ceil(totalCount / limit);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container-table">
      <div className="container-for-search">
        <div>
          <input
            className="Search-bar"
            type="text"
            placeholder="Search by student name,class...."
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
            <th>Students Name</th>
            <th>Enroll date </th>
            <th>Total Classes Attended</th>
            <th>Last Class Title</th>
            <th>Last Class Date </th>
            <th>Last Class Time</th>
            <th>Avg Class Rating</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item) => {
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

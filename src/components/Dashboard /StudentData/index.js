import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { METHODS } from "../../../services/api";
import { useDebounce } from "use-debounce";
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
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedText] = useDebounce(searchTerm);
  const user = useSelector(({ User }) => User);

  useEffect(() => {
    let id = getPartnerIdFromUrl();
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/${id}/users`,
      headers: { accept: "application/json", Authorization: user.data.token },
    }).then((res) => {
      if (res.data.length < 1) {
        setMessage("There are no results to display");
      } else {
        const data = res.data.map((item) => {
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
      }
    });
  }, []);

  return (
    <div className="container-table">
      <input
        className="Search-bar"
        type="text"
        placeholder="Search by student name,class...."
        value={debouncedText}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

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
          {students
            .filter((searchValue) => {
              if (searchTerm == "") {
                return searchValue;
              } else if (
                searchValue.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return searchValue;
              }
            })
            .slice(0, 10)
            .map((item) => {
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

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
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedText] = useDebounce(searchTerm);
  const user = useSelector(({ User }) => User);

  useEffect(() => {
    let id = getPartnerIdFromUrl();
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/${id}/users`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
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
                end_time: moment(item.end_time.replace("Z", "")).format(
                  "DD-MM-YYYY"
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
    <>
      <div className="table-search">
        <input
          type="text"
          placeholder="Search..."
          value={debouncedText}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <table className="student-overview-table">
        <thead>
          <tr>
            <th>Students Name</th>
            <th>Enrolled On </th>
            <th>Total classes attended</th>
            <th>Last class title</th>
            <th>Last class attended </th>
          </tr>
        </thead>
        {students
          .filter((searchValue) => {
            if (searchTerm == "") {
              return searchValue;
            } else if (
              searchValue.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return searchValue;
            }
          })
          .map((item) => {
            return (
              <tr key={item.id}>
                <td data-column="Students Name">
                  <Link
                    className="t-data"
                    to={{
                      pathname: "/student",
                      state: { pass: item.classes_registered },
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
                    "end_time"
                  ]
                    ? item.classes_registered[
                        item.classes_registered.length - 1
                      ]["end_time"]
                    : "NA"}
                </td>
              </tr>
            );
          })}
        {message ? <h3 className="message">{message}</h3> : null}
      </table>
    </>
  );
}

export default StudentData;

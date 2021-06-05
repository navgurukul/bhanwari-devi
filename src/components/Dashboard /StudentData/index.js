import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// import { METHODS } from "../../services/api";
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
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector(({ User }) => User);

  useEffect(() => {
    let id = getPartnerIdFromUrl();
    axios
      .get(`https://api.merakilearn.org/partners/${id}/users`, {
        headers: { Authorization: user.data.token },
      })
      .then((res) => {
        setStudents(res.data);
      });
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="table-search">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
          value={searchTerm}
        />
      </div>
      <table className="student-overview-table">
        <thead>
          <tr>
            <th>Students Name</th>
            <th>Enrolled On </th>
            <th>Number of class attend</th>
            <th>Last class title</th>
            <th>Last class attended </th>
          </tr>
        </thead>

        {students.length > 0 &&
          students
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

            .map((item) => {
              const classEnrollDate =
                item.created_at && item.created_at.replace("Z", "");

              return (
                <tr key={item.id}>
                  <td>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={{
                        pathname: "/student",
                        state: { pass: item.classes_registered },
                      }}
                    >
                      <td className="T-data" data-column="Students Name">
                        {item.name}
                      </td>
                    </Link>
                  </td>
                  <td data-column="Enrolled On">
                    {moment(classEnrollDate).format("DD-MM-YYYY")}
                  </td>
                  <td data-column="classes attend">
                    {" "}
                    {item.classes_registered.length}
                  </td>

                  <td>
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
                  <td>
                    {item.classes_registered &&
                    item.classes_registered.length > 0 &&
                    moment(
                      item.classes_registered[
                        item.classes_registered.length - 1
                      ]["end_time"].replace("Z", "")
                    ).format("DD-MM-YYYY") != ""
                      ? moment(
                          item.classes_registered[
                            item.classes_registered.length - 1
                          ]["end_time"].replace("Z", "")
                        ).format("DD-MM-YYYY")
                      : "NA"}
                  </td>
                </tr>
              );
            })}
      </table>
    </>
  );
}

export default StudentData;

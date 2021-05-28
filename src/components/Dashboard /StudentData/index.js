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
  const user = useSelector(({ User }) => User);

  useEffect(() => {
    let id = getPartnerIdFromUrl();
    axios
      .get(`https://api.merakilearn.org/partners/${id}/users`, {
        headers: { Authorization: user.data.token },
      })
      .then((res) => {
        // console.log(res, "DATA-------");
        setStudents(res.data);
      });
  }, []);

  return (
    <>
      <table className="student-overview-table">
        <thead>
          <tr>
            <th>Students Name</th>
            <th>Enroll On </th>
            <th>Number of class attend</th>
            {/* <th>Last class attended</th> */}
          </tr>
        </thead>

        {students.length > 0 &&
          students.map((item) => {
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
                <td data-column="Enroll On">
                  {moment(classEnrollDate).format("DD-MM-YYYY")}
                </td>
                <td data-column="classes attend">
                  {" "}
                  {item.classes_registered.length}
                </td>
              </tr>
            );
          })}
      </table>
    </>
  );
}

export default StudentData;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { METHODS } from "../../../services/api";
import moment from "moment";
import "./styles.scss";

function VolunteerDashboard() {
  const [volunteer, setVolunteer] = useState([]);
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
    });
  }, []);

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
  };

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
          <button className="filter-button">Python(100)</button>
          <button className="filter-button">Spoken English (20)</button>
          <button className="filter-button">Typing (10)</button>
          <button className="filter-button">Filter</button>
        </div>

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
              console.log("item", item);
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
                  <td data-column="Engagement Week">
                    {item.engagement_in_months}
                  </td>
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

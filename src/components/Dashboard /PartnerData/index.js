import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";
// import { METHODS } from "../../../services/api";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constant";
import { useSelector } from "react-redux";

function PartnerDashboard() {
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector(({ User }) => User);

  useEffect(() => {
    axios
      .get(` https://api.merakilearn.org/partners`, {
        headers: { Authorization: user.data.token },
      })
      .then((res) => {
        setPartners(res.data);
      });
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  // API CALL FOR GET partners DATA
  // useEffect(() => {
  //   axios({
  //     method: METHODS.GET,
  //     url: `${process.env.REACT_APP_MERAKI_URL}/partners`,
  //     headers: {
  //       accept: "application/json",
  //       Authorization: user.data.token,
  //     },
  //   }).then((res) => {
  //     setPartners(res.data);
  //   });
  // }, []);

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
      <table className="Partner-dashboard">
        <thead>
          <tr>
            <th>Partners Name</th>
            <th> Number of students</th>
          </tr>
        </thead>

        {partners
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
                <td>
                  <Link
                    className="Link"
                    style={{ textDecoration: "none" }}
                    to={`${PATHS.PARTNERS}/${item.id}`}
                  >
                    <td className="t-data" data-column=" Name">
                      {" "}
                      {item.name}
                    </td>
                  </Link>
                </td>
                <td data-column="Number of students">{item.users}</td>{" "}
              </tr>
            );
          })}
      </table>
    </>
  );
}
export default PartnerDashboard;

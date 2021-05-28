import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constant";
import { useSelector } from "react-redux";

function PartnerDashboard() {
  const [partners, setPartners] = useState([]);
  const user = useSelector(({ User }) => User);

  useEffect(() => {
    axios
      .get(` https://api.merakilearn.org/partners`, {
        headers: { Authorization: user.data.token },
      })
      .then((res) => {
        // console.log(res, "PATNER NAME");
        setPartners(res.data);
      });
  }, []);

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
  //     setPartners(res.data.data);
  //   });
  // }, []);

  return (
    <>
      <table className="Partner-dashboard">
        <thead>
          <tr>
            <th>Partners Name</th>
            <th> Number of students</th>
          </tr>
        </thead>

        {partners.map((item) => {
          return (
            <tr key={item.id}>
              <td>
                <Link
                  className="Link"
                  style={{ textDecoration: "none", border: "none" }}
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

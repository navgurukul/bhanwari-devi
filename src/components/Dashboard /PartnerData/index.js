import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";
import { METHODS } from "../../../services/api";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { PATHS } from "../../../constant";
import { useSelector } from "react-redux";

function PartnerDashboard() {
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedText] = useDebounce(searchTerm);
  const user = useSelector(({ User }) => User);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setPartners(res.data);
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
      <table className="Partner-dashboard">
        <thead>
          <tr>
            <th>Partners Name</th>
            <th>Number of students</th>
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
                <td data-column="Name">
                  <Link className="t-data" to={`${PATHS.PARTNERS}/${item.id}`}>
                    {" "}
                    {item.name}
                  </Link>
                </td>
                <td data-column="Total students">{item.users}</td>
              </tr>
            );
          })}
      </table>
    </>
  );
}
export default PartnerDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";
import { METHODS } from "../../../services/api";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { PATHS } from "../../../constant";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

toast.configure();

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

  const createMerakiLink = (id) => {
    axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/${id}/meraki-link`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then(
      (res) => {
        toast.success("You have been created link successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
        });
        const response = res.data.data[0];
        const id = response.id;
        const merakiLink = response.meraki_link;
        const newData = partners.map((data) => {
          if (id === data.id) {
            data["meraki_link"] = merakiLink;
            return data;
          }
          return data;
        });
        setPartners(newData);
      },
      () => {
        toast.error("Something went wrong", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
        });
      }
    );
  };

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
            <th>Meraki Link</th>
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

                {item.meraki_link ? (
                  <td data-column="Total students">
                    <a
                      className="meraki_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.meraki_link}
                    >
                      Get Link
                    </a>
                  </td>
                ) : (
                  <td data-column="Total students">
                    <div
                      className="create"
                      onClick={() => createMerakiLink(item.id)}
                    >
                      Create
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
      </table>
    </>
  );
}
export default PartnerDashboard;

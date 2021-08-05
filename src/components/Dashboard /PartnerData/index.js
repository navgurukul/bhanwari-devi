import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./styles.scss";
import { METHODS } from "../../../services/api";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { PATHS } from "../../../constant";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

toast.configure();

function PartnerDashboard() {
  const [pageNumber, setPageNumber] = useState(0);
  const [flag, setFlag] = useState(false);
  const [totalCount, setTotalCount] = useState();
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedText] = useDebounce(searchTerm, 400);
  const user = useSelector(({ User }) => User);
  const limit = 10;

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners?${
        searchTerm.length > 0
          ? `name=${searchTerm}`
          : `limit=${limit}&page=${pageNumber + 1}`
      }`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setPartners(res.data.partners);
      setTotalCount(res.data.count);
    });
  }, [debouncedText, pageNumber, flag]);

  const pageCount = Math.ceil(totalCount / limit);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const createMerakiLink = (id, platform) => {
    axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/${id}/merakiLink`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
        platform: platform,
      },
    })
      .then((res) => {
        toast.success("Link created!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
        });
        setFlag(!flag);
      })
      .catch(() => {
        toast.error("Something went wrong", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
        });
      });
  };

  return (
    <>
      <div className="table-container">
        <div className="container-for-search">
          <div>
            <input
              className="search-box"
              type="text"
              placeholder="Search..."
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
        <table className="partners-table">
          <thead>
            <tr>
              <th>Partner's Name</th>
              <th>Number of students</th>
              <th>Meraki - Android Link</th>
              <th>Meraki - Web Link</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((item) => {
              return (
                <tr key={item.id}>
                  <td data-column="Name">
                    <Link
                      className="t-data"
                      to={`${PATHS.PARTNERS}/${item.id}`}
                    >
                      {" "}
                      {item.name}
                    </Link>
                  </td>
                  <td data-column="Total students">{item.users}</td>
                  {item.meraki_link ? (
                    <td data-column="Meraki Link">
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
                    <td data-column="Meraki Link">
                      <div
                        className="create-link"
                        onClick={() => createMerakiLink(item.id, "android")}
                      >
                        Create link
                      </div>
                    </td>
                  )}
                  {item.web_link ? (
                    <td data-column="Meraki Link">
                      <a
                        className="meraki_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item.web_link}
                      >
                        Get Link
                      </a>
                    </td>
                  ) : (
                    <td data-column="Meraki Link">
                      <div
                        className="create-link"
                        onClick={() => createMerakiLink(item.id, "web")}
                      >
                        Create link
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default PartnerDashboard;

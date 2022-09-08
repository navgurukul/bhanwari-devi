import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsArrowUpDown } from "react-icons/bs";

import "./styles.scss";
import { METHODS } from "../../../services/api";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { PATHS } from "../../../constant";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

toast.configure();

function PartnerDashboard() {
  const [pageNumber, setPageNumber] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [partners, setPartners] = useState([]);
  const [slicedPartners, setSlicedPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMethod, setSortMethod] = useState("dsc");
  const [sort_class, setSortClass] = useState("sorter");
  const [debouncedText] = useDebounce(searchTerm, 400);
  const [message, setMessage] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  const user = useSelector(({ User }) => User);
  const limit = 15;

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners${
        searchTerm.length > 0 ? `?name=${searchTerm}` : ""
      }`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      if (res.data.partners.length < 1) {
        setSlicedPartners([]);
        setMessage("There are no results to display");
      } else {
        setPartners(res.data.partners);
        setSlicedPartners(
          res.data.partners.slice(pageNumber * limit, (pageNumber + 1) * limit)
        );
        setTotalCount(res.data.partners.length);
      }
    });
  }, [debouncedText]);

  useEffect(() => {
    const slicedData = partners.slice(
      pageNumber * limit,
      (pageNumber + 1) * limit
    );
    setSlicedPartners(slicedData);
  }, [pageNumber]);

  const pageCount = Math.ceil(totalCount / limit);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const sortPartners = (byMethod) => {
    let sortedPartners = partners;
    if (byMethod === "name") {
      sortedPartners = partners.sort().reverse();
    } else if (byMethod === "students") {
      sortedPartners = partners.sort((a, b) => {
        return sortMethod === "asc" ? a.users - b.users : b.users - a.users;
      });
    }
    setPartners(sortedPartners);
    setSlicedPartners(
      sortedPartners.slice(pageNumber * limit, (pageNumber + 1) * limit)
    );
    if (sortMethod === "asc") {
      setSortClass("sorter");
      setSortMethod("dsc");
    } else {
      setSortClass("sorter turn");
      setSortMethod("asc");
    }
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
      })
      .catch(() => {
        toast.error("Something went wrong", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
        });
      });
  };
  if (user.data.user.rolesList.indexOf("admin") > -1) {
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
                  setMessage("");
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
                <th>
                  Partner's Name
                  <button
                    className={sort_class}
                    onClick={() => sortPartners("name")}
                  >
                    <BsArrowUpDown />
                  </button>
                </th>
                <th>
                  Number of students
                  <button
                    className={sort_class}
                    onClick={() => sortPartners("students")}
                  >
                    <BsArrowUpDown />
                  </button>
                </th>
                <th>Meraki - Android Link</th>
                <th>Meraki - Web Link</th>
                {/* <th>Partner specific url</th> */}
              </tr>
            </thead>
            <tbody>
              {slicedPartners.map((item) => {
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
                        <CopyToClipboard
                          text={item.meraki_link}
                          onCopy={() => {
                            toast.success("Copied to Clipboard", {
                              position: toast.POSITION.BOTTOM_RIGHT,
                              autoClose: 1200,
                            });
                          }}
                        >
                          <i className="clipboard fa fa-copy"></i>
                        </CopyToClipboard>
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
                        <CopyToClipboard
                          text={item.web_link}
                          onCopy={() => {
                            toast.success("Copied to Clipboard", {
                              position: toast.POSITION.BOTTOM_RIGHT,
                              autoClose: 1200,
                            });
                          }}
                        >
                          <i className="clipboard fa fa-copy"></i>
                        </CopyToClipboard>
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
                    {/* <td data-column="Meraki Link">
                      <a
                        className="meraki_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.merakilearn.org/navgurukul/${item.id}`}
                      >
                        Get Url
                      </a>
                      <CopyToClipboard
                        text={`https://www.merakilearn.org/navgurukul/${item.id}`}
                        onCopy={() => {
                          toast.success("Copied to Clipboard", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1200,
                          });
                        }}
                      >
                        <i className="clipboard fa fa-copy"></i>
                      </CopyToClipboard>
                    </td> */}
                  </tr>
                );
              })}
              {message ? <h1 className="Message">{message}</h1> : null}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  return <Redirect to={PATHS.HOME_PATH} />;
}
export default PartnerDashboard;

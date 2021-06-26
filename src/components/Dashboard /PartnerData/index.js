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
  const [pageNumber, setPageNumber] = useState(0); //current page
  const [countPage, setCountPage] = useState(2);
  const [isUpdateCountPage, setIsUpdateCountPage] = useState(true);
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedText] = useDebounce(searchTerm);
  const user = useSelector(({ User }) => User);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners?limit=${10}&page=${
        pageNumber + 1
      }`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setPartners(res.data);
      getCountPageNumber(res.data);
    });
  }, [pageNumber]);

  const getCountPageNumber = (response) => {
    if (response.length === 0) {
      setIsUpdateCountPage(false);
    } else if (isUpdateCountPage) {
      if (pageNumber > 10) {
        setCountPage(pageNumber + 1);
      } else {
        setCountPage((preState) => preState + 1);
      }
    }
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
      <div className="table-container">
        <div className="container-for-Search">
          <div>
            <input
              className="Search-box"
              type="text"
              placeholder="Search..."
              value={debouncedText}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div className="last-item">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              initialPage={0}
              marginPagesDisplayed={0}
              onPageChange={changePage}
              pageCount={countPage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Partners Name</th>
              <th>Number of students</th>
              <th>Meraki Link</th>
            </tr>
          </thead>
          <tbody>
            {partners
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
              .slice(0, 10)
              .map((item) => {
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
                          className="create"
                          onClick={() => createMerakiLink(item.id)}
                        >
                          Create Link
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

import React, { useState } from "react";
import "./styles.scss";
import { useDebounce } from "use-debounce";
import ReactPaginate from "react-paginate";

function StudentClassData(props) {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedText] = useDebounce(searchTerm);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(props.location.state.pass.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
  };

  return (
    <div className="container-for-table">
      <p className="studentName">
        {" "}
        Total Classes by {props.location.state.passName} :{" "}
        {props.location.state.pass.length}
      </p>
      <div className="container-for-search">
        <div>
          <input
            className="search-for-classes"
            type="text"
            placeholder="Search by classes,facilator,language...."
            value={debouncedText}
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
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="paginationBttns"
            previousLinkClassName="previousBttn"
            nextLinkClassName="nextBttn"
            disabledClassName="paginationDisabled"
            activeClassName="paginationActive"
          />
        </div>
      </div>

      <table className="student-class-table">
        <thead>
          <tr>
            <th>Class Title</th>
            <th>Class Id</th>
            <th>Facilitator</th>
            <th>Language</th>
            <th>Class Date </th>
            <th>Class Rating </th>
          </tr>
        </thead>
        <tbody>
          {props.location.state.pass && props.location.state.pass.length > 0 ? (
            props.location.state.pass
              .filter((searchValue) => {
                if (searchTerm == "") {
                  return searchValue;
                } else if (
                  searchValue.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return searchValue;
                }
              })
              .slice(pagesVisited, pagesVisited + usersPerPage)
              .map((item) => {
                return (
                  <tr key={item.id}>
                    <td data-column="Title">{item.title}</td>
                    <td data-column="Class Id">{item.id}</td>
                    <td data-column="Facilitator">{item.facilitator_name}</td>
                    <td data-column="Language">{languageMap[item.lang]}</td>
                    <td data-column="Date">{item.start_time}</td>
                    <td data-column="Class Rating">
                      {[1, 2, 3, 4, 5].map((star) => {
                        return item.feedback.feedback > 0 &&
                          star <= item.feedback.feedback ? (
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
              })
          ) : (
            <div className="message ">
              <h3>There are no results to display...</h3>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentClassData;

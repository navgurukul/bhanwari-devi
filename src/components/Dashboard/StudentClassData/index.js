import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useDebounce } from "use-debounce";
import ReactPaginate from "react-paginate";
import { BsArrowUpDown } from "react-icons/bs";

function StudentClassData(props) {
  const [pageNumber, setPageNumber] = useState(0);
  const [classes, setClasses] = useState([]);
  const [slicedClasses, setSlicedClasses] = useState([]);
  const [sortMethod, setSortMethod] = useState("dsc");
  const [sort_class, setSortClass] = useState("sorter");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedText] = useDebounce(searchTerm);
  const [totalCount, setTotalCount] = useState(
    props.location.state.pass.length
  );

  const limit = 10;

  const pageCount = Math.ceil(totalCount / limit);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const data = props.location.state.pass.filter((searchValue) => {
      if (searchTerm == "") {
        return searchValue;
      } else if (
        searchValue.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return searchValue;
      }
    });
    setTotalCount(data.length);
    const slicedData = data.slice(pageNumber * limit, (pageNumber + 1) * limit);
    setClasses(data);
    setSlicedClasses(slicedData);
  }, [debouncedText, pageNumber]);

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
  };

  const sortClasses = (byMethod) => {
    let sortedClasses;
    if (byMethod === "title") {
      sortedClasses = classes.sort((a, b) =>
        sortMethod === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
    } else if (byMethod === "id") {
      sortedClasses = classes.sort((a, b) =>
        sortMethod === "asc" ? a.id - b.id : b.id - a.id
      );
    } else if (byMethod === "facilitator") {
      sortedClasses = classes.sort((a, b) =>
        sortMethod === "asc"
          ? a.facilitator_name.localeCompare(b.facilitator_name)
          : b.facilitator_name.localeCompare(a.facilitator_name)
      );
    } else if (byMethod === "date") {
      sortedClasses = classes.sort((a, b) => {
        return sortMethod === "asc"
          ? new Date(a.start_time) - new Date(b.start_time)
          : new Date(b.start_time) - new Date(a.start_time);
      });
    } else if (byMethod === "rating") {
      const nullFeedback = classes.filter((c) => c.feedback.feedback === null);
      sortedClasses = classes
        .filter((c) => c.feedback.feedback)
        .sort((a, b) =>
          sortMethod === "asc"
            ? parseInt(a.feedback.feedback) - parseInt(b.feedback.feedback)
            : parseInt(b.feedback.feedback) - parseInt(a.feedback.feedback)
        );
      sortedClasses = [...sortedClasses, ...nullFeedback];
    }

    setClasses(sortedClasses);
    setSlicedClasses(
      sortedClasses.slice(pageNumber * limit, (pageNumber + 1) * limit)
    );
    if (sortMethod === "asc") {
      setSortClass("sorter");
      setSortMethod("dsc");
    } else {
      setSortClass("sorter turn");
      setSortMethod("asc");
    }
  };

  return (
    <div className="container-for-table">
      <p className="studentName">
        {" "}
        Total Classes by {props.location.state.passName} :{" "}
        {props.location.state.pass.length}
      </p>
      <h3 className="student-email">{props.location.state.passEmail}</h3>
      <div className="container-for-search">
        <div>
          <input
            className="search-for-classes"
            type="text"
            placeholder="Search by Class Title "
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
            <th>
              Class Title
              <button
                className={sort_class}
                onClick={() => sortClasses("title")}
              >
                <BsArrowUpDown />
              </button>
            </th>
            <th>
              Class Id
              <button className={sort_class} onClick={() => sortClasses("id")}>
                <BsArrowUpDown />
              </button>
            </th>
            <th>
              Facilitator
              <button
                className={sort_class}
                onClick={() => sortClasses("facilitator")}
              >
                <BsArrowUpDown />
              </button>
            </th>
            <th>Language</th>
            <th>
              Class Date
              <button
                className={sort_class}
                onClick={() => sortClasses("date")}
              >
                <BsArrowUpDown />
              </button>
            </th>
            <th>
              Class Rating
              <button
                className={sort_class}
                onClick={() => sortClasses("rating")}
              >
                <BsArrowUpDown />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {classes && classes.length > 0 ? (
            slicedClasses.map((item) => {
              return (
                <tr key={item.id}>
                  <td data-column="Title">{item.title}</td>
                  <td data-column="Class Id">{item.id}</td>
                  <td data-column="Facilitator">{item.facilitator_name}</td>
                  <td data-column="Language">{languageMap[item.lang]}</td>
                  <td data-column="Date">{item.formatted_start_time}</td>
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { METHODS } from "../../../services/api";
import { PATHS } from "../../../constant";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { useDebounce } from "use-debounce";
import { BsArrowUpDown } from "react-icons/bs";

import "./styles.scss";

function VolunteerOverview(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [classes, setClasses] = useState([]);
  const [slicedClasses, setSlicedClasses] = useState();
  const user = useSelector(({ User }) => User);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortMethod, setSortMethod] = useState("dsc");
  const [debouncedText] = useDebounce(searchTerm);

  const limit = 10;

  const volunteerClassData = props.location.state.pass;
  const pageCount = Math.ceil(volunteerClassData.classes.length / limit);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const firstIndex = (pageNumber + 1) * limit;
  const lastIndex = volunteerClassData.classes.length;

  const lang = { en: "English", hi: "Hindi" };
  let language = "";
  new Set(volunteerClassData.classes.map((item) => item.lang)).forEach(
    (item) => (language = language + lang[item] + ", ")
  );

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
  };

  useEffect(() => {
    const data = volunteerClassData.classes.filter((searchValue) => {
      if (searchTerm == "") {
        return searchValue;
      } else if (
        searchValue.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return searchValue;
      }
    });
    const slicedData = data.slice(pageNumber * limit, (pageNumber + 1) * limit);
    setClasses(data);
    setSlicedClasses(slicedData);
  }, [debouncedText, pageNumber]);

  const sortClasses = (byMethod) => {
    let sortedClasses;
    if (byMethod === "class_date") {
      sortedClasses = classes.sort((a, b) =>
        sortMethod === "asc"
          ? new Date(a.end_time) - new Date(b.end_time)
          : new Date(b.end_time) - new Date(a.end_time)
      );
    }
    setClasses(sortedClasses);
    setSlicedClasses(
      sortedClasses.slice(pageNumber * limit, (pageNumber + 1) * limit)
    );
    if (sortMethod === "asc") {
      setSortMethod("dsc");
    } else {
      setSortMethod("asc");
    }
  };

  return (
    <>
      <div className="volunteer-class-page-container">
        <div className="volunteer-page-heading">
          <div>
            <Link className="home" to={`${PATHS.HOME_PATH}`}>
              {" "}
              Home
            </Link>{" "}
            /
            <Link className="home" to={`${PATHS.VOLUNTEER}`}>
              {" "}
              Volunteer&nbsp;
            </Link>
          </div>
          <div>/ {volunteerClassData.name}</div>
        </div>
        <div className="volunteer-details">
          <p className="volunteer-name">{volunteerClassData.name}</p>
          <p>Python: {language.slice(0, -2)}</p>
          <p>Total Classes: {volunteerClassData.classes.length}</p>
          <p>
            Associated Partner:{" "}
            {volunteerClassData.partner ? volunteerClassData.partner : "NA"}
          </p>
        </div>
        <div>
          <input
            className="volunteer-search-box"
            type="text"
            placeholder="Class title, languange..."
            value={debouncedText}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <table className="volunteer-class-table">
          <thead>
            <tr>
              <th>Class Title</th>
              <th>
                Class Date
                <button
                  className="sort-class"
                  onClick={() => sortClasses("class_date")}
                >
                  <BsArrowUpDown />
                </button>
              </th>
              <th>Class Time</th>
              <th>
                Student Enrollments
                {/* <button
                  className="sort-class"
                  onClick={() => sortClasses("enrollment")}
                >
                  <BsArrowUpDown />
                </button> */}
              </th>
              <th>Language</th>
              <th>Avg. Rating</th>
            </tr>
          </thead>
          <tbody>
            {classes && classes.length > 0 ? (
              slicedClasses.map((item) => {
                // let ratingCount = 0;
                // item.ratings.map((item) => {
                //   if (item.rating) ratingCount += parseInt(item.rating);

                //   return ratingCount;
                // });
                // item.avg_rating = Math.ceil(
                //   item.ratings.length && ratingCount / item.ratings.length
                // );
                const ratings = item.ratings.filter((item) => item.rating);
                item.avg_rating =
                  ratings.length &&
                  Math.ceil(
                    ratings.reduce(
                      (ratingSum, item) => ratingSum + parseInt(item.rating),
                      0
                    ) / ratings.length
                  );
                return (
                  <tr key={item.id}>
                    <td data-column="Class Title">{item.title}</td>
                    <td data-column="Class Date">
                      {moment.utc(item.end_time).format("DD-MM-YYYY")}
                    </td>
                    <td data-column="Class Time">
                      {moment
                        .utc(item.start_time)
                        .add(330, "minute")
                        .format("kk:mm")}
                    </td>
                    <td data-column="Enrollments">
                      {item.max_enrollment ? item.max_enrollment : "NA"}
                    </td>
                    <td data-column="Language"> {languageMap[item.lang]} </td>
                    <td data-column="Avg. Rating">
                      {[1, 2, 3, 4, 5].map((star) => {
                        return item.avg_rating > 0 &&
                          star <= item.avg_rating ? (
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

        <div className="pagination-footer">
          <div>
            <p className="page-descrption">
              Showing {pageNumber * limit + 1}-
              {firstIndex > lastIndex ? lastIndex : firstIndex}
              of {lastIndex}
            </p>
          </div>
          <div className="pagination">
            <ReactPaginate
              previousLabel={<i className="fa fa-angle-left"></i>}
              nextLabel={<i className="fa fa-angle-right"></i>}
              initialPage={0}
              marginPagesDisplayed={0}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName="paginationBttns-volunteer"
              previousLinkClassName="previousBttn"
              nextLinkClassName="nextBttn"
              disabledClassName="paginationDisabled"
              activeClassName="paginationActive-volunteer"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default VolunteerOverview;

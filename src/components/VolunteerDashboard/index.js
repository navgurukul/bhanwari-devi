// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { METHODS } from "../../services/api";
// import { PATHS } from "../../constant";
// import moment from "moment";
// import ReactPaginate from "react-paginate";
// import { useDebounce } from "use-debounce";

// import "./styles.scss";

// const volunteerClassData = {
//   id: "223",
//   name: "Saquib Nasim",
//   email: "saquib@navgurukul.org",
//   partner_id: 39,
//   partner: {
//     id: 39,
//     name: "Samridhdhi Trust",
//     notes: "",
//     slug: null,
//     created_at: "2019-04-10T14:25:21.000Z",
//     referred_by: null,
//     email: null,
//     districts: null,
//     meraki_link: null,
//     web_link: null,
//     state: null,
//     pathway: ["Spoken English"],
//   },
//   classes: [
//     {
//       id: 2428,
//       title: "Canada/Edmonton - Cohort",
//       description: "kjas",
//       start_time: "2021-10-14T02:30:00.006+05:30",
//       end_time: "2021-10-14T03:00:00.006+05:30",
//       lang: "hi",
//       max_enrollment: null,
//       recurring_id: 169,
//       ratings: [],
//     },
//     {
//       id: 2429,
//       title: "Canada/Edmonton - Cohort",
//       description: "kjas",
//       start_time: "2021-10-16T02:30:00.006+05:30",
//       end_time: "2021-10-16T03:00:00.006+05:30",
//       lang: "hi",
//       max_enrollment: null,
//       recurring_id: 169,
//       ratings: [],
//     },
//     {
//       id: 2430,
//       title: "Canada/Edmonton - Cohort",
//       description: "kjas",
//       start_time: "2021-10-23T02:30:00.006+05:30",
//       end_time: "2021-10-23T03:00:00.006+05:30",
//       lang: "hi",
//       max_enrollment: null,
//       recurring_id: 169,
//       ratings: [],
//     },
//     {
//       id: 2445,
//       title: "BANner wise",
//       description: "penn",
//       start_time: "2021-10-20T11:00:00.000+05:30",
//       end_time: "2021-10-21T11:20:00.000+05:30",
//       lang: "hi",
//       max_enrollment: null,
//       recurring_id: 171,
//       ratings: [],
//     },
//     {
//       id: 2446,
//       title: "BANner wise",
//       description: "penn",
//       start_time: "2021-10-25T11:00:00.000+05:30",
//       end_time: "2021-10-26T11:20:00.000+05:30",
//       lang: "hi",
//       max_enrollment: null,
//       recurring_id: 171,
//       ratings: [],
//     },
//     {
//       id: 2447,
//       title: "BANner wise",
//       description: "penn",
//       start_time: "2021-11-01T11:00:00.000+05:30",
//       end_time: "2021-11-02T11:20:00.000+05:30",
//       lang: "hi",
//       max_enrollment: null,
//       recurring_id: 171,
//       ratings: [],
//     },
//     {
//       id: 2448,
//       title: "BANner wise",
//       description: "penn",
//       start_time: "2021-11-08T11:00:00.000+05:30",
//       end_time: "2021-11-09T11:20:00.000+05:30",
//       lang: "hi",
//       max_enrollment: null,
//       recurring_id: 171,
//       ratings: [],
//     },
//     {
//       id: 2382,
//       title: "Poonam",
//       description: "penn",
//       start_time: "2021-09-11T19:19:00.000+05:30",
//       end_time: "2021-09-11T20:19:00.000+05:30",
//       lang: "en",
//     },
//     {
//       id: 2383,
//       title: "Poonam",
//       description: "penn",
//       start_time: "2021-09-11T19:19:00.000+05:30",
//       end_time: "2021-09-11T20:19:00.000+05:30",
//       lang: "en",
//     },
//     {
//       id: 2384,
//       title: "Poonam",
//       description: "penn",
//       start_time: "2021-09-11T19:19:00.000+05:30",
//       end_time: "2021-09-11T20:19:00.000+05:30",
//       lang: "en",
//     },
//     {
//       id: 2385,
//       title: "Poonam",
//       description: "penn",
//       start_time: "2021-09-11T19:19:00.000+05:30",
//       end_time: "2021-09-11T20:19:00.000+05:30",
//       lang: "en",
//     },
//     {
//       id: 2386,
//       title: "Poonam",
//       description: "penn",
//       start_time: "2021-09-11T19:19:00.000+05:30",
//       end_time: "2021-09-11T20:19:00.000+05:30",
//       lang: "en",
//     },
//     {
//       id: 2387,
//       title: "Poonam",
//       description: "penn",
//       start_time: "2021-09-11T19:19:00.000+05:30",
//       end_time: "2021-09-11T20:19:00.000+05:30",
//       lang: "en",
//     },
//     {
//       id: 2388,
//       title: "Poonam",
//       description: "penn",
//       start_time: "2021-09-11T19:19:00.000+05:30",
//       end_time: "2021-09-11T20:19:00.000+05:30",
//       lang: "en",
//     },
//   ],
// };

// function VolunteerDashboard() {
//   const [volunteerData, setvolunteerData] = useState();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [classes, setClasses] = useState([]);
//   const [slicedClasses, setSlicedClasses] = useState();
//   const user = useSelector(({ User }) => User);
//   const [pageNumber, setPageNumber] = useState(0);
//   const [debouncedText] = useDebounce(searchTerm);

//   const limit = 10;

//   // const volunteerClassData = props.location.state.pass
//   const pageCount = Math.ceil(volunteerClassData.classes.length / limit);
//   const changePage = ({ selected }) => {
//     setPageNumber(selected);
//   };

//   useEffect(() => {
//     const data = volunteerClassData.classes.filter((searchValue) => {
//       console.log("searchValue", searchValue);
//       console.log("Punnu", searchValue.title);
//       if (searchTerm == "") {
//         return searchValue;
//       } else if (
//         searchValue.title.toLowerCase().includes(searchTerm.toLowerCase())
//       ) {
//         return searchValue;
//       }
//     });
//     const slicedData = data.slice(pageNumber * limit, (pageNumber + 1) * limit);
//     setClasses(data);
//     setSlicedClasses(slicedData);
//   }, [debouncedText, pageNumber]);

//   useEffect(() => {
//     axios({
//       method: METHODS.GET,
//       url: `${process.env.REACT_APP_MERAKI_URL}/volunteers/1316`,
//       headers: { accept: "application/json", Authorization: user.data.token },
//     })
//       .then((res) => {
//         setvolunteerData(res.data);
//         console.log("res", res);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   }, []);
//   console.log("volunteerData", volunteerData);
//   console.log("searchTerm", searchTerm);

//   console.log("volunteerClassData", volunteerClassData);

//   return (
//     <>
//       <div className="volunteer-class-page-container">
//         <div className="volunteer-page-heading">
//           <div>
//             {/* Home  */}
//             <Link
//               className="home"
//               // className="t-data"
//               to={`${PATHS.HOME_PATH}`}
//             >
//               {" "}
//               Home
//             </Link>
//           </div>
//           <div> / {volunteerClassData.name}</div>
//         </div>
//         {/* </div> */}
//         {/* <div className="volunteer-table-container"> */}
//         {/* <div className="volunteer-search"> */}
//         <div className="volunteer-details">
//           <p className="volunteer-name">{volunteerClassData.name}</p>
//           <p>Python: English, Hindi</p>
//           <p>Total Classes: {volunteerClassData.classes.length}</p>
//           <p>Associated Partner: TPF Nirantar</p>
//         </div>
//         <div>
//           <input
//             className="volunteer-search-box"
//             type="text"
//             placeholder="Class title, languange..."
//             // placeholder="Search..."
//             value={debouncedText}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//             }}
//           />
//           {/* <div className="last-item">
//             <ReactPaginate
//               previousLabel={<i className="fa fa-angle-left"></i>}
//               nextLabel={<i className="fa fa-angle-right"></i>}
//               initialPage={0}
//               marginPagesDisplayed={0}
//               pageCount={pageCount}
//               onPageChange={changePage}
//               containerClassName="paginationBttns"
//               previousLinkClassName="previousBttn"
//               nextLinkClassName="nextBttn"
//               disabledClassName="paginationDisabled"
//               activeClassName="paginationActive"
//             />
//           </div> */}
//         </div>
//         {/* </div> */}
//         <table className="volunteer-class-table">
//           <thead>
//             <tr>
//               <th>Class Title</th>
//               <th>Class Date</th>
//               <th>Class Time</th>
//               <th>Student Enrollments</th>
//               <th>Language</th>
//               <th>Avg. Rating</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* {volunteerData &&
//               volunteerData.classes.map((item) => {
//                 console.log("item", item.lang);
//                 return (
//                   <tr key={item.id}>
//                     <td data-column="Class Title">{item.title}</td>
//                     <td data-column="Class Date">
//                       {moment.utc(item.end_time).format("DD-MM-YYYY")}
//                     </td>
//                     <td data-column="Class Time">
//                       {moment
//                         .utc(item.start_time)
//                         .add(330, "minute")
//                         .format("kk:mm")}
//                     </td>
//                     <td data-column="Enrollments">
//                       {item.max_enrollment ? item.max_enrollment : "NA"}
//                     </td>
//                     <td data-column="Language">{item.lang}</td>
//                     <td data-column="Avg. Rating">
//                       {[1, 2, 3, 4, 5].map((star) => {
//                         return item.avg_rating > 0 &&
//                           star <= item.avg_rating ? (
//                           <span
//                             className="fa fa-star"
//                             style={{ color: "#D55F31" }}
//                           ></span>
//                         ) : (
//                           <span
//                             className="fa fa-star"
//                             style={{ color: "gray" }}
//                           ></span>
//                         );
//                       })} */}
//             {
//               // volunteerClassData &&
//               //   volunteerClassData.length > 0 &&
//               classes && classes.length > 0 ? (
//                 slicedClasses.map((item) => {
//                   console.log("item", item.lang);
//                   return (
//                     <tr key={item.id}>
//                       <td data-column="Class Title">{item.title}</td>
//                       <td data-column="Class Date">
//                         {moment.utc(item.end_time).format("DD-MM-YYYY")}
//                       </td>
//                       <td data-column="Class Time">
//                         {moment
//                           .utc(item.start_time)
//                           .add(330, "minute")
//                           .format("kk:mm")}
//                       </td>
//                       <td data-column="Enrollments">
//                         {item.max_enrollment ? item.max_enrollment : "NA"}
//                       </td>
//                       <td data-column="Language">{item.lang}</td>
//                       <td data-column="Avg. Rating">
//                         {[1, 2, 3, 4, 5].map((star) => {
//                           return item.avg_rating > 0 &&
//                             star <= item.avg_rating ? (
//                             <span
//                               className="fa fa-star"
//                               style={{ color: "#D55F31" }}
//                             ></span>
//                           ) : (
//                             <span
//                               className="fa fa-star"
//                               style={{ color: "gray" }}
//                             ></span>
//                           );
//                         })}
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <div className="message ">
//                   <h3>There are no results to display...</h3>
//                 </div>
//               )
//             }
//           </tbody>
//         </table>
//         <div className="last-item">
//           <ReactPaginate
//             previousLabel={<i className="fa fa-angle-left"></i>}
//             nextLabel={<i className="fa fa-angle-right"></i>}
//             initialPage={0}
//             marginPagesDisplayed={0}
//             pageCount={pageCount}
//             onPageChange={changePage}
//             containerClassName="paginationBttns"
//             previousLinkClassName="previousBttn"
//             nextLinkClassName="nextBttn"
//             disabledClassName="paginationDisabled"
//             activeClassName="paginationActive"
//           />
//         </div>
//         {/* </div> */}
//       </div>
//     </>
//   );
// }

// export default VolunteerDashboard;

import React from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

function VolunteerDashboard() {
  const sampleObject = {
    name: "Poonam",
  };
  return (
    <JSONInput
      id="a_unique_id"
      placeholder={sampleObject}
      // colors={darktheme}
      locale={locale}
      height="550px"
    />
  );
}

export default VolunteerDashboard;

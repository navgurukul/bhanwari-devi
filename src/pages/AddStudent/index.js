import React from "react";
import "./style.scss";
import { useState } from "react";
import { useEffect, useRef } from "react";

function AddStudent() {
  const [closeform, setCloseform] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setCloseform(true);
        }}
        className="add_student_btn"
      >
        Add Student
      </button>
      {closeform ? (
        <div className="add_student_form_background">
          <OutsideAlerter
            handleClick={() => {
              setCloseform(false);
            }}
          >
            <div className="add_student_form">
              <div className="student_form_container">
                <span
                  className="close_add_student_form"
                  onClick={() => {
                    setCloseform(false);
                  }}
                >
                  X
                </span>
                <h2>Add New Student</h2>
                <label>Name of Student</label>
                <input
                  className="student_data_field"
                  placeholder="Name of Student"
                  type="text"
                />
                <label>Email of Student</label>
                <input
                  className="student_data_field"
                  placeholder="Email ID of Student"
                  type="email"
                />
                <button className="add_student_form_btn">Submit</button>
              </div>
            </div>
          </OutsideAlerter>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default AddStudent;
function useOutsideAlerter(ref, handleClick = false) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && handleClick) {
        handleClick();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, handleClick]);
}

function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.handleClick);

  return (
    <div ref={wrapperRef} className="d-inline">
      {props.children}
    </div>
  );
}

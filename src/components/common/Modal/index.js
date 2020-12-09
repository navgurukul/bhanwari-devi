import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import "./styles.scss";

const Modal = (props) => {
  const modalRef = useRef(null);
  const onClose = props.onClose;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (document.getElementById("main-modal").contains(event.target)) {
        // clicked inside the modal box. so not going to close it
      } else {
        if (onClose) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  return (
    <div className={`modalBackground ${props.backGroundClassName}`}>
      <div
        id="main-modal"
        className={`modal ${props.className}`}
        ref={modalRef}
      >
        <i
          className={`zmdi zmdi-close close ${props.closeStyle}`}
          onClick={handleClose}
        ></i>
        {props.children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  backGroundClassName: PropTypes.string,
  closeStyle: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  className: "",
  backGroundClassName: "",
  closeStyle: "",
};

export default Modal;

import React from "react";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./styles";

import {
  Typography,
  Container,
  CardContent,
  Button,
  Box,
  Modal,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";

function saveFile(url) {
  // Get file name from url.
  var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
  var xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = function () {
    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
    a.download = filename; // Set the file name.
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
  };
  xhr.open("GET", url);
  xhr.send();
}
function CertificatePDF(props) {
  const user = useSelector(({ User }) => User);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles({ isActive });
  const {
    item,
    openModal,
    setOpenModal,
    setLoader,
    setCertificate,
    certificate,
  } = props;

  const downloadCert = () => {
    saveFile(certificate);
  };

  const onCloseHandle = () => {
    setOpenModal(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isActive ? "300px" : "544px",
    bgcolor: "background.paper",
    outline: "none",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onCloseHandle}
    >
      <Box sx={modalStyle}>
        <div className={classes.crossButton}>
          <Typography
            sx={{ fontSize: "2em", fontWeight: "600" }}
          >{`${item}  Certificate`}</Typography>
          <CloseIcon
            className={classes.closeIcon}
            onClick={() => {
              setOpenModal(false);
            }}
          />
        </div>
        <div className={classes.pdfWrapper}>
          <iframe
            allowtransparency="true"
            border="0"
            className={classes.pdfFrame}
            src={`${certificate}#toolbar=0`}
          ></iframe>
          {/* <ReactPDF/> */}
        </div>
        <Typography>{`Meraki certifies that you have diligently 
        attended all classes and taken the practice questions.
         You have a good grasp of ${item} fundamentals.`}</Typography>
        <Box className={classes.certButtons}>
          {/* <Button onClick={shareCertificate}>Share to Friends</Button> */}
          <Button onClick={downloadCert} className={classes.greenButton}>
            Get Certificate
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CertificatePDF;

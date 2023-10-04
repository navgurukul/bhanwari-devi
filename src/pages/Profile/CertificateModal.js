import React from "react";
import { Typography, Box, Modal, Button } from "@mui/material";

function CertificateModal({ open, onClose, certificate, downloadCert }) {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "544px",
    bgcolor: "background.paper",
    outline: "none",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onClose}
    >
      <Box sx={modalStyle}>
        <Typography
          sx={{ fontSize: "32px", fontWeight: "600" }}
        >{`Certificate`}</Typography>
        <div>
          <iframe
            allowtransparency="true"
            border="0"
            src={`${certificate}#toolbar=0`}
            sx={{
              height: "100%",
              width: "100%",
              border: "none",
              outline: "none",
              brackgroundColor: "transparent !important",
            }}
          ></iframe>
        </div>
        <Typography>{`Meraki certifies that you have diligently 
            attended all classes and taken the practice questions.
             You have a good grasp of fundamentals.`}</Typography>
        <Box>
          <Button onClick={downloadCert}>Get Certificate</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CertificateModal;

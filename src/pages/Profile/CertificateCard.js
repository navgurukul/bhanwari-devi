import React from "react";
import { useEffect, useState, useRef } from "react";
import {
  Typography,
  Container,
  CardContent,
  Button,
  Box,
  Modal,
} from "@mui/material";
import { Card, Grid } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { METHODS } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { actions as enrolledBatchesActions } from "../../components/PathwayCourse/redux/action";
import { actions as pathwayActions } from "../../components/PathwayCourse/redux/action";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { interpolatePath, PATHS, versionCode } from "../../constant";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import { format } from "../../common/date";
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

function CertificateCard(props) {
  const classes = useStyles();
  const user = useSelector(({ User }) => User);
  const data = useSelector((state) => {
    return state;
  });
  const { item } = props;
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const [completedPortion, setCompletedPortion] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [certificate, setCertificate] = useState("");
  const [courseTime, setCourseTime] = useState();
  const [loader, setLoader] = useState(false);
  const params = useParams();
  const pathwayId = item.id;

  const date = new Date(courseTime);
  const options = { day: "numeric", month: "short", year: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: pathwayId }));
  }, [dispatch, pathwayId]);
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
  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: pathwayId }));
  }, [dispatch, pathwayId]);
  useEffect(() => {
    // setLoading(true);
    if (user?.data?.token && pathwayId) {
      dispatch(
        enrolledBatchesActions.getEnrolledBatches({
          pathwayId: pathwayId,
          authToken: user?.data?.token,
        })
      );
      axios({
        method: METHODS.GET,
        url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/completePortion`,
        headers: {
          accept: "application/json",
          Authorization: user?.data?.token,
        },
      }).then((response) => {
        // console.log("response", response.data.total_completed_portion);
        setCompletedPortion(response.data.total_completed_portion);
        setCourseTime(response.data.complete_at);
      });
    }
  }, [pathwayId]);
  // const pathwayId = params.pathwayId;
  const completedAll = completedPortion == 100;
  useEffect(() => {
    if (completedAll) {
      axios({
        method: METHODS.POST,
        url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/complete`,
        headers: {
          "version-code": versionCode,
          accept: "application/json",
          Authorization: user.data?.token || "",
        },
        data: {
          pathwayId: pathwayId,
        },
      });
    }
  });

  const handleModal = () => {
    setLoader(true);
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/certificate`,
      headers: {
        accept: "application/json",
        Authorization: user?.data?.token,
      },
    })
      .then((response) => {
        setLoader(false);
        setOpenModal((prev) => !prev);
        setCertificate(response?.data?.url);
      })
      .catch((err) => {});
  };
  // console.log(openModal, certificate);

  const downloadCert = () => {
    saveFile(certificate);
  };

  useEffect(() => {
    // Add event listener to detect clicks outside of the popup
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Close the popup if the user clicks outside of it
        handleModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // console.log(item);
  return (
    <Container sx={{ marginTop: "16px" }} maxWidth="lg" align="left">
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleModal}
      >
        <Box sx={modalStyle}>
          <Typography
            sx={{ fontSize: "32px", fontWeight: "600" }}
          >{`${item?.name}  Certificate`}</Typography>
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
            {/* <ReactPDF/> */}
          </div>
          <Typography>{`Meraki certifies that you have diligently 
            attended all classes and taken the practice questions.
             You have a good grasp of ${item?.name} fundamentals.`}</Typography>
          <Box>
            {/* <Button onClick={shareCertificate}>Share to Friends</Button> */}
            <Button onClick={downloadCert}>Get Certificate</Button>
          </Box>
        </Box>
      </Modal>

      {completedAll ? (
        <>
          <Card
            sx={{ width: isActive ? "356px" : "448px" }}
            fullWidth
            align="left"
          >
            <CardContent>
              <Grid Container sx={{ display: "flex" }}>
                <Grid item md={2}>
                  <img src={item.logo} maxWidth="40px" height="40px" />
                </Grid>
                <Grid item md={3}>
                  <Typography variant="subtitle1">{item.name}</Typography>
                </Grid>
                <Grid item display="flex" sx={{ marginLeft: "125px" }} md={5}>
                  <CheckCircleIcon
                    color="primary"
                    sx={{ marginTop: "3px", marginRight: "8px" }}
                  />
                  <Typography variant="body1">{formattedDate}</Typography>
                </Grid>
              </Grid>

              <Button color="primary" sx={{ mt: "16px" }} onClick={handleModal}>
                <DownloadIcon />
                Download Certificate
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <Typography variant="body1" sx={{ margin: "16px 0px" }}>
            Please complete one or more of the learning tracks in full to unlock
            your certificates.
          </Typography>
          <Link
            to={{
              pathname: PATHS.NEW_USER_DASHBOARD,

              pathwayId: item.id,
            }}
            style={{ textDecoration: "none" }}
          >
            <Button variant="outlined">Go to Dashboard</Button>
          </Link>
        </>
      )}
    </Container>
  );
}

export default CertificateCard;

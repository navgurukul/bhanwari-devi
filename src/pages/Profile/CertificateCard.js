import React from "react";
import { useEffect, useState } from "react";
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
import { interpolatePath, PATHS } from "../../constant";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
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

  const dispatch = useDispatch();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const [completedPortion, setCompletedPortion] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [certificate, setCertificate] = useState("");

  const [loader, setLoader] = useState(false);
  const params = useParams();
  const pathwayId = item.id;

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
  console.log(item);
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
      });
    }
  }, [pathwayId]);
  // const pathwayId = params.pathwayId;

  // console.log(completedAll,completedPortion,pathwayId)
  // const { pathwayCourse } = useSelector((state) => state.Pathways);
  // console.log(pathwayCourse)
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
  const completedAll = completedPortion.total >= 100;
  console.log(completedAll, completedPortion);

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
                  <Typography variant="body1">25 Dec 2022</Typography>
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

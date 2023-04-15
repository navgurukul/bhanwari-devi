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
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
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
import CertificatePDF from "../../components/common/CertificatePDF/CertificatePDF";

function CertificateCard(props) {
  const user = useSelector(({ User }) => User);
  const data = useSelector((state) => {
    return state;
  });
  const { item } = props;

  const dispatch = useDispatch();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles({ isActive });

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
  const completedAll = completedPortion === 100;
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
        setOpenModal(true);
        setCertificate(response?.data?.url);
      })
      .catch((err) => {});
  };

  return (
    <Container sx={{ marginTop: "16px" }} align="left">
      <CertificatePDF
        item={item.name}
        certificate={certificate}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleModal={handleModal}
        loader={loader}
      />

      {completedAll ? (
        <>
          <Card sx={{ width: { xs: "356px", sm: "448px" } }} align="left">
            <CardContent>
              <Grid sx={{ display: "flex" }}>
                <Grid item md={2}>
                  <img src={item.logo} height="40px" />
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
              {loader ? (
                <Button
                  color="primary"
                  sx={{ mt: "16px" }}
                  onClick={handleModal}
                >
                  <CircularProgress
                    sx={{ padding: "0px 60px" }}
                    color="primary"
                  />
                </Button>
              ) : (
                <Button
                  color="primary"
                  sx={{ mt: "16px" }}
                  onClick={handleModal}
                >
                  <DownloadIcon />
                  Download Certificate
                </Button>
              )}
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

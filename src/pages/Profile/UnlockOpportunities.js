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
import LockOpenIcon from "@mui/icons-material/LockOpen";
function UnlockOpportunities(props) {
  const user = useSelector(({ User }) => User);
  const data = useSelector((state) => {
    return state;
  });

  const { item } = props;

  const dispatch = useDispatch();
  const [completedPortion, setCompletedPortion] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [certificate, setCertificate] = useState("");
  const completedAll = completedPortion >= 100;
  const [loader, setLoader] = useState(false);
  const params = useParams();
  const pathwayId = item.id;

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

  return (
    <Container sx={{ marginTop: "16px" }} maxWidth="lg" align="left">
      {completedAll ? (
        <>
          <Typography variant="h6" mt="32px" mb="16px">
            Opportunities
            <LockOpenIcon sx={{ ml: "10px", marginTop: "10px" }} />
          </Typography>
          <Typography variant="body1">
            Get Coursera paid subscriptions, free keyboards and scholarships to
            bootcamps
          </Typography>
          <Link
            to={{
              pathname: PATHS.OPPORTUNITIES,

              pathwayId: item.id,
            }}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" sx={{ marginTop: "16px" }}>
              Explore Opportunities
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Typography variant="h6" mt="32px" mb="16px">
            Opportunities
            <LockOutlinedIcon sx={{ ml: "10px", marginTop: "10px" }} />
          </Typography>
          <Typography variant="body1">
            Unlock access to Coursera paid subscriptions, free keyboards and
            scholarships to bootcamps by completing the Python learning track.
          </Typography>
        </>
      )}
    </Container>
  );
}

export default UnlockOpportunities;

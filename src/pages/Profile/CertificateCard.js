import React from "react";
import { useEffect, useState } from "react";
import { Typography, Container, CardContent, Button } from "@mui/material";
import { Card, Grid } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { METHODS } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { actions as enrolledBatchesActions } from "../../components/PathwayCourse/redux/action";

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
  const user = useSelector(({ User }) => User);
  const data = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();
  const [completedPortion, setCompletedPortion] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [certificate, setCertificate] = useState("");
  const completedAll = completedPortion.total >= 100;
  const [loader, setLoader] = useState(false);
  const params = useParams();
  const pathwayId = params.pathwayId;
  console.log(pathwayId);

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
  console.log(openModal, certificate);

  const downloadCert = () => {
    saveFile(certificate);
  };
  useEffect(() => {
    // setLoading(true);
    if (
      user?.data?.token &&
      pathwayId &&
      (pathwayId == "1" || pathwayId == "2")
    ) {
      dispatch(
        enrolledBatchesActions.getEnrolledBatches({
          pathwayId: pathwayId,
          authToken: user?.data?.token,
        })
      );
    }
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/completePortion`,
      headers: {
        accept: "application/json",
        Authorization: user?.data?.token,
      },
    }).then((response) => {
      setCompletedPortion((prevState) => ({
        ...prevState,
        total: response?.data?.total_completed_portion,
      }));

      response.data.pathway.map((item) => {
        setCompletedPortion((prevState) => ({
          ...prevState,
          [item.course_id]: item.completed_portion,
        }));
      });
    });
  }, [dispatch, pathwayId]);
  // console.log(completedPortion.total)
  //   data.Pathways.data &&
  //   data.Pathways.data.pathways.forEach((pathway) => {
  //     pathways.forEach((item) => {
  //       if (pathway.code === item.code) {
  //         item["id"] = pathway.id;
  //       }
  //     });
  //   });
  //   console.log(data.Pathways.data &&
  //     data.Pathways.data.pathways)
  // const pathwayCourseData = pathways.find((item) => {
  //   console.log("item", item);
  //   return item.id == pathwayId;
  // });

  return (
    <Container sx={{ marginTop: "16px" }} maxWidth="lg" align="left">
      {/* {console.log(data.Pathways.data && data.Pathways.data.pathways)} */}
      {data.Pathways.data &&
        data.Pathways.data.pathways?.map(
          (item) =>
            completedAll && (
              <Card sx={{ width: "448px" }} align="left">
                <CardContent>
                  <Grid Container sx={{ display: "flex" }}>
                    <Grid item md={2}>
                      <img src={item.logo} maxWidth="40px" height="40px" />
                    </Grid>
                    <Grid item md={3}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </Grid>
                    <Grid item display="flex" sx={{ marginLeft: "125px" }}>
                      <CheckCircleIcon
                        color="primary"
                        sx={{ marginTop: "3px", marginRight: "8px" }}
                      />
                      <Typography variant="body1">25 Dec 2022</Typography>
                    </Grid>
                  </Grid>
                  <Button
                    color="primary"
                    sx={{ mt: "16px" }}
                    onClick={downloadCert}
                    onClose={handleModal}
                  >
                    <DownloadIcon />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>
            )
        )}
    </Container>
  );
}

export default CertificateCard;

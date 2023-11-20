import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import CreateClassComponent from "../../components/Class";
import ClassesList from "../../components/Class/ClassList";
import { useSelector } from "react-redux";
import "../../components/Class/ClassList/styles.scss";
import axios from "axios";
import { METHODS } from "../../services/api";
import "./styles.scss";
import useStyles from "./styles";
import {
  Container,
  Button,
  Modal,
  useMediaQuery,
  Box,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
} from "@mui/material";
import { breakpoints } from "../../theme/constant";
import ClassForm from "../../components/Class/ClassForm";
import SuccessModel from "../../components/Class/SuccessModel";
import NewVolunteerCard from "../../components/Class/NewVolunteerCard";
import DrawerLeft from "./Drawer";
import ReactPaginate from "react-paginate";

function ToggleClassFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("batch");
  const [classToEdit, setClassToEdit] = useState({});
  const [indicator, setIndicator] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(true);
  // const { data = [] } = useSelector(({ Class }) => Class.allClasses);
  const user = useSelector(({ User }) => User);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [openSuccessfullModal, setOpenSuccessfullModal] = useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const classes = useStyles();
  const [showClass, setShowClasses] = useState(true);
  const [pathwayID, setPathwayId] = useState(1);

  const [pathwayName, setPathwayName] = useState("Python");

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");

  const rolesList = user.data.user.rolesList;
  const canSpecifyFacilitator = rolesList.indexOf("admin") > -1;

  const [calenderConsent, setCalenderConsent] = useState(true);
  const [authUrl, setAuthUrl] = useState("");
  const [Newpathways, setNewPathways] = useState([]);
  const [typeOfClass, setTypeOfClass] = useState("batch");
  const url = window.location.href;

  const toggleModalOpen = () => {
    // setFormType();
    setClassToEdit({});
    // setShowModal(!showModal);
    CalenderConsent();
  };

  //here can check
  const editClass = (classId, indicator) => {
    setClassToEdit(data.find((classData) => classData.id === classId));
    setIsEditMode(true);
    setShowModal(true);
    setIndicator(indicator);
  };

  const CalenderConsent = () => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/calendar/tokens`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setCalenderConsent(true);
          setShowModal(true);
        } else {
          setCalenderConsent(false);
          setShowConsentModal(true);
          setShowModal(false);
        }
      })
      .catch((err) => {});
  };

  const handleClose = () => {
    setShowConsentModal(false);
  };

  const codeGenerate = async () => {
    return axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/calendar/generateAuthURL`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    })
      .then((res) => {
        setAuthUrl(res.data.url);
      })
      .catch((err) => {});
  };

  console.log("authUrl", authUrl);

  const calledOnce = useRef(false);
  const history = useHistory();

  useEffect(() => {
    let code;
    let payload;
    let user_id;
    let user_email;
    if (url.includes("code")) {
      const decodedUri = decodeURIComponent(url);
      console.log("decodedUri", decodedUri);
      user_id = decodedUri.split("=")[2].split("+")[0];
      user_email = decodedUri.split("=")[3].split("&")[0];
      code = url.split("code=")[1].split("scope")[0];
      console.log("code", code);
      console.log("user_id", user_id);
      console.log("user_email", user_email);
      payload = {
        ...payload,
        user_id: parseInt(user_id, 10),
        user_email: user_email,
      };
      calledOnce.current = true;
    }
    if (calledOnce.current) {
      return axios({
        method: METHODS.PUT,
        url: `${process.env.REACT_APP_MERAKI_URL}/users/calendar/tokens`,

        headers: {
          accept: "application/json",
          Authorization: user.data.token,
          code: code,
        },
        data: payload,
      })
        .then((res) => {
          if (res.data.success) {
            setShowModal(true);
            history.push("/batch");
          }
        })
        .catch((err) => {});
    }
  }, [calledOnce]);
  const [newVolunteer, setNewVolunteer] = useState(false);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState();
  const limit = 9;

  useEffect(() => {
    refreshKey &&
      axios({
        method: METHODS.GET,
        url: `${
          process.env.REACT_APP_MERAKI_URL
        }/batches/${pathwayID}?limit=${limit}&page=${
          page + 1
        }&typeOfClass=${typeOfClass}`,
        headers: {
          accept: "application/json",
          Authorization: user.data.token,
        },
      })
        .then((res) => {
          setData(res.data.batches);
          setTotalCount(res.data.total_count);
          setLoading(false);
          setRefreshKey(false);
        })
        .catch((res) => {
          setLoading(false);
        });
  }, [pathwayID, limit, page, typeOfClass, refreshKey, setRefreshKey]);

  const pageCount = Math.ceil(totalCount / limit);

  const changePage = ({ selected }) => {
    setPage(selected);
    setRefreshKey(true);
  };

  useEffect(() => {
    try {
      const newVol = localStorage.getItem("isNewVolunteer");
      if (newVol == "true" && newVol != null) {
        setNewVolunteer(true);
      } else {
        setNewVolunteer(false);
      }
    } catch (error) {
      //console.error('Error accessing localStorage:', error);
      return {};
    }
  }, [newVolunteer]);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/names`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    })
      .then((res) => {
        setNewPathways(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Container
      sx={{ mt: "40px" }}
      maxWidth={canSpecifyFacilitator ? "xl" : "lg"}
    >
      {/* for New volunteer */}
      {canSpecifyFacilitator && (
        <span>
          {newVolunteer && (
            <NewVolunteerCard setNewVolunteer={setNewVolunteer} />
          )}
        </span>
      )}
      <Grid container spacing={2}>
        {/* pathway drawer if you have admin role  */}
        {canSpecifyFacilitator && (
          <Grid item md={3}>
            <DrawerLeft
              setPathwayId={setPathwayId}
              setPathwayName={setPathwayName}
              Newpathways={Newpathways}
              pathwayName={pathwayName}
              setRefreshKey={setRefreshKey}
            />
          </Grid>
        )}
        {/* for switch Batch to doubt class */}
        <Grid item md={canSpecifyFacilitator ? 9 : 12}>
          {canSpecifyFacilitator && !isActive && (
            <Typography variant="h6">{pathwayName}</Typography>
          )}
          <Grid
            container
            marginTop={isActive ? "0px" : "16px"}
            style={{
              fontWeight: "bold",
              borderBottom: "1px solid #BDBDBD",
              justifyContent: "space-between",
            }}
          >
            <Grid item md={8} xs={12} sm={6} display="flex">
              <Button sx={{ paddingLeft: "0px" }}>
                <Typography
                  variant="subtitle2"
                  onClick={() => {
                    setShowClasses(true);
                    setTypeOfClass("batch");
                    setRefreshKey(true);
                  }}
                  // style={{ cursor: "pointer" }}
                  className={classes.underLine}
                  style={
                    showClass
                      ? {
                          fontWeight: "bold",
                          borderBottom: "3px solid #48a145",
                        }
                      : { color: "#9c9999" }
                  }
                >
                  Batches
                </Typography>
              </Button>
              <Button>
                <Typography
                  className={classes.underLine}
                  variant="subtitle2"
                  onClick={() => {
                    setShowClasses(false);
                    setTypeOfClass("doubt_class");
                    setRefreshKey(true);
                  }}
                  style={
                    !showClass
                      ? {
                          fontWeight: "bold",
                          borderBottom: "3px solid #48a145",
                        }
                      : { color: "#9c9999" }
                  }
                >
                  Doubt Classes
                </Typography>
              </Button>
            </Grid>

            <Grid
              item
              sx={{ height: "0px" }}
              md={4}
              xs={12}
              sm={6}
              align="right"
            >
              <div
                style={{
                  justifyContent: "right",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ReactPaginate
                  previousLabel={<i className="fa fa-angle-left"></i>}
                  nextLabel={<i className="fa fa-angle-right"></i>}
                  initialPage={0}
                  marginPagesDisplayed={0}
                  onPageChange={changePage}
                  pageCount={pageCount}
                  containerClassName="paginationBttns"
                  previousLinkClassName="previousBttn"
                  nextLinkClassName="nextBttn"
                  disabledClassName="paginationDisabled"
                  activeClassName="paginationActive"
                />
              </div>
            </Grid>
          </Grid>
          {/* <hr style={{border:
               "none",color:"#BDBDBD",height:"2px",backgroundColor:"#BDBDBD",
               margin:"0px"}}/> */}

          <ClassesList
            editClass={editClass}
            isShow={showModal}
            canSpecifyFacilitator={canSpecifyFacilitator}
            showClass={showClass}
            setFormType={setFormType}
            toggleModalOpen={toggleModalOpen}
            pathwayID={pathwayID}
            Newpathways={Newpathways}
            data={data}
            loading={loading}
            setRefreshKey={setRefreshKey}
            refreshKey={refreshKey}
          />

          {showModal && calenderConsent ? (
            <Modal
              open={showModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{ overflow: "scroll" }}
            >
              {/* { class form modal for doubt class, batches and edit class} */}
              <ClassForm
                isEditMode={isEditMode}
                indicator={indicator}
                classToEdit={classToEdit}
                formType={formType}
                setShowModal={setShowModal}
                setOpenSuccessfullModal={setOpenSuccessfullModal}
                setIsEditMode={setIsEditMode}
                setNewPathways={setNewPathways}
                Newpathways={Newpathways}
                singleTime={false}
                setRefreshKey={setRefreshKey}
              />
            </Modal>
          ) : (
            showConsentModal && (
              <Dialog
                open={showConsentModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                  style: {
                    minWidth: "45%",
                    borderRadius: 8,
                  },
                }}
              >
                {/*........ New user to take Calendar access to create class....... */}

                <DialogTitle>
                  <Typography variant="h6" align="center">
                    Meraki needs access to your calendar to create classes.{" "}
                    <br />
                    Do you want to go ahead?
                  </Typography>
                </DialogTitle>
                <Stack alignItems="center">
                  <DialogActions>
                    <Box sx={{ display: "flex", mb: 2 }}>
                      <Button
                        onClick={codeGenerate}
                        color="error"
                        variant="contained"
                        sx={{ mr: "15px", width: "100px" }}
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={handleClose}
                        color="grey"
                        variant="contained"
                        sx={{ width: "100px" }}
                      >
                        No
                      </Button>
                    </Box>
                  </DialogActions>
                </Stack>
              </Dialog>
            )
          )}
          {openSuccessfullModal && (
            <Modal
              open={openSuccessfullModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{ overflow: "scroll" }}
            >
              <SuccessModel />
            </Modal>
          )}
        </Grid>
      </Grid>

      {openSuccessfullModal && (
        <Modal
          open={openSuccessfullModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ overflow: "scroll" }}
        >
          <SuccessModel />
        </Modal>
      )}

      {authUrl && (window.location.href = authUrl)}
    </Container>
  );
}

export default ToggleClassFormModal;

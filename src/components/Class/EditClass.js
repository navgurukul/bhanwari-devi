import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// import { dateTimeFormat, TimeLeft } from "../../../constant";
// import { timeLeftFormat } from "../../common/date";
// import { format, dateTimeFormat, timeLeftFormat } from "../../../common/date";
import { METHODS } from "../../services/api";
import { actions as classActions } from "./redux/action";
import "./styles.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
  Typography,
  Button,
  Box,
  Stack,
  Menu,
  MenuItem,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
// import { useHistory } from 'react-router-dom';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MergeClass from "./MergeClass";

toast.configure();

function EditClass({ item, editClass, Newpathways, pathwayId }) {
  const dispatch = useDispatch();
  const [enrollShowModal, setEnrollShowModal] = React.useState(false);
  const [unenrollShowModal, setunenrollShowModal] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [editShowModal, setEditShowModal] = React.useState(false);
  const [deleteCohort, setDeleteCohort] = React.useState(false);
  const [indicator, setIndicator] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const user = useSelector(({ User }) => User);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [refreshKey, setRefreshKey] = useState(false);

  const handleOpenUserMenu = (event) => {
    event.stopPropagation();
    setAnchorElUser(event.currentTarget);
  };

  const handleClose = () => {
    setShowModal(false);
    setDeleteCohort(false);
  };

  const handleEdit = () => {
    setEditShowModal(true);
    setAnchorElUser(null);
  };

  const handleCloseEdit = (e) => {
    e.stopPropagation();
    setEditShowModal(false);
    setIndicator(false);
  };

  const handleClickOpen = () => {
    setShowModal(!showModal);
    setIndicator(false);
    setAnchorElUser(null);
  };

  const handleCloseEnroll = () => {
    setEnrollShowModal(false);
    setIndicator(false);
  };

  const handleCloseUnenroll = () => {
    setunenrollShowModal(false);
    setIndicator(false);
  };
  const handleClickOpenUnenroll = () => {
    setunenrollShowModal(!unenrollShowModal);
    setIndicator(false);
    setAnchorElUser(null);
  };

  const rolesList = user.data.user.rolesList;
  let flag = false;
  rolesList.includes("admin") || rolesList.includes("classAdmin")
    ? (flag = true)
    : (flag = false);

  // API CALL FOR DELETE CLASS
  const deleteHandler = (id) => {
    const notify = () => {
      toast.success(" Deleted the class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    setShowModal(!showModal);
    return axios({
      method: METHODS.DELETE,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${id}`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
        "delete-all": deleteCohort,
      },
    }).then(() => {
      notify();
      dispatch(classActions.deleteClass(id));
    });
  };

  // API CALL FOR enroll class
  const handleSubmit = (Id) => {
    setLoading(true);
    const notify = () => {
      toast.success("You have been enrolled to class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    let getNotify = false;
    setEnrollShowModal(!enrollShowModal);
    const timer = setTimeout(() => {
      getNotify = true;
      setLoading(false);
    }, 10000);
    axios
      .post(
        // `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register?register-all=${indicator}`,
        `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.data.token,
            "register-to-all": indicator,
          },
        }
      )
      .then((res) => {
        if (!getNotify) {
          notify();
          clearTimeout(timer);
          setLoading(false);
        }
        dispatch(classActions.enrolledClass(Id));
      })
      .catch((res) => {
        toast.error("Already enrolled in another batch", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
          color: "red",
        });
        setLoading(false);
      });
  };
  // API CALL FOR DROP OUT
  const handleDropOut = (Id) => {
    setLoading(true);
    const notify = () => {
      toast.success("You have been dropped out of class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    let getNotify = false;
    setunenrollShowModal(!unenrollShowModal);
    const timer = setTimeout(() => {
      getNotify = true;
      dispatch(classActions.dropOutClass(Id));
      setLoading(false);
      notify();
    }, 10000);
    return axios({
      method: METHODS.DELETE,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/unregister?unregister-all=${indicator}`,
      // url: `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/unregister`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
        // "unregister-to-all": indicator,
      },
    }).then((res) => {
      if (!getNotify) {
        notify();
        clearTimeout(timer);
        setLoading(false);
      }
      dispatch(classActions.dropOutClass(Id));
    });
  };
  const ACBPathway = Newpathways?.find((path) => {
    return item?.PartnerSpecificBatches?.pathway_id === path.id;
  });

  useEffect(() => {
    if (refreshKey) {
      dispatch(classActions.getClasses());
      setRefreshKey(false);
    }
  }, [dispatch, refreshKey]);

  const { data = [] } = useSelector(({ Class }) => Class.allClasses);

  const pathwayFilter =
    data &&
    data?.filter((data) => {
      // if I click on a pathway, batches should be filter by that pathway
      return data?.pathway_id === item?.PartnerSpecificBatches?.pathway_id;
    });

  return (
    <>
      <MoreVertIcon
        style={{ color: "#BDBDBD", cursor: "pointer" }}
        onClick={handleOpenUserMenu}
        sx={{ p: 0 }}
      />

      {/* dialog box for edit delete and merge class  */}
      <Menu
        sx={{ mt: "15px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        maxWidth="130px"
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: { width: "150px" },
        }}
        open={Boolean(anchorElUser)}
        onClose={() => {
          setAnchorElUser(null);
        }}
      >
        {(item?.facilitator.email === user.data.user.email || flag) && (
          <>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(item.id);
              }}
              sx={{ width: 133, margin: "0px 10px" }}
            >
              <Typography textAlign="center">Edit</Typography>
            </MenuItem>

            {ACBPathway?.code === "ACB" && !item?.merge_class && (
              <MergeClass
                item={item}
                itemID={item.id}
                PathwayID={pathwayId}
                pathwayFilter={pathwayFilter}
                setRefreshKey={setRefreshKey}
              />
            )}
            <MenuItem
              onClick={(e) => {
                handleClickOpen(item.id);
                e.stopPropagation();
              }}
              sx={{ width: 133, margin: "0px 10px", color: "#F44336" }}
            >
              <Typography textAlign="center">Delete</Typography>
            </MenuItem>
          </>
        )}

        {!rolesList.includes("volunteer") && item.enrolled && (
          <MenuItem
            onClick={() => handleClickOpenUnenroll(item.id)}
            sx={{ width: 120, margin: "0px 10px" }}
          >
            <Typography textAlign="center">Dropout</Typography>
          </MenuItem>
        )}
      </Menu>

      <Box>
        {/* dialog box for delete button */}
        {showModal ? (
          <Dialog
            open={showModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>
              <Typography variant="h6" align="center">
                Are you sure you want to delete this class?
              </Typography>
            </DialogTitle>
            {(item.type === "cohort" || item.type === "batch") && (
              <Stack alignItems="center">
                <FormControlLabel
                  align="center"
                  control={
                    <Checkbox
                      onClick={() => {
                        setDeleteCohort(true);
                      }}
                    />
                  }
                  label="Delete all classes of this Batch?"
                />
              </Stack>
            )}
            <Stack alignItems="center">
              <DialogActions>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      return deleteHandler(item.id);
                    }}
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
        ) : null}
        {/* dialog box for  edit class*/}
        {editShowModal ? (
          <Dialog
            open={editShowModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              style: {
                minWidth: "35%",
                borderRadius: 8,
              },
            }}
          >
            <DialogTitle>
              <Typography variant="h6" align="center">
                Do you want to edit this class?
              </Typography>
            </DialogTitle>

            {(item.type === "cohort" || item.type === "batch") && (
              <Stack alignItems="center">
                <FormControlLabel
                  align="center"
                  control={
                    <Checkbox
                      onClick={() => {
                        setIndicator(true);
                        // setSingleTime(false);
                      }}
                    />
                  }
                  label=" Edit all classes of this Batch?"
                />
              </Stack>
            )}
            <Stack alignItems="center">
              <DialogActions>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditShowModal(false);

                      return editClass(item.id, indicator);
                    }}
                    color="primary"
                    variant="contained"
                    sx={{ mr: "15px", width: "100px" }}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={handleCloseEdit}
                    color="grey"
                    variant="contained"
                    sx={{ width: "100px" }}
                  >
                    Cancel
                  </Button>
                </Box>
              </DialogActions>
            </Stack>
          </Dialog>
        ) : null}
        {/* dialog box for enroll class */}
      </Box>
    </>
  );
}
export default EditClass;

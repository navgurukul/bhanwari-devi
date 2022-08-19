import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { ListItem, ListItemButton, List } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { interpolatePath, PATHS } from "../../../../constant";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

function MobileDrawer(props) {
  const params = useParams();
  const { window, open, setOpen, list, setSelected } = props;
  const selected = parseInt(params.exerciseId);
  const courseName = list[0]?.course_name.toUpperCase();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const clickOnTitle = (index) => () => {
    setOpen(false);
    setSelected(index);
  };
  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(60% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding + 50,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Typography sx={{ p: 2, color: "transparent" }}>
            51 results
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <Typography style={{ fontWeight: "400" }} variant="subtitle2">
                  {courseName}
                </Typography>
              </ListItemButton>
            </ListItem>
            {list?.map((obj, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={clickOnTitle(index)}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: index === selected ? "#48A145" : "#6D6D6D",
                      textDecoration: "none",
                      boxShadow: "none",
                    }}
                    variant="caption"
                    component={Link}
                    to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                      exerciseId: index,
                      courseId: params.courseId,
                      pathwayId: params.pathwayId,
                    })}
                  >
                    {obj.name
                      ? obj.name
                      : obj.course_name
                      ? obj.course_name
                      : "N/A"}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

MobileDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MobileDrawer;

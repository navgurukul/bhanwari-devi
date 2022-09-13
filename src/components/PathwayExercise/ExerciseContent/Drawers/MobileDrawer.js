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
import useStyles from "./styles";

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
  position: "absolute",
  top: -drawerBleeding + 50,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  visibility: "visible",
  right: 0,
  left: 0,
}));

function Item({
  progressTrackId,
  selected,
  index,
  setOpen,
  setSelected,
  classes,
  params,
  contentType,
  id,
  title,
}) {
  const [completed, setCompleted] = React.useState(false);

  const ItemStyle = {
    color: selected === index || completed ? "#48A145" : "#6D6D6D",
    fontWeight: selected === index ? "bold" : "",
  };
  const clickOnTitle = (index) => () => {
    setSelected(index);
    setOpen(false);
  };
  React.useEffect(() => {
    if (contentType === "assessment") {
      if (progressTrackId?.assessments.includes(id)) {
        setCompleted(true);
      }
    } else if (contentType === "class_topic") {
      if (progressTrackId?.classes.includes(id)) {
        setCompleted(true);
      }
    } else if (contentType === "exercise") {
      if (progressTrackId?.exercises.includes(id)) {
        setCompleted(true);
      }
    }
  }, [progressTrackId]);

  return (
    <>
      <ListItem key={index} disablePadding>
        <ListItemButton onClick={clickOnTitle(index)}>
          <Typography
            className={classes.ListItemsTypography}
            component={Link}
            variant="caption"
          >
            <Link
              style={ItemStyle}
              className={classes.ListItemLink}
              to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                courseId: params.courseId,
                exerciseId: index,
                pathwayId: params.pathwayId,
              })}
            >
              {title}
            </Link>
          </Typography>
        </ListItemButton>
      </ListItem>
    </>
  );
}

function MobileDrawer(props) {
  const params = useParams();
  const { window, open, setOpen, list, setSelected, progressTrackId } = props;
  const selected = parseInt(params.exerciseId);
  const courseName = list[0]?.course_name.toUpperCase();
  const classes = useStyles();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {/*For rounded corners*/}
        <StyledBox>
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
                <Typography
                  className={classes.courseNameTypography}
                  variant="subtitle2"
                >
                  {courseName}
                </Typography>
              </ListItemButton>
            </ListItem>
            {list?.map((obj, index) => (
              <Item
                key={index}
                progressTrackId={progressTrackId}
                setSelected={setSelected}
                selected={selected}
                setOpen={setOpen}
                index={index}
                classes={classes}
                params={params}
                contentType={obj.content_type}
                id={obj.id}
                title={obj.name || obj.sub_title || obj.content_type || "N/A"}
              />
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

import React from "react";
import {
  Typography,
  Container,
  Grid,
  Stack,
  Box,
  Button,
  Card,
  CardContent,
} from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import SelectTrack from "./SelectTrack";
// import IntroVideo from "./IntroVideo";
// import CodeOfConduct from "./CodeOfConduct";

function VolunteerAutomation() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid sx={{ background: "yellow" }} item xs={12} ms={6} md={6}>
          <Typography variant="h5" gutterBottom>
            Help Students Get their Dream Job in Tech
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          ms={6}
          md={6}
          sx={{ background: "red", display: { xs: "none", md: "flex" } }}
        >
          <img src={require("./assets/Group.svg")} />
        </Grid>
      </Grid>

      <Typography variant="h5" align="center" gutterBottom>
        Areas to Volunteer In
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} ms={6} md={6}>
          <Card
            sx={{
              boxShadow: "4px 4px 0px #E9F5E9",
              border: "1px solid #48A145",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Teaching
              </Typography>
              <Box sx={{ display: "flex" }}>
                <ArrowRightAltIcon />
                <Typography sx={{ paddingLeft: "10px" }} Typography>
                  Python
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <ArrowRightAltIcon />
                <Typography sx={{ paddingLeft: "10px" }} Typography>
                  Spoken English
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardContent>
              {/* <Grid item xs={12} ms={12} md={4}> */}
              <Button variant="contained" color="primary">
                Start Now
              </Button>
              {/* </Grid> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} ms={6} md={6}>
          <Card
            sx={{
              boxShadow: "4px 4px 0px #DADAEC",
              border: "1px solid #4548A1",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Tech
              </Typography>

              <Box sx={{ display: "flex" }}>
                <ArrowRightAltIcon />
                <Typography sx={{ paddingLeft: "10px" }} Typography>
                  UX/Graphic Design
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <ArrowRightAltIcon />
                <Typography sx={{ paddingLeft: "10px" }} Typography>
                  Android (Kotlin)
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <ArrowRightAltIcon />
                <Typography sx={{ paddingLeft: "10px" }} Typography>
                  Front End Dev (React)
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <ArrowRightAltIcon />
                <Typography sx={{ paddingLeft: "10px" }}>
                  {" "}
                  Back End Dev{" "}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <ArrowRightAltIcon />
                <Typography sx={{ paddingLeft: "10px" }}>
                  {" "}
                  Project Management
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <ArrowRightAltIcon />
                <Typography sx={{ paddingLeft: "10px" }}>
                  Curriculum Creation & Translation{" "}
                </Typography>
              </Box>

              {/* <List>
                                        <ListItem >
                                            <ListItemIcon>
                                                <ArrowRightAltIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="UX/Graphic Design" />
                                            
                                        </ListItem>

                                        <ListItem >
                                            <ListItemIcon>
                                                <ArrowRightAltIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Drafts" />

                                        </ListItem>
                                    </List> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5, mb: 15 }}>kkk</Box>
      {/* <SelectTrack />
      <IntroVideo />
      <CodeOfConduct /> */}
    </Container>
  );
}

export default VolunteerAutomation;

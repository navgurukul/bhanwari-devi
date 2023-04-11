import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function CreatePartner(props) {
  const [addpartner, setAddPartner] = useState({
    name: "",
    contact: "",
    email: "",
    location: "",
  });
  const handleChange = (event) => {
    setAddPartner({ ...addpartner, [event.target.name]: event.target.value });
  };
  console.log(addpartner);
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogContent>
            <Grid container mb={3}>
              <Grid item xs={11}>
                <Typography variant="h6" component="h2">
                New partner
                </Typography>
              </Grid>
              <Grid
                color="text.secondary"
                item
                xs={1}

                
            >
                <CloseIcon
                  onClick={props.handleClose}
                />
              </Grid>
            </Grid>
         
          <TextField
            autoFocus
            label="Partner Name"
            name="name"
            onChange={handleChange}
            value={addpartner.name}
            fullWidth
          />
          <TextField
            autoFocus
            label="Point Of Contact Name"
            name="contact"
            onChange={handleChange}
            value={addpartner.contact}
            fullWidth
          />
          <TextField
            autoFocus
            label="Point Of Contact Email"
            name="email"
            onChange={handleChange}
            value={addpartner.email}
            fullWidth
          />
          <TextField
            autoFocus
            label="Location (City/District)"
            name="location"
            onChange={handleChange}
            value={addpartner.location}
            fullWidth
          />
        </DialogContent>
        <Box sx={{ p: 2, mt: -3 }}>
          <DialogActions>
            <Button variant="contained" color="primary" fullWidth>
              Create Partner
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default CreatePartner;

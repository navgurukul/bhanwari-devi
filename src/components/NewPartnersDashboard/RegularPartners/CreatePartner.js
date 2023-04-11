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
                New Partner
              </Typography>
            </Grid>
            <Grid color="text.secondary" item xs={1}>
              <CloseIcon onClick={props.handleClose} />
            </Grid>
          </Grid>
          <TextField
            autoFocus
            margin="dense"
            label="Partner  Name"
            value={addpartner.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Point Of Contact Name"
            value={addpartner.contact}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Point Of Contact Email "
            value={addpartner.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Location (City/District)"
            value={addpartner.location}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <Box sx={{ pb: 2, px: 2 }}>
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

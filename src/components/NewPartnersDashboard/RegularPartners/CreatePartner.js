import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
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
          <DialogContentText variant="h6" sx={{ color: "black" }}>
            New partner
          </DialogContentText>
          <DialogActions>
            <Button sx={{ mt: -5 }} onClick={props.handleClose}>
              <CloseIcon />
            </Button>
          </DialogActions>
          <TextField
            autoFocus
            margin="dense"
            label="Partner Name"
            name="name"
            onChange={handleChange}
            value={addpartner.name}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Point Of Contact Name"
            name="contact"
            onChange={handleChange}
            value={addpartner.contact}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Point Of Contact Email"
            name="email"
            onChange={handleChange}
            value={addpartner.email}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Location (City/District)"
            name="location"
            onChange={handleChange}
            value={addpartner.location}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{
              background: "#48A145",
              color: "white",
              width: "31em",
              height: "3em",
              marginRight: 13,
            }}
          >
            Create Partner
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreatePartner;

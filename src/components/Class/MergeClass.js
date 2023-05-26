import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem,
    Typography,
    TextField,FormControl,
    InputLabel,Select,Autocomplete
    
 } from '@mui/material';
 import axios from "axios";
import { METHODS } from "../../services/api";
import { useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";

export default function AlertDialog({itemID,PathwayID,pathwayFilter}) {
  const [open, setOpen] = React.useState(false);
    const [marginId,setMarginId]=useState()
    const user = useSelector(({ User }) => User);
    


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (Id) => {
    axios({
      method: METHODS.POST,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${marginId}/mergeClass`,
      headers: {
        "Content-Type": "application/json",
        Authorization: user.data.token,
      },
      data: {
        // mergeClassId: merginId,
        classId: Id
      },
      
    })
}
  return (
    <div>
       <MenuItem
          onClick={handleClickOpen}
          sx={{ width: 138, margin: "0px 10px" }}
              >
                <Typography textAlign="center">Merage Class</Typography>
              </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{padding:"32px",margin:"32px"}}
        
      >
        <DialogTitle id="alert-dialog-title" sx={{display:"flex",justifyContent:"space-between",}}>
             <Typography variant='h6'> Merge Class</Typography>
             <CloseIcon onClick={handleClose}
             sx={{cursor:"pointer"}}/>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
            <Typography variant='subtitle2'>
            Please choose a batch to add students of this class to that batch’s same class
            </Typography>
            <FormControl  fullWidth sx={{margin:"32px 0px"}}>
                  <InputLabel id="demo-simple-select-label">Merge Batch</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Courses"
                    onClick={() => {
                   
                    }}
                  
                    onChange={(e) => {
                      setMarginId(e.target.value)
                    }}
                  >
                    {pathwayFilter?.map((item)=>{
                        return(
                        (item.id!==itemID) &&
                        <MenuItem key={item.id} value={item.id}>
                        {item.title}
                      </MenuItem>
                        )})}
                        
                  </Select>
                  {/* <FormHelperText>{helperText.course}</FormHelperText> */}
                 </FormControl> 
                 <Typography variant="body2">The tutor and students will receive the updated class invitations</Typography>
             
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
          variant="contained"
           onClick={()=>
            {handleSubmit(itemID);
                handleClose()
            }}>Confirm Class Merger</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
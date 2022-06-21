import * as React from "react";
import {
  Typography,
  Chip,
  Grid,
  Button,
  Box,
  Modal,
  TextField,
  Stack,
  Checkbox,
  FormGroup,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { breakpoints } from "../../theme/constant";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ClassFormModel() {
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const rootRef = React.useRef(null);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  const handleDelete = (value) => {
    setValue(" ");
  };

  return (
    <Box
      sx={{
        height: 990,
        flexGrow: 1,
        minWidth: 320,
        transform: "translateZ(0)",
        "@media all and (-ms-high-contrast: none)": {
          display: "none",
        },
      }}
      ref={rootRef}
    >
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        container={() => rootRef.current}
      >
        <Box
          sx={{
            width: 500,
            bgcolor: "background.paper",
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" mb={4}>
            Create Batch
          </Typography>
          <div>
            <TextField fullWidth label="Batch Name" defaultValue="Ankit_2022" />
            <Typography variant="body2" color="text.secondary" mb={3} mt={2}>
              We will automatically create 28 classes for a Python batch with
              titles and descriptions
            </Typography>
          </div>
          <div>
            <TextField fullWidth label="For me" defaultValue="DVE" />
            <Chip label="DITI1" onDelete={handleDelete} sx={{ mt: 2 }} />
            <Typography variant="body2" color="text.secondary" mt={2}>
              This batch will be visible to students of only these partner
            </Typography>
          </div>
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider> */}
          <div>
            <FormLabel component="legend">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ pt: 3 }}
                mb={2}
              >
                Schedule on days
              </Typography>
            </FormLabel>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="MO"
                control={<Checkbox />}
                label="MO"
                labelPlacement="MO"
              />
              <FormControlLabel
                value="Tu"
                control={<Checkbox />}
                label="TU"
                labelPlacement="TU"
              />
            </FormGroup>
          </div>
          <Grid mt={3}>
            <TextField
              type="time"
              placeholder="Start Time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 235 }}
            />
            <TextField
              type="time"
              placeholder="Start Time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 235, ml: 3 }}
            />
          </Grid>
          <div>
            <FormControl sx={{ mt: 2 }}>
              <FormLabel>Language</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="English"
                  control={<Radio />}
                  label="English"
                />
                <FormControlLabel
                  value="Hindi"
                  control={<Radio />}
                  label="Hindi"
                />
                <FormControlLabel
                  value="Telugu"
                  control={<Radio />}
                  label="Telugu"
                />
                <FormControlLabel
                  value="Tamil"
                  control={<Radio />}
                  label="Tamil"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ mb: 4, mt: 2 }}>
              <RadioGroup row>
                <Typography variant="body1" pt={1} pr={2}>
                  Cap enrollments at
                </Typography>
                <FormControlLabel
                  value="No Limit"
                  control={<Radio />}
                  label="No Limit"
                />
                <FormControlLabel value="10" control={<Radio />} label="10" />
                <FormControlLabel value="20" control={<Radio />} label="20" />
                <FormControlLabel value="30" control={<Radio />} label="30" />
              </RadioGroup>
            </FormControl>
          </div>
          <Button variant="contained" fullWidth>
            Create Batch
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

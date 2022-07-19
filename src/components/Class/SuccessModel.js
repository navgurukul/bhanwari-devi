import React from "react";
import {
  Typography,
  Grid,
  Button,
  Box,
  Stack,
  Autocomplete,
  Checkbox,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Container,
} from "@mui/material";
import useStyles from "./styles";

function SuccessModel() {
  const classes = useStyles();
  return (
    <Stack align="center" className={classes.successModel}>
      <Box className={classes.ModelBox} sx={{ bgcolor: "background.paper" }}>
        <img alt="img" src={require("./assets/ClassCreated.svg")} />
        <Typography variant="body1" mt={4}>
          The batch has been created successfully
        </Typography>
      </Box>
    </Stack>
  );
}

export default SuccessModel;

// const SuccessModel = () => {
//     const classes = useStyles();
//     return (
//       <Stack align="center" className={classes.successModel}>
//         <Box className={classes.ModelBox} sx={{ bgcolor: "background.paper" }}>
//           <img alt="img" src={require("./assets/ClassCreated.svg")} />
//           <Typography variant="body1" mt={4}>
//             The batch has been created successfully
//           </Typography>
//         </Box>
//       </Stack>
//     );
//   };

import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import useStyles from "./styles";

function SuccessModel({ successModalMsg, classType }) {
  const classes = useStyles();
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Stack align="center" className={classes.successModel}>
        <Box className={classes.ModelBox} sx={{ bgcolor: "background.paper" }}>
          <img alt="img" src={require("./assets/ClassCreated.svg")} />
          <Typography variant="body1" mt={4}>
            {`The ${
              classType == "batch" ? classType : "doubt class"
            } has been ${successModalMsg} successfully`}
          </Typography>
        </Box>
      </Stack>
    </div>
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

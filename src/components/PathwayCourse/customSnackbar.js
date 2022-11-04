import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import theme from '../../theme/theme';

const CustomSnackbar = ({openSnackbar, handleSnackbar, pathwayName}) => {
    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            message={`Please complete all the courses to unlock ${pathwayName}  certificate`}
            onClose={handleSnackbar}
            ContentProps={{
                sx: {
                    background: theme.palette.secondary.contrastText,
                    fontWeight: "400",
                    fontSize: theme.typography.fontSize,
                    width: "328px",
                    textAlign: "left",
                },
            }}
        />
    );
};

export default CustomSnackbar;
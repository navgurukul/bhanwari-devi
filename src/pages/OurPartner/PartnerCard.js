import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Link,
  IconButton,
} from "@mui/material";
import useStyles from "./Styles";

const PartnerCard = ({ partnerData }) => {
  const classes = useStyles();
  return (
    <Card elevation={2} sx={{ height: "210px" }}>
      <CardContent sx={{ height: "140px" }}>
        <Typography variant="subtitle1" gutterBottom mb={1}>
          {partnerData.Name}
        </Typography>
        {/* Render Organization Type Chip */}
        {partnerData.OrganisationType === "Non - Profit" ? (
          <Chip
            label={partnerData.OrganisationType}
            mt={2}
            variant="caption"
            sx={{
              background: "#FFF3CD",
              fontFamily: "Noto sans",
            }}
          />
        ) : partnerData.OrganisationType === "Government" ? (
          <Chip
            label={partnerData.OrganisationType}
            mt={2}
            variant="caption"
            sx={{
              background: "#DADAEC",
              fontFamily: "Noto sans",
            }}
          />
        ) : partnerData.OrganisationType === "Educational Institution" ? (
          <Chip
            label={partnerData.OrganisationType}
            mt={2}
            variant="contained"
            sx={{
              background: "#D3EAFD",
              fontFamily: "Noto sans",
            }}
          />
        ) : partnerData.OrganisationType === "Community based organisation" ? (
          <Chip
            label={partnerData.OrganisationType}
            mt={2}
            variant="contained"
            sx={{
              background: "#FFE6E8",
              fontFamily: "Noto sans",
            }}
          />
        ) : (
          ""
        )}
      </CardContent>
      <CardActions sx={{ height: "8px" }}>
        {/* Render Link to Partner's Website */}
        {partnerData.Url !== "NA" && partnerData.Url !== null && (
          <IconButton>
            <Link href={partnerData.Url} target="_blank">
              <img
                className={classes.icons}
                src={require("./assest/world_icon.svg")}
                alt="World Img"
              />
            </Link>
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default PartnerCard;

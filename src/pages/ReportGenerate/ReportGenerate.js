import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ReportGenerate = () => {
  const user = useSelector(({ User }) => User); // Use inside the component
  const [csvUpdatedTime, setCSVUpdatedTime] = useState({});
  

  useEffect(() => {
    if (user?.data?.token) {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_MERAKI_URL}/tcb/csv/read-date-csv`,
        headers: { accept: "application/json", Authorization: user.data.token },
      })
        .then((response) => {
          setCSVUpdatedTime(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user?.data?.token]); // Add token as dependency

  const downloadReport = (url, fileName = "report.csv") => {
    if (!url) {
      console.error("URL is required to download the report.");
      return;
    }

    if (!user?.data?.token) {
      console.error("User token is missing.");
      return;
    }

    axios({
      method: "GET",
      url: url,
      headers: { accept: "application/json", Authorization: user.data.token },
      responseType: "blob",
    })
      .then((res) => {
        const blob = new Blob([res.data]);
        const downloadUrl = window.URL.createObjectURL(blob); // Changed variable name
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the DOM
      })
      .catch((err) => {
        console.error("Error downloading the report:", err);
        alert("Failed to download the report. Please try again.");
      });
  };

  const studentReport1 = () => {
    const reportUrl = `${process.env.REACT_APP_MERAKI_URL}/tcb/csv/progress/roport`;
    downloadReport(reportUrl);
  };

  const studentReport2 = () => {
    const reportUrl = `${process.env.REACT_APP_MERAKI_URL}/tcb/csv/last-week/login-report`;
    downloadReport(reportUrl);
  };

  

  return (
    <div className="container-table">
      <Typography variant="h6">peepul india</Typography>
      <Typography variant="subtitle1" style={{ marginTop: "32px" }}>
        MCDigital Course-2.0
      </Typography>
      <Grid container spacing={4} style={{ marginTop: "16px" }}>
        <Grid item xs={12} sm={6}>
          <Card elevation={2} sx={{ p: "16px 16px 8px 16px" }}>
            <CardContent>
              <Typography variant="subtitle1">
                All Time Student Progress Report
              </Typography>
              <Typography
                variant="body2"
                style={{
                  margin: "16px 0",
                  display: "flex",
                  color: "text.secondary",
                }}
              >
                <AccessTimeIcon sx={{ mr: 1, width: "24px", height: "24px" }} />
                Last updated on {csvUpdatedTime?.allUsersDetailUpdatedOn} at{" "}
                {csvUpdatedTime?.at}
              </Typography>
              <Typography variant="body1">
                The report contains student progress since the start of the
                programme until the present day.
              </Typography>
              <Button
                variant="contained"
                onClick={studentReport1}
                style={{ margin: "16px 0 8px 0" }}
              >
                Download Report
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card elevation={2} sx={{ p: "16px 16px 8px 16px" }}>
            <CardContent>
              <Typography variant="subtitle1">
                Seven Days Student Progress Report
              </Typography>
              <Typography
                variant="body2"
                style={{
                  margin: "16px 0",
                  display: "flex",
                  color: "text.secondary",
                }}
              >
                <AccessTimeIcon sx={{ mr: 1, width: "24px", height: "24px" }} />
                Last updated on{" "}
                {csvUpdatedTime?.lastWeekUsersLoginDetailsUpdatedOn} at{" "}
                {csvUpdatedTime?.at}
              </Typography>
              <Typography variant="body1">
                The report contains student progress from the last 7 days
                until the present day.
              </Typography>
              <Button
                variant="contained"
                onClick={studentReport2}
                style={{ margin: "16px 0 8px 0" }}
              >
                Download Report
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
  
};

export default ReportGenerate;

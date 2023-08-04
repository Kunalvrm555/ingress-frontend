import React, { useState } from "react";
import Statistics from "./Statistics";
import Status from "./Status";
import LogsTable from "./Logs";
import Grid from "@mui/material/Grid";
import StatusAlert from "./StatusAlert";

const HomePage = () => {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [statusInfo, setStatusInfo] = useState({
    isCheckedOut: false,
    isReady: true,
  });

  const updateTable = () => {
    setLastUpdate(Date.now());
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Status
            setLastUpdate={updateTable}
            setStatusInfo={setStatusInfo}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatusAlert
            isCheckedOut={statusInfo.isCheckedOut}
            isReady={statusInfo.isReady}
          />
          <Statistics lastUpdated={lastUpdate} />
        </Grid>
      </Grid>
      <LogsTable lastUpdate={lastUpdate} />
    </div>
  );
};

export default HomePage;

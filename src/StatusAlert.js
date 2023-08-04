import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Alert } from "@mui/material";

const StatusAlert = ({ isCheckedOut, isReady }) => {
  const [status, setStatus] = useState(isReady ? "Ready" : "Checked In");
  
  useEffect(() => {
    if (isCheckedOut) {
      setStatus("Checked Out");
    } else if (!isReady) {
      setStatus("Checked In");
    }
    
    const timer = setTimeout(() => {
      setStatus("Ready");
    }, 5000); // Change back to 'Ready' after 5 seconds

    return () => clearTimeout(timer); // Clear the timer if the component is unmounted before the timeout
  }, [isCheckedOut, isReady]);

  const backgroundColor = isCheckedOut
    ? "#ffff00"
    : status === "Ready"
    ? "#0000ff"
    : "#00cc00";

  const textColor = isCheckedOut ? "#000000" : "#ffffff";

  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Alert
        variant="filled"
        severity={isCheckedOut ? "warning" : status === "Ready" ? "info" : "success"}
        sx={{
          backgroundColor: backgroundColor,
          color: textColor,
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {status}
      </Alert>
    </Box>
  );
};

export default StatusAlert;

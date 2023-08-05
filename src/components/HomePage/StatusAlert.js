import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Alert } from "@mui/material";

const StatusAlert = ({ isCheckedOut, isReady, notFound, lastCheckEvent }) => {
  const [status, setStatus] = useState(notFound ? "Not Found" : isReady ? "Ready" : "Checked In");

  useEffect(() => {
    if (isCheckedOut) {
      setStatus("Checked Out");
    } else if (notFound) {
      setStatus("Not Found");
      const timer = setTimeout(() => {
        setStatus("Ready");
      }, 5000);
      return () => clearTimeout(timer);
    } else if (!isReady) {
      setStatus("Checked In");
    }

    const timer = setTimeout(() => {
      setStatus("Ready");
    }, 5000);

    return () => clearTimeout(timer);
  }, [isCheckedOut, isReady, notFound, lastCheckEvent]);

  const backgroundColor = status === "Checked Out"
    ? "#ffff00"
    : status === "Not Found"
    ? "#ff0000"
    : status === "Ready"
    ? "#0000ff"
    : "#00cc00";

  const textColor = status === "Checked Out" ? "#000000" : "#ffffff";

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
        severity={status === "Checked Out" ? "warning" : status === "Not Found" ? "error" : status === "Ready" ? "info" : "success"}
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

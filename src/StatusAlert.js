import React from "react";
import { Box } from "@mui/system";
import { Alert } from "@mui/material";

const StatusAlert = ({ isCheckedOut, isReady }) => {
  const statusMessage = isCheckedOut
    ? "Checked Out"
    : isReady
    ? "Ready"
    : "Checked In";

  const backgroundColor = isCheckedOut
    ? "#ffff00"
    : isReady
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
        severity={isCheckedOut ? "warning" : isReady ? "info" : "success"}
        sx={{
          backgroundColor: backgroundColor,
          color: textColor,
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {statusMessage}
      </Alert>
    </Box>
  );
};

export default StatusAlert;

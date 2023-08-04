import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import "./Status.css";

const theme = createTheme({
  typography: {
    fontFamily: "Arial",
  },
});

const Status = ({ setLastUpdate, setStatusInfo }) => {
  const [student, setStudent] = useState({
    rollNo: "",
    name: "",
    checkInTime: "",
    checkoutTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [realTimeInput, setRealTimeInput] = useState("");

  const handleKeyPress = useCallback(
    async (event) => {
      if (loading) {
        return;
      }

      let input = realTimeInput + event.key;
      setRealTimeInput(input);

      if (input.length === 9) {
        setLoading(true);

        const response = await fetch(`http://localhost:8000/student/${input}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Update the student data
          setStudent({
            rollNo: data.rollNo,
            name: data.name,
            checkInTime: data.checkInTime,
            checkoutTime: data.checkoutTime,
          });

          // Update status information
          setStatusInfo({
            isCheckedOut: !!data.checkoutTime,
            isReady: !data.rollNo && !data.name && !data.checkInTime && !data.checkoutTime,
          });

          // Update lastUpdate to trigger a refresh in the StudentTable
          setLastUpdate(Date.now());
        }

        setLoading(false);
        input = "";
        setRealTimeInput("");
      }
    },
    [realTimeInput, loading, setLastUpdate, setStatusInfo]
  );

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ maxWidth: "90%", margin: "auto", marginTop: 2, marginBottom: 2, marginLeft: 10 }}
      >
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className={loading ? "blur-effect" : ""}
          >
            <TableHead style={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h6">
                    Please scan your ID card :
                    <span style={{ color: "#000000", marginLeft: "10px" }}>
                      {realTimeInput}
                    </span>
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>{student.rollNo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{student.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Check In Time</TableCell>
                <TableCell>{student.checkInTime}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Check Out Time</TableCell>
                <TableCell>{student.checkoutTime}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
};

Status.propTypes = {
  setLastUpdate: PropTypes.func.isRequired,
  setStatusInfo: PropTypes.func.isRequired,
};

export default Status;

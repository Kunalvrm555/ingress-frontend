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
import Register from './Register';

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
  const [showRegisterModal, setShowRegisterModal] = useState(false);


  const handleKeyPress = useCallback(
    async (event) => {
      if (showRegisterModal || event.target !== document.body) return;
      // Convert input to uppercase
      let char = event.key.toUpperCase();

      // Check if the pressed key is Enter
      if (char === 'Enter') {
        event.preventDefault(); // Prevent the default action
        return; // Stop further processing
      }

      if (loading) {
        return;
      }

      let input = realTimeInput + char;
      setRealTimeInput(input);

      if (input.length === 9) {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/student/${input}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          handleFetchSuccess(data);

        } else if (response.status === 404) {
          handleNotFound();
        }

        setLoading(false);
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

  const handleNotFound = () => {
    setStatusInfo({
      isCheckedOut: false,
      isReady: false,
      notFound: true,
    });
    setShowRegisterModal(true);
  };
  const handleFetchSuccess = (data) => {
    setStudent({
      rollNo: data.rollNo,
      name: data.name,
      checkInTime: data.checkInTime,
      checkoutTime: data.checkoutTime,
    });
    setStatusInfo({
      isCheckedOut: !!data.checkoutTime,
      isReady: !data.rollNo && !data.name && !data.checkInTime && !data.checkoutTime,
      notFound: false,
    });
    setLastUpdate(Date.now());
    setRealTimeInput('');
  };
  const handleCloseModal = () => {
    setShowRegisterModal(false);
    // Reload the page to reset the status
    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: "90%",
          margin: "auto",
          marginTop: 2,
          marginBottom: 2,
          marginLeft: 10,
        }}
      >
        <TableContainer
          component={Paper}
          style={{ margin: "10px", border: "1px solid #ddd" }}
        >
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className={loading ? "blur-effect" : ""}
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: "#f5f5f5" }} colSpan={2}>
                  <Typography variant="h6">
                    Please scan your ID card:
                    {realTimeInput && (
                      <span style={{ color: "#000000", marginLeft: "10px" }}>
                        {realTimeInput}
                      </span>
                    )}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {student.rollNo}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {student.name}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Check In Time</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {student.checkInTime}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Check Out Time</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {student.checkoutTime}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {showRegisterModal && (
        <Register
          open={showRegisterModal}
          handleClose={handleCloseModal}
          prepopulatedRollNo={realTimeInput}
        />
      )}
    </ThemeProvider>
  );
};

Status.propTypes = {
  setLastUpdate: PropTypes.func.isRequired,
  setStatusInfo: PropTypes.func.isRequired,
};

export default Status;

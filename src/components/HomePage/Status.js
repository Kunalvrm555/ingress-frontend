import React, { useState, useEffect, useCallback, useContext } from "react";
import UserContext from "../Shared/UserContext";
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

const theme = createTheme({
  typography: {
    fontFamily: "Arial",
  },
});

const Status = ({ setLastUpdate, setStatusInfo }) => {
  const { token } = useContext(UserContext);
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
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/student/${input}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          setStudent({
            rollNo: data.rollNo,
            name: data.name,
            checkInTime: data.checkInTime,
            checkoutTime: data.checkoutTime,
          });

          setStatusInfo({
            isCheckedOut: !!data.checkoutTime,
            isReady:
              !data.rollNo &&
              !data.name &&
              !data.checkInTime &&
              !data.checkoutTime,
            notFound: false,
          });

          setLastUpdate(Date.now());
        } else if (response.status === 404) {
          setStatusInfo({
            isCheckedOut: false,
            isReady: false,
            notFound: true,
          });
        }

        setLoading(false);
        input = "";
        setRealTimeInput("");
      }
    },
    [realTimeInput, loading, setLastUpdate, setStatusInfo, token]
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
    </ThemeProvider>
  );
};

Status.propTypes = {
  setLastUpdate: PropTypes.func.isRequired,
  setStatusInfo: PropTypes.func.isRequired,
};

export default Status;

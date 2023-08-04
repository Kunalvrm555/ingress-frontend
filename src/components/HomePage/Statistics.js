import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Arial",
  },
});
const Statistics = ({ lastUpdated }) => {
  const [statistics, setStatistics] = useState({
    checkedInCount: 0,
    checkedInTodayCount: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8000/statistics") // replace with your API endpoint
      .then((res) => res.json())
      .then((data) => setStatistics(data));
  }, [lastUpdated]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: "80%",  marginTop: 2, marginBottom: 2, marginLeft: 8 }}
      >
        <TableContainer component={Paper} style={{ margin: "10px" }}>
          <Table>
            <TableHead style={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Statistics</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1" color="textSecondary">
                    Checked-In
                  </Typography>
                </TableCell>
                <TableCell>{statistics.checkedInCount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1" color="textSecondary">
                    Total Today
                  </Typography>
                </TableCell>
                <TableCell>{statistics.checkedInTodayCount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
};

export default Statistics;

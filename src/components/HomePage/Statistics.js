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
      <Box
        sx={{ maxWidth: "80%", marginTop: 2, marginBottom: 2, marginLeft: 8 }}
      >
        <TableContainer
          component={Paper}
          style={{ margin: "10px", border: "1px solid #ddd" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: "#f5f5f5" }}>
                  Statistics
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ backgroundColor: "#f5f5f5" }}
                >
                  <Typography variant="subtitle1">Checked-In</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {statistics.checkedInCount}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ backgroundColor: "#f5f5f5" }}
                >
                  <Typography variant="subtitle1">Total Today</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {statistics.checkedInTodayCount}
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

export default Statistics;

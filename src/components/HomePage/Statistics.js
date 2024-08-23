import React, { useState, useEffect, useContext } from "react";
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
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/statistics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
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
                <TableCell style={{ backgroundColor: "#f5f5f5" }} colSpan={2}>
                  <Typography variant="h6" align="center">
                    Statistics
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">Checked-In</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {statistics ? statistics.checkedInCount : ""}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">Total Today</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {statistics ? statistics.checkedInTodayCount : ""}
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

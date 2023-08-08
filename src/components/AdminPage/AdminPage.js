import React, { useState, useContext } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UserContext from "../Shared/UserContext";
const AdminPage = () => {
  const { token } = useContext(UserContext);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiMessage, setApiMessage] = useState("");

  const fixedHeaders = ["STUDENT TYPE", "ROLL NO", "DEPARTMENT CODE", "NAME"];

  const fileHandler = (event) => {
    setIsLoading(true);
    let fileObj = event.target.files[0];

    if (fileObj) {
      ExcelRenderer(fileObj, (err, resp) => {
        if (err) {
          console.error(err);
          setIsLoading(false);
          setError("Error reading the Excel file.");
        } else {
          if (resp.cols.length !== 4) {
            setError("Uploaded Excel file must have exactly 4 columns.");
            setIsLoading(false);
            return;
          }
          setError(null); // reset any prior error

          // Filter out rows that are entirely empty
          const nonEmptyRows = resp.rows.filter((row) =>
            row.some((cell) => cell != null && cell.toString().trim() !== "")
          );

          setRows(nonEmptyRows);
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
  };
  const MessageBar = ({ message, severity }) => (
    <Box mt={2} mb={2}>
      {severity === "error" ? (
        <Alert severity="error">{message}</Alert>
      ) : (
        <Typography variant="body2" align="center">
          {message}
        </Typography>
      )}
    </Box>
  );
  const prepareDataForAPI = () => {
    return rows.map((row) => ({
      type: row[0],
      rollno: row[1],
      dept: row[2],
      name: row[3],
    }));
  };

  const handleUploadData = async () => {
    const data = prepareDataForAPI();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/student/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      setApiMessage(result.message || "Successful data upload!");
    } catch (error) {
      console.error("Error sending data:", error);
      setApiMessage("Failed to upload data.");
    }
  };
  return (
    <Box p={3} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom align="center">
        Admin Page
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Upload Excel File
          <input
            type="file"
            hidden
            onChange={fileHandler}
            accept=".xlsx,.xls"
          />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUploadData}
          disabled={rows.length === 0}
        >
          Upload Data
        </Button>
      </Stack>

      {apiMessage && <MessageBar message={apiMessage} />}
      {error && <MessageBar message={error} severity="error" />}

      <Typography
        variant="h6"
        gutterBottom
        align="center"
        style={{ marginTop: "10px" }}
      >
        Number of students: {rows.length}
      </Typography>
      <Box
        sx={{ maxWidth: "95%", marginTop: 2, marginBottom: 2, width: "100%" }}
      >
        <TableContainer
          component={Paper}
          style={{
            maxHeight: "calc(70vh)",
            width: "100%",
            overflow: "auto",
            margin: "10px auto",
            border: "1px solid #ddd",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                {fixedHeaders.map((header, index) => (
                  <TableCell key={index} align="center">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={fixedHeaders.length} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((rowData, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {rowData.map((cellValue, colIndex) => (
                      <TableCell key={colIndex} align="center">
                        {cellValue}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminPage;

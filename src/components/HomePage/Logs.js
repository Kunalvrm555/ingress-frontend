import React, { useEffect, useState, useContext } from "react";
import UserContext from "../Shared/UserContext";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";

const columns = [
  { width: "2%", label: "S.No", dataKey: "sno" },
  { width: "10%", label: "Roll No", dataKey: "rollno" },
  { width: "30%", label: "Name", dataKey: "name" },
  { width: "5%", label: "Type", dataKey: "type" },
  { width: "5%", label: "Department", dataKey: "department" },
  { width: "20%", label: "Check In Time", dataKey: "checkInTime" },
];

const LogsTable = ({ lastUpdate }) => {
  const { token } = useContext(UserContext);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        
        const res = await fetch(`${process.env.REACT_APP_API_URL}/logs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (!res.ok) {
          throw new Error("An error occurred while fetching the logs.");
        }
        const data = await res.json();
        setStudents(data);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [lastUpdate, token]);

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableRow: (props) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const fixedHeaderContent = () => (
    <TableRow style={{ backgroundColor: "#f5f5f5" }}>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.dataKey === "name" ? "left" : "center"}
          style={{ width: column.width }}
          sx={{ border: "1px solid #ddd" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const rowContent = (index) => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          </TableCell>
        </TableRow>
      );
    }

    if (!isLoading && (!students || students.length === 0)) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <Typography variant="body1">No students data available.</Typography>
          </TableCell>
        </TableRow>
      );
    }

    const student = students[index];

    return (
      <React.Fragment>
        <TableCell align="center" sx={{ border: "1px solid #ddd" }}>
          {index + 1}
        </TableCell>
        {columns.slice(1).map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.dataKey === "name" ? "left" : "center"}
            sx={{ border: "1px solid #ddd" }}
          >
            {student[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  };

  return (
    <Box
      sx={{ maxWidth: "95%", margin: "auto", marginTop: 2, marginBottom: 2 }}
    >
      <TableContainer
        component={Paper}
        style={{ margin: "10px", border: "1px solid #ddd" }}
      >
        <Paper
          style={{
            height: "calc(100vh - 420px)",
            width: "100%",
            overflow: "auto",
          }}
        >
          <TableVirtuoso
            components={VirtuosoTableComponents}
            data={students} 
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent} 
          />
        </Paper>
      </TableContainer>
    </Box>
  );
};

LogsTable.propTypes = {
  lastUpdate: PropTypes.number.isRequired,
};

export default LogsTable;

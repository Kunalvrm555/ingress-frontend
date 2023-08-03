import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box } from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';
import studentsData from './students.json'; // Import students data from local JSON file

const columns = [
  {
    width: '1%',
    label: 'S.No',
    dataKey: 'sno',
  },
  {
    width: '5%',
    label: 'Roll No',
    dataKey: 'rollno',
  },
  {
    width: '30%',
    label: 'Name',
    dataKey: 'name',
  },
  {
    width: '2%',
    label: 'Type',
    dataKey: 'type',
  },
  {
    width: '2%',
    label: 'Department',
    dataKey: 'department',
  },
  {
    width: '10%',
    label: 'Check In Time',
    dataKey: 'checkInTime',
  },
];

const StudentTable = () => {
  const [students, setStudents] = useState(studentsData); // use local data for development

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableRow: (props) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const fixedHeaderContent = () => (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.dataKey === 'name' ? 'left' : 'center'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd'
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const rowContent = (index, student) => (
    <React.Fragment>
      <TableCell
        sx={{border: '1px solid #ddd'}}
      >
        {index + 1}
      </TableCell>
      {columns.slice(1).map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.dataKey === 'name' ? 'left' : 'center'}
          sx={{border: '1px solid #ddd'}}
        >
          {student[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );

  return (
    <Box sx={{ maxWidth: '98%', margin: 'auto', marginTop: 2, marginBottom: 2}}>
      <Paper style={{ height: 400, width: '100%' }}>
        <TableVirtuoso
          data={students}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </Box>
  );
};

export default StudentTable;
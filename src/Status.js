import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Typography } from '@mui/material';
import './Status.css';

const Status = () => {
    const [student, setStudent] = useState({
        rollNo: '',
        name: '',
        checkInTime: '',
        checkoutTime: '',
    });
    const [loading, setLoading] = useState(false);
    const [realTimeInput, setRealTimeInput] = useState('');

    const handleKeyPress = useCallback(async (event) => {
        if (loading) {
            return;
        }

        let input = realTimeInput + event.key;
        setRealTimeInput(input);

        if (input.length === 9) {
            setLoading(true);

            const response = await fetch(`http://localhost:8000/student/${input}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
            }

            setLoading(false);
            input = '';
            setRealTimeInput('');
        }
    }, [realTimeInput, loading]);

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <Box sx={{ maxWidth: '40%', margin: 'auto', marginTop: 2, marginBottom: 2 }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" className={loading ? 'blur-effect' : ''}>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6">Please scan your ID card</Typography>
                            </TableCell>
                            <TableCell>{realTimeInput}</TableCell>
                        </TableRow>
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
    );
};

export default Status;

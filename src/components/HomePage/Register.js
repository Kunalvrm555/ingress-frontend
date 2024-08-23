import React, { useState, useEffect } from 'react';
import {
    IconButton, Modal,
    Box, TextField, Button,
    Typography, MenuItem, FormControl,
    InputLabel, Select
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};

const studentTypes = ['UG', 'PG', 'RS'];

const Register = ({ open, handleClose, prepopulatedRollNo }) => {
    const [student, setStudent] = useState({
        rollno: prepopulatedRollNo || '',
        name: '',
        type: '',
        dept: ''
    });
    const [registrationStatus, setRegistrationStatus] = useState('');

    // Update the roll number and department when prepopulatedRollNo changes
    useEffect(() => {
        if (prepopulatedRollNo) {
            const dept = prepopulatedRollNo.substring(2, 4);
            setStudent(prev => ({
                ...prev,
                rollno: prepopulatedRollNo,
                dept: dept
            }));
        }
    }, [prepopulatedRollNo]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudent(prev => ({ ...prev, [name]: value }));
        if (name === 'rollno') {
            // Automatically deduce department based on roll number
            const dept = value.substring(2, 4);
            setStudent(prev => ({ ...prev, dept }));
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student)
        });
        const result = await response.json();
        if (response.ok) {
            setRegistrationStatus('success');
            setTimeout(() => {
                handleClose();
            }, 2000);
        } else {
            setRegistrationStatus('failure');
            setTimeout(() => {
                handleClose();
            }, 2000);
        }
    };

    const buttonProps = {
        success: { color: 'success', text: 'Registration Successful' },
        failure: { color: 'error', text: 'Registration Failed' },
        default: { color: 'primary', text: 'Register' }
    }[registrationStatus || 'default'];

    return (
        <Modal
            open={open}
            onClose={() => {
                if (registrationStatus === 'success' || registrationStatus === '') {
                    handleClose();
                }
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleRegister}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Register New Student
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Roll No"
                    name="rollno"
                    value={student.rollno}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Type</InputLabel>
                    <Select
                        label="Type"
                        name="type"
                        value={student.type}
                        onChange={handleChange}
                    >
                        {studentTypes.map((type, index) => (
                            <MenuItem key={index} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Department"
                    name="dept"
                    value={student.dept}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color={buttonProps.color}
                    sx={{
                        mt: 3,
                        mb: 2,
                        borderRadius: 4
                    }}
                >
                    {buttonProps.text}
                </Button>
            </Box>
        </Modal>
    );
};

export default Register;
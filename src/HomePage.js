import React, { useState } from 'react';
import Statistics from './Statistics';
import Status from './Status';
import StudentTable from './Table';
import Grid from '@mui/material/Grid';

const HomePage = () => {
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const updateTable = () => {
        setLastUpdate(Date.now());
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Status setLastUpdate={updateTable} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Statistics lastUpdated={lastUpdate} />
                </Grid>
            </Grid>
            <StudentTable lastUpdate={lastUpdate} />
        </div>
    );
};

export default HomePage;

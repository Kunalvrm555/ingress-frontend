import React, { useState } from 'react';
import Statistics from './Statistics';
import Status from './Status';
import Table from './Table';

const HomePage = () => {
    const [checkedInCount, setCheckedInCount] = useState(0);

    return (
        <div>
            <Statistics checkedInCount={checkedInCount} />
            <Status/>
            <Table/>
        </div>
    );
};

export default HomePage;

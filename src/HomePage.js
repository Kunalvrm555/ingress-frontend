import React, { useState, useEffect } from 'react';
import Statistics from './Statistics';
import Status from './Status';
import StudentTable from './Table'; 

const HomePage = () => {
    const [checkedInCount, setCheckedInCount] = useState(0);
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    return (
        <div>
            <Statistics checkedInCount={checkedInCount} />
            <Status setLastUpdate={setLastUpdate} />
            <StudentTable lastUpdate={lastUpdate} />
        </div>
    );
};


export default HomePage;

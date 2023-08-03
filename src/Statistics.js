import React from 'react';

const Statistics = ({ checkedInCount }) => {
    return (
        <div>
            <h2>Currently Checked-In Students: {checkedInCount}</h2>
        </div>
    );
};

export default Statistics;

import React from 'react';
import styled from 'styled-components';
import DataTableUser from '../components/DataTableUser';

const Info = styled.div`
    display: flex;
    justify-content: center;
`;
const UsersDash = () => {
    return (
        <div>
            <Info>
                <h1>Users Dashboard</h1>
            </Info>

            <DataTableUser />
        </div>
    );
};

export default UsersDash;
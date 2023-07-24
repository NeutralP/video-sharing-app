import React from 'react';
import styled from 'styled-components';
import Widget from '../components/Widget';
import PieChartW from '../components/PieChartW';
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    /* flex-direction: column; */
    gap: 20px;
`;

const CenteredContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Dashboard = () => {
    return (
        <>
            <Container>
                <Widget type="users" />
                <Widget type="videos" />
                <Widget type="views" />
            </Container>
            <CenteredContainer>
                <PieChartW />
            </CenteredContainer>
        </>
    );
};

export default Dashboard;
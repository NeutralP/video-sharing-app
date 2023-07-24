import React, { useState } from 'react';
import styled from 'styled-components';
import DataTable from '../components/DataTable';
import Upload from '../components/Upload';
const Info = styled.div`
    display: flex;
    justify-content: center;
`;

const VideosDash = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Info>
                <h1>Video Dashboard</h1>
            </Info>
            <button onClick={handleOpenModal}>Add New Video</button>
            <DataTable />
            {isModalOpen && <Upload setOpen={handleCloseModal} />}
        </div>
    );
};

export default VideosDash;
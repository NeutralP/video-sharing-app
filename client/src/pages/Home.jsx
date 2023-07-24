import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    row-gap: 20px;
    column-gap: 10px;
`;

const Home = ({ type }) => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`/videos/${type}`);
                setVideos(res.data);
                console.log(res);
            } catch (err) {
                console.error(err.response.status);
                console.error(err.response.data);
            }
        };

        fetchVideos();
    }, [type]);
    return (
        <Container>
            {videos.map((video) => (
                <Card key={video._id} video={video} />
            ))}
        </Container>
    );
};

export default Home;
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import ReviewsIcon from '@mui/icons-material/Reviews';
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex: 1;
    padding: 10px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
 `;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    
`;

const Title = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: gray;
`;

const Counter = styled.span`
    font-size: 28px;
    font-weight: 300;
`;
const Link = styled.span`
    font-size: 12px;
    border-bottom: 1px solid gray;
`;

const Widget = ({ type }) => {
    //fetch data from mongodb
    const [users, setUsers] = useState();
    let data;
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("/users/");
                setUsers(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsers(); // Call the fetchUsers function here

    }, []);

    const [videos, setVideos] = useState();
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get("/videos/search?q=");
                setVideos(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchVideos();

    }, []);

    const [views, setViews] = useState();


    switch (type) {
        case "users":
            data = {
                title: "USERS",
                counter: users?.length,
                link: "See all users",
                icon: <AccountCircleIcon style={{ fontSize: 80 }} />
            };
            break;
        case "videos":
            data = {
                title: "VIDEOS",
                counter: videos?.length,
                link: "See lists of videos",
                icon: <VideoLibraryOutlinedIcon style={{ fontSize: 80 }} />
            };
            break;
        case "views":
            data = {
                title: "VIEWS",
                counter: users?.length,
                link: "",
                icon: <ReviewsIcon style={{ fontSize: 80 }} />
            };
            break;
        default:
            break;
    }


    return (
        <Container>
            <div>
                <Left>
                    <Title>{data.title}</Title>
                    <Counter>{data.counter}</Counter>
                    <Link>{data.link}</Link>
                </Left>
            </div>
            {data.icon}
        </Container>
    );
};

export default Widget;;
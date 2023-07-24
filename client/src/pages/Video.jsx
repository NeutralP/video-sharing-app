import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import channelImgPlaceholder from "../img/channel-profile-placeholder.jpg";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { subscription } from '../redux/userSlice';


const Container = styled.div`
    display: flex;
    gap: 24px;
`;

const Content = styled.div`
    flex: 5;
`;

const VideoWrapper = styled.div`
    
`;

const Title = styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Info = styled.span`

`;
const Buttons = styled.div`
    display: flex;
    gap: 20px;
`;
const Button = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
`;

const Hr = styled.hr`
    border: 0.5px solid #D2E9E9;
`;

const Recommendation = styled.div`
    flex: 2;
`;

const Channel = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ChannelInfo = styled.div`
    display: flex; 
    gap: 20px;
`;
const Subscribe = styled.button`
    background-color: #cc1a00;
    font-weight: 500;
    color: white;
    border: none;
    line-height: 36px;
    height: 36px;
    padding: 0 16px;
    border-radius: 18px;
        border-top-left-radius: 18px;
        border-top-right-radius: 18px;
        border-bottom-right-radius: 18px;
        border-bottom-left-radius: 18px;
    cursor: pointer;
`;
const VideoFrame = styled.video`
    max-height: 720px;
    width: 100%;
    object-fit: cover;
`;
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;
const ChannelDetail = styled.div`
    display: flex;
    flex-direction: column;
`;
const ChannelName = styled.span`
    font-weight: 500;
`;
const ChannelCounter = styled.span`
    margin-top: 5px;
    margin-bottom: 20px;
    font-size: 12px;
`;
const Description = styled.p`
    font-size: 14px;
`;


const Video = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { currentVideo } = useSelector((state) => state.video);
    const dispatch = useDispatch();
    const [hasViewed, setHasViewed] = useState(false);

    const path = useLocation().pathname.split("/")[2];
    console.log(path);

    const [channel, setChannel] = useState({});

    // Sandbox
    // const fetchData = async () => {
    //     try {
    //         const videoRes = await axios.get(`/videos/find/${path}`);
    //         console.log(videoRes);
    //         const channelRes = await axios.get(
    //             `/users/find/${videoRes.data.userId}`
    //         );
    //         setChannel(channelRes.data);
    //         dispatch(fetchSuccess(videoRes.data));
    //     } catch (err) { }
    // };
    // fetchData();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(`/videos/find/${path}`);
                console.log(videoRes);
                const channelRes = await axios.get(
                    `/users/find/${videoRes.data.userId}`
                );
                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data));
            } catch (err) { }
        };
        fetchData();
    }, [path, dispatch]);

    useEffect(() => {
        const addView = async () => {
            // Only increment the view count if the video has not been viewed before
            if (!hasViewed) {
                try {
                    await axios.put(`/videos/view/${currentVideo._id}`);
                    setHasViewed(true);
                } catch (err) { }
            }
        };
        addView();
    }, [currentVideo._id, hasViewed]);
    // const handleLike = async () => {
    //     await axios.put(`/videos/${currentVideo._id}`);
    //     dispatch(like(currentUser._id));
    // };

    // const handleDislike = async () => {
    //     await axios.put(`/videos/${currentVideo._id}`);
    //     dispatch(dislike(currentUser._id));
    // };

    const handleLike = async () => {
        await axios.put(`/users/like/${currentVideo._id}`);
        dispatch(like(currentUser._id));
    };
    const handleDislike = async () => {
        await axios.put(`/users/dislike/${currentVideo._id}`);
        dispatch(dislike(currentUser._id));
    };
    const handleSubscribe = async () => {
        currentUser.subscribedUsers.includes(channel._id) ?
            await axios.put(`/users/unsub/${channel._id}`) :
            await axios.put(`/users/sub/${channel._id}`);
        dispatch(subscription(currentUser._id));
    };

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    {currentVideo.source === "vimeo" ? (
                        <iframe
                            src={`https://player.vimeo.com/video/${currentVideo.videoUrl}`}
                            width="640"
                            height="360"
                            frameborder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    ) : currentVideo.source === "youtube" ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${currentVideo.videoUrl}`}
                            width="640"
                            height="360"
                            frameborder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    ) : (
                        <video src={currentVideo.videoUrl} controls />
                    )}
                </VideoWrapper>
                <Title>
                    {currentVideo.title}
                </Title>
                <Details>
                    <Info>
                        {currentVideo.viewCount} views {format(currentVideo.createdAt)}
                    </Info>
                    <Buttons>
                        <Button onClick={handleLike}>
                            {currentVideo.likes?.includes(currentUser?._id) ?
                                (<ThumbUpIcon />) : (<ThumbUpOutlinedIcon />)} {currentVideo.likes?.length}
                        </Button>
                        <Button onClick={handleDislike}>
                            {currentVideo.dislikes?.includes(currentUser?._id) ?
                                (<ThumbDownIcon />) : (<ThumbDownOffAltOutlinedIcon />)} Dislike
                        </Button>
                        <Button>
                            <ReplyOutlinedIcon /> Share
                        </Button>
                        <Button>
                            <AddTaskOutlinedIcon /> Save
                        </Button>
                    </Buttons>
                </Details>
                <Hr />
                <Channel>
                    <ChannelInfo>
                        <Image src={channel.img} />
                        <ChannelDetail>
                            <ChannelName>{channel.username}</ChannelName>
                            <ChannelCounter>{channel.subscriberCount} subscribers</ChannelCounter>
                            <Description>
                                {currentVideo.desc}
                            </Description>
                        </ChannelDetail>
                    </ChannelInfo>
                    <Subscribe onClick={handleSubscribe}>
                        {currentUser?.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
                    </Subscribe>
                </Channel>
                <Hr />
                <Comments videoId={currentVideo._id} />
            </Content>
            {/* <Recommendation>
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
            </Recommendation> */}
        </Container>
    );
};

export default Video;
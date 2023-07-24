import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import channelImgPlaceholder from "../img/channel-profile-placeholder.jpg";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'timeago.js';

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0px;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Name = styled.span``;
const Date = styled.span``;
const Text = styled.span``;

const Comment = ({ comment }) => {
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchComment = async () => {
            const res = await axios.get(`/users/find/${comment.userId}`);
            setChannel(res.data);
            console.log(res.data);
        };
        fetchComment();
    }, [comment.userId]);




    return (
        <Container>
            <Avatar src={channel.img} />
            <Details>
                <Name>
                    {channel.username} <Date>{format(comment.createdAt)}</Date>
                </Name>
                <Text>
                    {comment.desc}
                </Text>
            </Details>
        </Container>
    );
};

export default Comment;
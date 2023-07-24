import React from 'react';
import styled from 'styled-components';
import logoImg from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookIcon from '@mui/icons-material/Book';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Container = styled.div`
    flex:1;
    background-color: #202020;
    height: 100vh;
    color: white;
    font-size: 14px;
    position: sticky;
    top: 0;
`;

const Wrapper = styled.div`
    padding: 18px 26px;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px;
`;

const Img = styled.img`
    height: 25px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 8px 0px;

    &:hover{
        background-color: #464646;
    }
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid #D2E9E9;
`;

const Login = styled.div``;
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #D2E9E9;
    color: #D2E9E9;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px; 
`;
const Title = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
    align-items: center;
    display: flex; /* Add flex display */
    justify-content: center; /* Center horizontally */
    padding: 10px 0; /* Add padding for spacing */
`;

const Menu = () => {

    const { currentUser } = useSelector((state) => state.user);

    return (
        <Container>
            <Wrapper>
                <Link to="/" style={{ textDecoration: "none", color: 'inherit' }}>
                    <Logo>
                        <Img src={logoImg} />
                        Web Vod Application
                    </Logo>
                </Link>
                <Hr />
                <Link to="/" style={{ textDecoration: "none", color: 'inherit' }}>
                    <Item>
                        <HomeIcon />
                        Home
                    </Item>
                </Link>
                <Link to="trends" style={{ textDecoration: "none", color: 'inherit' }}>
                    <Item>
                        <ExploreOutlinedIcon />
                        Explore
                    </Item>
                </Link>
                <Link to="subscriptions" style={{ textDecoration: "none", color: 'inherit' }}>
                    <Item>
                        <SubscriptionsOutlinedIcon />
                        Subscriptions
                    </Item>
                </Link>
                <Item>
                    <BookIcon />
                    Education
                </Item>
                <Item>
                    <SportsSoccerIcon />
                    Sports
                </Item>
                <Item>
                    <HealthAndSafetyIcon />
                    Health
                </Item>

                {currentUser?.isAdmin &&
                    <>
                        <Hr />
                        <Title>Admin</Title>
                        <Link to="dashboard" style={{ textDecoration: "none", color: 'inherit' }}>
                            <Item>
                                <DashboardIcon />
                                Dashboard
                            </Item>
                        </Link>
                        <Link to="dashboarduser" style={{ textDecoration: "none", color: 'inherit' }}>
                            <Item>
                                <AccountCircleIcon />
                                Users
                            </Item>
                        </Link>
                        <Link to="dashboardvideo" style={{ textDecoration: "none", color: 'inherit' }}>
                            <Item>
                                <VideoLibraryOutlinedIcon />
                                Videos
                            </Item>
                        </Link>
                    </>
                }
                {!currentUser &&
                    <>
                        <Login>
                            Sign in to like videos, comment, and subscribe.
                            <Link to="signin" style={{ textDecoration: "none", color: 'inherit' }}>
                                <Button>
                                    <AccountCircleOutlinedIcon /> SIGN IN
                                </Button>
                            </Link>
                        </Login>
                        <Hr />
                    </>}

                <Hr />
                <Item>
                    <SettingsOutlinedIcon />
                    Settings
                </Item>
                <Item>
                    <FlagOutlinedIcon />
                    Report
                </Item>
                <Item>
                    <HelpOutlineOutlinedIcon />
                    Help
                </Item>
                <Item>
                    <SettingsBrightnessOutlinedIcon />
                </Item>
            </Wrapper>
        </Container >
    );
};

export default Menu;
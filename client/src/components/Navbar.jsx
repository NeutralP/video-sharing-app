import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import Upload from "./Upload";
import { logout } from "../redux/userSlice";
import { Box, Modal } from "@mui/material";

const Container = styled.div`
    position: sticky;
    top: 0;
    height: 56px;
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100px;
    padding: 0px 20px;
    position: relative;
`;
const Search = styled.div`
    width: 40%;
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
`;
const Input = styled.input`
    border: none;
    background-color: transparent;
    outline: none;;
`;
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #404747;
    color: #404949;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px; 
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: #404949;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [q, setQ] = useState("");
    const { currentUser } = useSelector((state) => state.user);
    // console.log(currentUser);
    const dispatch = useDispatch();
    const handleSignout = () => {
        dispatch(logout());
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input placeholder="Search" onChange={(e) => setQ(e.target.value)} />
                        <SearchIcon onClick={() => navigate(`/search?q=${q}`)} />
                    </Search>
                    {currentUser ? (
                        <User>
                            <VideoCallOutlinedIcon onClick={() => setIsModalOpen(true)} />
                            <Avatar src={currentUser.img} />
                            {currentUser.name}
                            <Button onClick={handleSignout}>
                                SIGN OUT
                            </Button>
                        </User>
                    ) : (
                        <Link to="signin" style={{ textDecoration: "none" }}>
                            <Button>
                                <AccountCircleOutlinedIcon />
                                SIGN IN
                            </Button>
                        </Link>
                    )}
                </Wrapper>
            </Container>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Upload setOpen={handleCloseModal} />
                </Box>
            </Modal>
        </>
    );
};

export default Navbar;
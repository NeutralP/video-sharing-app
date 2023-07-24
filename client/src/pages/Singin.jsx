import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../firebase';
import { signInWithPopup } from "firebase/auth";

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: calc(100vh - 56px);
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #f2f2f2;
    border: 1px solid #cccccc;
    padding: 20px 50px;
    gap: 10px;
`;

const Title = styled.h1`
font-size: 24px;
`;

const SubTitle = styled.h2`
font-size: 20px;
font-weight: 300;
`;

const Input = styled.input`
    border: 1 px solid #cccccc;
    border-radius: 3 px;
    padding: 10px;
    background-color: transparent;
    width: 100%;
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: #cccccc;
`;

const More = styled.div`
    display: flex;
    margin-top: 10px;
    font-size: 12px;
`;

const Links = styled.div``;

const Link = styled.span`
    margin-left: 30px;
`;

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("/auth/signin", { username, password });
            dispatch(loginSuccess(res.data));
            //   navigate("/")
            console.log(res.data);
        } catch (err) {
            dispatch(loginFailure());
        }
    };

    const signInWithGoogle = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider)
            .then((result) => {
                // axios.post("/auth/google", {
                //     name: result.user.displayName,
                //     email: result.user.email,
                //     img: result.user.photoURL,
                // }).then((res) => {
                //     dispatch(loginSuccess(res.data));
                // });
                console.log(result);
                axios.post("/auth/google", {
                    username: result.user.displayName,
                    email: result.user.email,
                    img: result.user.photoURL,
                }).then((res) => {
                    dispatch(loginSuccess(res.data));
                });
            }).catch((error) => {
                loginFailure();
                console.log(error);
            });
    };

    return (
        <Container>
            <Wrapper>
                <Title>Sign in</Title>
                <SubTitle>to continue to HustVid</SubTitle>
                <Input placeholder="username" onChange={e => setUsername(e.target.value)} />
                <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                <Button onClick={handleLogin}>Sign in</Button>
                <Title>or</Title>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
                <Title>or</Title>
                <Input placeholder="username" onChange={e => setUsername(e.target.value)} />
                <Input placeholder="email" onChange={e => setEmail(e.target.value)} />
                <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                <Button>Sign up</Button>
            </Wrapper>
            <More>
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    );
};

export default SignIn;
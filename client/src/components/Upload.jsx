import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';
import app from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormControlLabel, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 900px;
  background-color: #cccccc;
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid #f5f5f5;
  color: black;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const Desc = styled.textarea`
  border: 1px solid #f5f5f5;
  color: black;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: #f5f5f5;
  color: #606060;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-size: 16px;
  color: #000;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Upload = ({ setOpen }) => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    const navigate = useNavigate();

    const extractVideoIdyt = (url) => {
        let videoId = '';

        // Regular expression to match the video ID from different YouTube URL formats
        const regex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu.be\/)([\w-]{11})/;

        const match = url.match(regex);
        if (match) {
            videoId = match[1];
        }

        return videoId;
    };

    const extractVideoIdvimeo = (url) => {
        let videoId = '';

        // Regular expression to match the video ID from Vimeo URL
        const regex =
            /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/)([\d]+)/;

        const match = url.match(regex);
        if (match) {
            videoId = match[1];
        }

        return videoId;
    };

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
        if (e.target.name === 'videoUrl' && selectedOption === 'youtube') {
            // Extract the video ID and update the 'videoUrl' input
            const videoId = extractVideoIdyt(e.target.value);
            setInputs((prev) => {
                return { ...prev, [e.target.name]: videoId };
            });
        } else if (e.target.name === 'videoUrl' && selectedOption === 'vimeo') {
            // Extract the Vimeo video ID and update the 'videoUrl' input
            const videoId = extractVideoIdvimeo(e.target.value);
            setInputs((prev) => {
                return { ...prev, [e.target.name]: videoId };
            });
        }
        setSelectedOption(e.target.value);
        console.log(inputs);
    };

    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    };

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL };
                    });
                });
            }
        );
    };

    useEffect(() => {
        video && uploadFile(video, "videoUrl");
    }, [video]);

    useEffect(() => {
        img && uploadFile(img, "imgUrl");
    }, [img]);

    const handleUpload = async (e) => {
        e.preventDefault();
        const res = await axios.post("/videos", { ...inputs, tags });
        setOpen(false);
        res.status === 200 && navigate(`/video/${res.data._id}`);
    };

    return (
        <Modal open={setOpen} onClose={() => setOpen(false)}>
            <Container>
                <Wrapper>
                    <CloseButton onClick={() => setOpen(false)}>X</CloseButton>
                    <Title>Upload a New Video</Title>
                    <FormLabel id="demo-controlled-radio-buttons-group">Source</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="source"
                        onChange={handleChange}
                    >
                        <FormControlLabel value="youtube" control={<Radio />} label="Youtube" />
                        <FormControlLabel value="vimeo" control={<Radio />} label="Vimeo" />
                        <FormControlLabel value="file" control={<Radio />} label="File Upload" />
                    </RadioGroup>
                    {selectedOption !== "file" ? (
                        <Input
                            type="text"
                            placeholder={`Enter  URL`}
                            name="videoUrl"
                            onChange={handleChange}
                        />
                    ) : (
                        <>
                            {videoPerc > 0 ? (
                                "Uploading:" + videoPerc
                            ) : (
                                <Input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setVideo(e.target.files[0])}
                                />
                            )}
                        </>
                    )}
                    <Input
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange}
                    />
                    <Desc
                        placeholder="Description"
                        name="desc"
                        rows={8}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        placeholder="Separate the tags with commas."
                        onChance={handleTags}
                    />
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="category"
                        label="category"
                        value={inputs.category || ""}
                        onChange={handleChange}
                    >
                        <MenuItem value={"Sports"}>Sports</MenuItem>
                        <MenuItem value={"Health"}>Health</MenuItem>
                        <MenuItem value={"Education"}>Education</MenuItem>
                    </Select>
                    <Label>Image:</Label>
                    {imgPerc > 0 ? (
                        "Uploading:" + imgPerc + "%"
                    ) : (
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                    )}
                    <Button onClick={handleUpload}>Upload</Button>
                </Wrapper>
            </Container>
        </Modal>
    );
};

export default Upload;

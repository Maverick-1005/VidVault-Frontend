import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoTitleCard from './VideoTitleCard';
import VideoChannelCard from './VideoChannelCard';
import VideoDescriptionCard from './VideoDescriptionCard';
import CommentsHeader from '../Comments/CommentsHeader';
import CommentCard from '../Comments/CommentCard';
import Comments from '../Comments/Comments.jsx';

function VideoPlayer({videoFile , videoId , user , currUser}) {
    // const [videoFile, setVideoFile] = useState({});
    // const [user, setUser] = useState({});
    // const [currUser , setCurrUser] = useState({});

    // const params = useParams();
    // const videoId = params.videoId;

    // const videoDetails = () => {
    //     console.log("Video Id = ", videoId);
    //     axios.get(`http://localhost:8000/api/v1/video/v/${videoId}`, {
    //         withCredentials: true
    //     })
    //     .then((res) => {
    //         setVideoFile(res.data.data);
    //         // console.log("" ,res.data.data )
    //     })
    //     .catch((err) => {
    //         console.log("error while playing video" , err);
    //     });
    // }

    // useEffect(() => {
    //     videoDetails();
    // }, []);

    // const getVideoOwner = () => {
    //     axios.get(`http://localhost:8000/api/v1/users/${videoFile.owner}`, {
    //         withCredentials: true
    //     })
    //     .then((res) => {
    //         setUser(res.data.data);
    //         console.log("owner = ", res.data.data);
    //     })
    //     .catch((err) => {
    //         console.log("err while getVideoOwner ", err);
    //     });
    // }
    // useEffect(() => {
    //     console.log("useeff ke andar");
    //     if (videoFile.owner) getVideoOwner();
    // }, [videoFile]);

    // const getCurrUser = () => {
    //     axios.get(`http://localhost:8000/api/v1/users/current-user`, {
    //         withCredentials: true
    //     })
    //     .then((res) => {
    //         setCurrUser(res.data.data);
    //     })
    //     .catch((err) => {
    //         console.log("Error while fetching user details of person who commented ", err);
    //     });
    // }
    // useEffect(() => {
    //     getCurrUser();
    // }, []);

    return (
        <div className='bg-black px-4 md:px-8'>
            <video
                className='bg-slate-300 rounded-xl min-w-max m-auto mt-5 w-full md:w-[1000px] h-auto md:h-[550px]'
                src={videoFile?.videoFile}
                alt="error"
                controls
            />
            <VideoTitleCard videoTitle={videoFile.title} />
            <VideoChannelCard channelName={user.username} channelAvatar={user.avatar} />
            <VideoDescriptionCard views={videoFile.views} description={videoFile.description} time={videoFile.createdAt} />
            <CommentsHeader userAvatar={currUser.avatar} />
            {console.log("Video Id 2 => ", videoId)}
            <Comments videoId={videoId} />
        </div>
    );
}

export default VideoPlayer;

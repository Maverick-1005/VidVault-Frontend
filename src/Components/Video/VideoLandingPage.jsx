import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Header from '../Header.jsx'
import SideBar from '../SideBar.jsx'
import VideoPlayer from './VideoPlayer.jsx'
import VideoAlley from './VideoAlley.jsx'
import Comments from '../Comments/Comments.jsx'
import { server } from '../../constant.js'
import { useSelector } from 'react-redux'

function VideoLandingPage() {

    const [videoFile, setVideoFile] = useState({});
    const [user, setUser] = useState({});


    
    const [loadingCurrUser, setLoadingCurrUser] = useState(true)
    const params = useParams();
    const videoId = params.videoId;
    const username = params.username;

    const currUser = useSelector((state) => (state.auth.userData))

    useEffect(() => {
        if (currUser) setLoadingCurrUser(false)
    }, [currUser])


    const videoDetails = async () => {
        console.log("Video Id ANdar = ", videoId);
        await axios.get(`${server}/video/details/${videoId}`, {
            withCredentials: true
        })
            .then((res) => {
                setVideoFile(res.data.data);
                console.log("", res.data.data)
            })
            .catch((err) => {
                console.log("error while playing video", err);
            });
    }

    useEffect(() => {
        console.log("Videoid ye rhi", videoId)

        videoDetails();
    }, [videoId]);

    // const getVideoOwner = () => {
    //     axios.get(`${server}/users/${videoFile.owner}`, {
    //         withCredentials: true
    //     })
    //         .then((res) => {
    //             setUser(res.data.data);
    //             console.log("owner = ", res.data.data);
    //         })
    //         .catch((err) => {
    //             console.log("err while getVideoOwner ", err);
    //         });
    // }
    // useEffect(() => {
    //     console.log("useeff ke andar");
    //     if (videoFile.owner) getVideoOwner();
    // }, [videoFile]);

    const getChannelDetails = () => {

        axios.get(`${server}/users/c/${username}`, {
            withCredentials: true
        })
        .then((res) => {
            setUser(res.data.data)
            console.log("channel is " , res.data.data)
        })
        .catch((err) => {
            console.log("err while getting channel " , err)
        })
    }
    useEffect(() => {
        console.log(" ue ke andar")
        if(username) getChannelDetails()
    } , [videoFile])

    if (loadingCurrUser) {
        return <div>Loading...</div>; 
    }
    else
        return (
            <>
                <Header />
                <div>
                    <div className='grid grid-cols-1 lg:grid-cols-[auto,minmax(0,1fr),auto] gap-0'>
                        <SideBar myprop={true} />
                        < VideoPlayer videoId={videoId} video={videoFile} user={user} currUser={currUser} />
                        <VideoAlley videoOwner={videoFile.owner} user={user} videoId={videoId} />
                    </div>
                    <Comments currUser={currUser} />

                </div>

            </>
        )
}

export default VideoLandingPage
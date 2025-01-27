import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoTitleCard from './VideoTitleCard';
import VideoChannelCard from './VideoChannelCard';
import VideoDescriptionCard from './VideoDescriptionCard';
import CommentsHeader from '../Comments/CommentsHeader';
import CommentCard from '../Comments/CommentCard';
import Comments from '../Comments/Comments.jsx';

function VideoPlayer({ video, videoId, user, currUser }) {

    console.log("video in VP " , video)
    return (
        
        <div className=' px-4 md:px-8'>
            <div className=' max-w-6xl'>
                <video
                    className=' rounded-3xl m-auto mt-5 w-full h-auto md:h-[550px]'
                    style={{ maxWidth: '100%', objectFit: 'contain' }}
                    src={video?.videoFile}
                    alt="error"
                    controls
                />
            </div>

            <VideoTitleCard videoTitle={video?.title} />
            <VideoChannelCard channelName={user.username} channel={user} channelAvatar={user.avatar} video={video} />
            <VideoDescriptionCard views={video.views} description={video.description} time={video.createdAt} />
            {/* <CommentsHeader userAvatar={currUser.avatar} /> */}
            {console.log("Video Id 2 => ", videoId)}

        </div>
    );
}

export default VideoPlayer;

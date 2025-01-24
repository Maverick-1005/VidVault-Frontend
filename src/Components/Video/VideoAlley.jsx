import React, { useEffect, useState } from 'react';
import VideoCard2 from './VideoCard2';
import axios from 'axios';
import { server } from '../../constant.js';

function VideoAlley({videoOwner , user , videoId = {videoId}}) {

  const [videos, setVideos] = useState([])  
  console.log("videoOwner = " , videoOwner)
  const fetchOwnersVideos = () => {
      axios.get(`${server}/video/allVideos` , {
        params: {
          page: 1,
          limit: 8,
          owner: videoOwner,
          videoId: videoId
        }
      } )
      .then((res) => {
         setVideos(res.data.data)
         console.log("Alley Videos fetched " )
         
      })
      .catch((err) => {
        console.log("error while fecthing videos in alley" , err)
      })
  }
  useEffect(() => {
    fetchOwnersVideos()
  }, [videoOwner , videoId])
  
  return (
    <div className=' w-full lg:max-w-96 p-4 rounded-md'>
     
     {
      videos.map((item) => {
        return (
          <div className="gap-4 w-full p-0 mb-3">
            <div className=''>
            <VideoCard2
            video = {item}
            user={user}
          />
            </div>
          
        </div>
        )
       
      })
     }     

    </div>
  );
}

export default VideoAlley;

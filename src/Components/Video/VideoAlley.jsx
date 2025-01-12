import React, { useEffect, useState } from 'react';
import VideoCard2 from './VideoCard2';
import axios from 'axios';

function VideoAlley({videoOwner , username}) {

  const [videos, setVideos] = useState([])  
  console.log("videoOwner = " , videoOwner)
  const fetchOwnersVideos = () => {
      axios.get('http://localhost:8000/api/v1/video/allVideos' , {
        params: {
          page: 1,
          limit: 8,
          owner: videoOwner,
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
  }, [videoOwner])
  
  return (
    <div className=' w-full  p-4 rounded-md'>
      {/* <h2 className='text-white text-lg font-semibold'>Video Alley</h2> */}
     
     {
      videos.map((item) => {
        return (
          <div className="gap-4 w-full p-0 mb-3">
          <VideoCard2
            video = {item}
            username={username}
          />
        </div>
        )
       
      })
     }     

    </div>
  );
}

export default VideoAlley;

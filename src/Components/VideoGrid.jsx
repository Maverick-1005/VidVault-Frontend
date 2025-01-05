import React, { useEffect, useState } from 'react'
import VideoCard from './Video/VideoCard'
import axios from 'axios'

function VideoGrid() {
  const [videos , setVideos] = useState([]);

  const video = () => {
    axios.get('http://localhost:8000/api/v1/video/video-home' , {
      params: {
        page: 1,
        limit: 9,
      },
      withCredentials: true,
    })
    .then((res) => {
     console.log("Videos aagye frontend" , res.data)
     console.log("ye raha data" , res.data.data)
     setVideos(res.data.data)
    })
    .catch((err)=> {
      console.log("videos nahi aae" , err)
    })

  }
  useEffect(() => {
    video();

  }, [])
  return (
    <div className='bg-black grid grid-cols-3 gap-0  sw-full ml-0 pl-0' >
        {videos.map((item) => (
        <div className='flex items-center justify-center'> 
        <VideoCard  key={item.id} video={item} /> 
        </div>
        
      ))}
    </div>
  )
}

export default VideoGrid
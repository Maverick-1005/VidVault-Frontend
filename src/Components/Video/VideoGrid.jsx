import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import axios from 'axios'
import { server } from '../../constant.js';
import { CircularProgress } from '@mui/material';

function VideoGrid() {
  const [videos , setVideos] = useState([]);
  const [page, setPage] = useState(1)

  const [isLoading, setIsLoading] = useState(false)

  const fetchVideos = () => {
    setIsLoading(true)
    axios.get(`${server}/video/allVideos` , {
      params: {
        page: page,
        limit: 12,
      },
      withCredentials: true,
    })
    .then((res) => {
     setVideos([...videos ,...res.data.data])
      setIsLoading(false)
    })
    .catch((err)=> {
      console.log("videos nahi aae at home page" , err)
    })

  }
  useEffect(() => {
    fetchVideos();
  }, [])
  if(isLoading) return(
    <div className='flex justify-center items-center'>
       <CircularProgress/>
    </div>
   
  )
  return (
    <div className=''>
   <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 ml-0 pl-0">
  {videos.map((item) => (
    <div key={item._id} className="flex items-center justify-center mt-8 ">
      <VideoCard video={item} />
    </div>
  ))}
</div>
   
    </div>
  )
}

export default VideoGrid
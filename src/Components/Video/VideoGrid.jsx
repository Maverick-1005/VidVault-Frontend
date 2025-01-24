import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import axios from 'axios'
import { server } from '../../constant.js';

function VideoGrid() {
  const [videos , setVideos] = useState([]);
  const [page, setPage] = useState(1)

  const fetchVideos = () => {
    axios.get(`${server}/video/allVideos` , {
      params: {
        page: page,
        limit: 12,
      },
      withCredentials: true,
    })
    .then((res) => {
    //  console.log("Videos aagye frontend" , res.data)
    //  console.log("ye raha data" , res.data.data)
     setVideos([...videos ,...res.data.data])
    //  setVideos(res.data.data)
    //  setPage((prev) => prev+1)
    })
    .catch((err)=> {
      // console.log("videos nahi aae" , err)
    })

  }
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop >=
  //       document.documentElement.offsetHeight - 100 // 100px buffer from bottom
  //     ) {
  //       setPage((prev) => prev+1)
  //       fetchVideos();
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [fetchVideos]);

  useEffect(() => {
    fetchVideos();
  }, [])
 
  return (
    <div>
   <div className="bg-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ml-0 pl-0">
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
import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import axios from 'axios'

function VideoGrid() {
  const [videos , setVideos] = useState([]);


  const video = () => {
    axios.get('http://localhost:8000/api/v1/video/allVideos' , {
      params: {
        page: 1,
        limit: 9,
      },
      withCredentials: true,
    })
    .then((res) => {
    //  console.log("Videos aagye frontend" , res.data)
    //  console.log("ye raha data" , res.data.data)
     setVideos(res.data.data)
    })
    .catch((err)=> {
      // console.log("videos nahi aae" , err)
    })

  }
  useEffect(() => {
    video();

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
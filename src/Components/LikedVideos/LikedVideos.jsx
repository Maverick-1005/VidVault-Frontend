import React, { useEffect, useState } from 'react'
import VideoCard2 from '../Video/VideoCard2'
import axios from 'axios'
import { server } from '../../constant.js'


function LikedVideos() {

    const [videos, setVideos] = useState([])    
    console.log('liked mein')

    const fetchLikedVideos = async() => {
    
       await axios.get(`${server}/likes/likedVideos` , {
        withCredentials: true
       })
       .then((res) => {
         console.log("liked videos aagye" , res.data.data)
         setVideos(res.data.data)
       })
       .catch((err) => {
        console.log("err while fetching liked videos" , err)
       })

     }
     useEffect(() => {
       
     fetchLikedVideos()
      
     }, [])
     
  return (
    <>
    <div>
    {videos.map((item) => (
  <div key={item._id} className="flex items-center justify-center mt-8 ">
    <VideoCard2 video={item} showdp={true}/>
  </div>
))}
    </div>
  </>
  )
}

export default LikedVideos
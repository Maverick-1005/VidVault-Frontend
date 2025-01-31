import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoCard from '../Video/VideoCard'
import { server } from '../../constant.js'
import PlaylistsCard from '../Playlists/PlaylistsCard.jsx'

function ChannelVideoGrid() {

    const [videos, setVideos] = useState([])
    const params = useParams()

    const userId = params.userId

    const fetchChannelVideos = async () => {

        axios.get(`${server}/video/allVideos`, {
            params: {
                page: 1,
                limit: 8,
                owner: userId,
            }
        })
            .then((res) => {
                setVideos(res.data.data)
                console.log("Channel Videos fetched ")

            })
            .catch((err) => {
                console.log("error while fecthing videos in alley", err)
            })

    }

    useEffect(() => {
        fetchChannelVideos()
    }, [userId])

    return (
       
            // <div className='flex justify-center bg-yellow-200'>
           
            //     <div className=" flex flex-wrap bg-slate-600">
            //         {videos.map((item) => (
                       
            //                 <VideoCard video={item} hidden={true} />
                        
            //         ))}
            //     </div>
            // </div>
            <div className='text=white w-screen p-5'>

      <div className='flex flex-wrap gap-3 ml-16  pl-5 '>
          {
            videos.map((item) => (
                <VideoCard video={item} hidden={true}/>
            ))
          }
      </div>

    </div>
          
            

      
    )
}

export default ChannelVideoGrid
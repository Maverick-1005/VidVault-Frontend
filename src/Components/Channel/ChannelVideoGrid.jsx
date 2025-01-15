import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoCard from '../Video/VideoCard'

function ChannelVideoGrid() {

    const [videos, setVideos] = useState([])
    const params = useParams()

    const userId = params.userId

    const fetchChannelVideos = async () => {

        axios.get('http://localhost:8000/api/v1/video/allVideos', {
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
        <div className='text-white'>
            <div className='flex justify-center'>
            <div className=' mt-10 max-w-6xl '>
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full ml-0 pl-0">
                    {videos.map((item) => (
                        <div key={item._id} className="flex items-center justify-center mt-8 ">
                            <VideoCard video={item} hidden={true} />
                        </div>
                    ))}
                </div>
            </div>
            </div>
            

        </div>
    )
}

export default ChannelVideoGrid
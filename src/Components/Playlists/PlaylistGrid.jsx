import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../../constant.js'
import VideoCard2 from '../Video/VideoCard2.jsx'


function PlaylistGrid({videos}) {

    let cnt=0;

    return (
        <div>
            <div>          
                {videos?.map((item) => (
                    <div key={item._id} className="flex items-center justify-center mt-8 ">
                    <div>
                        <h1 className='text-gray-500 text-2xl mr-2'>{++cnt}</h1>
                    </div>
                     <VideoCard2 video={item} isPlaylist={true} />
                    </div>
                ))}
                {videos?.map((item) => (
                    <div key={item._id} className="flex items-center justify-center mt-8 ">
                    <div>
                        <h1 className='text-gray-500 text-2xl mr-2'>{++cnt}</h1>
                    </div>
                     <VideoCard2 video={item} isPlaylist={true}  />
                    </div>
                ))}
                {videos?.map((item) => (
                    <div key={item._id} className="flex items-center justify-center mt-8 ">
                    <div>
                        <h1 className='text-gray-500 text-2xl mr-2'>{++cnt}</h1>
                    </div>
                     <VideoCard2 video={item} isPlaylist={true} />
                    </div>
                ))}
                {videos?.map((item) => (
                    <div key={item._id} className="flex items-center justify-center mt-8 ">
                    <div>
                        <h1 className='text-gray-500 text-2xl mr-2'>{++cnt}</h1>
                    </div>
                     <VideoCard2 video={item} isPlaylist={true}  />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlaylistGrid
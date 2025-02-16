import React, { useEffect, useState } from 'react'
import PlaylistLandingCard from './PlaylistLandingCard'
import PlaylistGrid from './PlaylistGrid'
import axios from 'axios'
import { server } from '../../constant.js'
import { useParams } from 'react-router-dom'

function PlaylistsLandingPage() {

const [playlist, setPlaylist] = useState({})
const [videos, setVideos] = useState([])
const params = useParams()

const playlistId = params.playlistId

const fetchPlaylistById = async () => {
  await axios.get(`${server}/playlists/byId/${playlistId}` , {
    withCredentials: true
  })
  .then((res) => {
    console.log("Playlist by id " , res.data.data)
    setPlaylist(res.data.data)
    setVideos(res.data.data.videos)
  })
  .catch((err) => {
    console.log("err while fetching playlist by id" , err)
  })
}
useEffect(() => {
  fetchPlaylistById()
}, [playlistId])


  return (
    <div>

        <div className='sm:flex'>
            <div className='p-2 relative'> 
                <div className='pl-16 sm:pl-0 sticky top-20'>
                <PlaylistLandingCard playlist={playlist}/>
                </div>
            </div>
            <PlaylistGrid videos={videos}/>
        </div>
        
    </div>
  )
}

export default PlaylistsLandingPage
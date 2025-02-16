import React, { useEffect, useState } from 'react'
import PlaylistsCard from '../Playlists/PlaylistsCard.jsx'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { server } from '../../constant.js'
import { useParams } from 'react-router-dom'
function ChannelPlaylists() {

  const params = useParams()

  const userId = params.userId

  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false)
  
  const [playlists, setPlaylists] = useState(["a" , "b", "c", "c", "c", "c"])

  const getAllPlaylist = async () => {
    setIsLoadingPlaylists(true)

    await axios.get(`${server}/playlists/allPlaylists/${userId}`, {
      withCredentials: true
    })
      .then((res) => {
        setPlaylists(res.data.data)
        setIsLoadingPlaylists(false)

        console.log("all plyt in channel ", res.data.data)
      })
      .catch((err) => {
        setIsLoadingPlaylists(false)
        console.log("err while fetching playlists ", err)
      })

  }
  useEffect(()=> {
    getAllPlaylist()
  },[])

  
  if(isLoadingPlaylists) return <div className='flex justify-center items-center'><CircularProgress/></div>
  return (
    <div className='text=white p-5 '>

      <div className='flex flex-wrap gap-3 ml-10  pl-5 '>
          {
            
            playlists.map((item) => (
              item.isPublic ? <PlaylistsCard playlistId = {item._id} thumbnail={item?.thumbnail} videosCount={item?.videos.length} title={item?.name} /> :<></>
            ))
           
          }
      </div>

    </div>
  )
}

export default ChannelPlaylists
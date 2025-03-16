import React, { useState } from 'react'
import PlaylistsCard from '../Playlists/PlaylistsCard'
import { useSelector } from 'react-redux'

function Collections() {



  const user = useSelector((state) => (state.auth.userData))
  const userId = user?._id;

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

  return (
    <div className='text-white' >
    <h1 className='text-5xl font-sans font-bold ml-6 mt-7'>Playlists</h1>
    <div className=''>
    <div className='flex flex-wrap gap-3 ml-10  pl-5 '>
          {
            
            playlists.map((item) => (
              item.isPublic ? <PlaylistsCard playlistId = {item._id} thumbnail={item?.thumbnail} videosCount={item?.videos.length} title={item?.name} /> :<></>
            ))
           
          }
      </div>

    </div>

</div>
  )
}

export default Collections
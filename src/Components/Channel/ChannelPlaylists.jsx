import React, { useState } from 'react'
import PlaylistsCard from '../Playlists/PlaylistsCard.jsx'
function ChannelPlaylists() {
  
  const [playlists, setPlaylists] = useState(["a" , "b", "c", "c", "c", "c", "c", "c", "c", "c", "c"])

  return (
    <div className='text=white p-5 '>

      <div className='flex flex-wrap gap-3 ml-10  pl-5 '>
          {
            playlists.map((item) => (
              <PlaylistsCard/>
            ))
          }
      </div>

    </div>
  )
}

export default ChannelPlaylists
import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
function PlaylistLandingCard({playlist}) {
    const thumbnail = playlist?.thumbnail

    const avatar = playlist?.owner?.avatar

    const fullname = playlist?.owner?.fullName
    const videosCount = 6
    const description = playlist?.description
  return (
    <div className='h-[calc(100vh-6rem)] bg-gradient-to-b from-gray-400 to-gray-950  max-w-[400px] pl-10 pr-10 pt-5 rounded-lg'>

        <div>

        <div className='mt-2 ml-1 max-w-80 '>
      <div >
        <img 
        src={thumbnail}
         alt="thumbnail" 
         className={ "rounded-lg w-96 h-60"} />
       
      </div>
          <h1 className='text-white mt-2 text-4xl font-semibold'>{playlist?.name}</h1>  
      <div>

        <div className='mt-2 flex justify-start'>
            <img src={avatar} className='rounded-full w-10 h-10'>
            </img>
            <h1 className='mt-2 ml-4'>by {fullname}</h1>
        </div>

        <div className='text-gray-300'>
            <p>Playlist • {playlist?.videos?.length} videos  </p>
        </div>
        <div className='text-gray-300 mt-3'>
            <p>{description}</p>
        </div>

        <div className='mt-3'>
            <button className='bg-white min-w-40 rounded-2xl p-2'> <PlayArrowIcon/> Play all</button>
            <button className='rounded-full bg-gray-600 p-2 ml-2'><BookmarkBorderOutlinedIcon sx={{color: "white"}}/></button>
            <button className='rounded-full bg-gray-600 p-2 ml-2'><ShareOutlinedIcon sx={{color: "white"}}/></button>
            <button className='rounded-full bg-gray-600 p-2 ml-2'><MoreVertOutlinedIcon sx={{color: "white"}}/></button>
        </div>



      </div>
      </div>


        </div>
       
    </div>
  )
}

export default PlaylistLandingCard
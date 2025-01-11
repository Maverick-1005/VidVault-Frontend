import React from 'react'

function VideoDescriptionCard({views , time = "0 days ago" , description}) {
  return (
    <div className='bg-black '>
      <p className='text-white bg-black flex justify-start pl-2'>   {views} views   {time}</p>
      <p className='text-white flex justify-start pl-2'>{description}</p>
    </div>
  )
}

export default VideoDescriptionCard
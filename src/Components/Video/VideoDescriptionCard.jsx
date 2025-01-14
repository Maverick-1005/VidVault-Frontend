import React from 'react'
import { getTimeDifference } from '../../utils/utilFunctions'

function VideoDescriptionCard({views , time = "0 days ago" , description}) {
  const timeAgo = getTimeDifference(time)
  return (
    <div className='bg-gray-700 rounded-lg max-h-40 '>
      <p className='text-white flex justify-start pl-2'>  {views} views • {timeAgo}</p>
      <p className='text-white flex justify-start pl-2 truncate'>{description}</p>
    </div>
  )
}

export default VideoDescriptionCard
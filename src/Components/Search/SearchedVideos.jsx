import React from 'react'
import VideoCard2 from '../Video/VideoCard2'

function SearchedVideos({videos}) {
  
  return (
    <>
      <div>
      {videos.map((item) => (
    <div key={item._id} className="flex items-center justify-center mt-8 ">
      <VideoCard2 video={item} showdp={true}/>
    </div>
  ))}
      </div>
    </>
  )
}

export default SearchedVideos
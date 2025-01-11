import React from 'react'
import Header from '../Header.jsx'
import SideBar from '../SideBar.jsx'
import VideoPlayer from './VideoPlayer.jsx'
import VideoAlley from './VideoAlley.jsx'
function VideoLandingPage() {
  return (
    <>   
      <Header/>
      <div>
      <div className='grid grid-cols-[auto,minmax(0,1fr),auto] gap-0'> 
        <SideBar />
        < VideoPlayer />
        <VideoAlley/>
      </div>
      </div>
   
    </>
  )
}
// videoId = "677abe7e4a2768b7f83dbde3"

export default VideoLandingPage
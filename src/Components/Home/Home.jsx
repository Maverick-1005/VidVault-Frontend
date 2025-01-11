import React from 'react'
import Header from '../Header.jsx'
import SideBar from "../SideBar.jsx"
import VideoGrid from '../Video/VideoGrid.jsx'

function Home() {
  return (
    <>
     <Header/>
    <div className='grid grid-cols-[auto,minmax(0,1fr)] gap-0'> 
        <SideBar />
        <VideoGrid />
      </div>
    </>
   
  )
}

export default Home;
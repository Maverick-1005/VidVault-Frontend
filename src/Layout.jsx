import React from 'react'
import Header from './Components/Header.jsx'
import SideBar from "./Components/SideBar.jsx"
import VideoGrid from './Components/VideoGrid.jsx'
import { AuthProvider } from './Context/AuthContext.js'

function Layout() {
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

export default Layout
import React , {useState} from 'react'
import Header from '../Header.jsx'
import SideBar from "../SideBar.jsx"
import VideoGrid from '../Video/VideoGrid.jsx'
import { Outlet } from 'react-router-dom';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className='relative'>
        <div className='sticky top-0 z-40'>
        <Header/>
        </div>
    <div className='relative grid grid-cols-[auto,minmax(0,1fr)] gap-0'> 
        <div className='sticky top-16 z-40  overflow-auto h-[calc(100vh-4rem)]'><SideBar /></div>
        <Outlet/>
      </div>
    </div>

    </>

  )
}

export default Home;
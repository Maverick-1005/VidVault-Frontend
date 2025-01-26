import React , {useState} from 'react'
import Header from '../Header.jsx'
import SideBar from "../SideBar.jsx"
import VideoGrid from '../Video/VideoGrid.jsx'
import { Outlet } from 'react-router-dom';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className=''>
          <Header/>
    <div className='grid grid-cols-[auto,minmax(0,1fr)] gap-0'> 
        <div className=''><SideBar /></div>
        <Outlet/>
      </div>
    </div>

    </>

  )
}

export default Home;
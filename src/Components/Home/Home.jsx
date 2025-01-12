import React , {useState} from 'react'
import Header from '../Header.jsx'
import SideBar from "../SideBar.jsx"
import VideoGrid from '../Video/VideoGrid.jsx'

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className=''>
          <Header/>
    <div className='grid grid-cols-[auto,minmax(0,1fr)] gap-0'> 
        <div className=''><SideBar /></div>
        <VideoGrid />
      </div>
    </div>

    </>

  )
}

export default Home;
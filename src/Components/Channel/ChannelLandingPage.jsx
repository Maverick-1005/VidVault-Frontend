import React from 'react'
import Header from '../Header.jsx'
import SideBar from '../SideBar.jsx'
import ChannelInfo from './ChannelInfo.jsx'
import { Outlet } from 'react-router-dom'
export default function ChannelLandingPage() {
  return (
    <>   
      <Header/>
      <div>
      <div className='grid grid-cols-1 lg:grid-cols-[auto,minmax(0,1fr),auto] gap-0'> 
        <SideBar myprop={true} />
         <ChannelInfo/>
      </div>
         <Outlet/>
      </div>
   
    </>
  )
}

import React from 'react'
import Header from './Header'
import Sidebar from './SideBar'

function NotAvailable() {
  return (
    <div className=''>
    <Header/>
<div className='grid grid-cols-[auto,minmax(0,1fr)] gap-0'> 
  <div className=''><Sidebar /></div>
  <div className='flex justify-center items-center'>
  <div className='text-white text-3xl flex justify-center'> Sorry Not Available...</div>
  </div>
</div>
</div>

  )
}

export default NotAvailable
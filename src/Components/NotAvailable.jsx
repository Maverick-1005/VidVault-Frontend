import React from 'react'
import Header from './Header'
import Sidebar from './SideBar'

function NotAvailable({text}) {
  return (
    <div className=''>
    <Header/>
<div className='grid grid-cols-[auto,minmax(0,1fr)] gap-0'> 
  <div className=''><Sidebar /></div>
  <div className='flex justify-center items-center mb-5'>
  <div className='text-white text-3xl flex justify-center'>{text}</div>
  </div>
</div>
</div>

  )
}

export default NotAvailable
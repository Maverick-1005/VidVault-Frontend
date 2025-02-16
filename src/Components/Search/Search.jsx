import React, { useEffect, useState } from 'react'
import SearchedVideos from './SearchedVideos'
import Header from '../Header'
import SideBar from '../SideBar'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../constant.js'
import { CircularProgress } from '@mui/material'
import NotAvailable from '../NotAvailable.jsx'

function Search() {
  const [searchParams] = useSearchParams()
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const query = searchParams.get('q')
  console.log("query", query)

  const encodedText = query.replace(/ /g, "+");

  const fetchSearchedVideos = async () => {
    setIsLoading(true)
    await axios.get(`${server}/video/allVideos/?q=${encodedText}&page=1`, {
      withCredentials: true
    }, {

    })
      .then((res) => {
        setVideos(res.data.data)
        setIsLoading(false)
        console.log("searched videos ", res.data.data)
      })
      .catch((err) => {
        console.log("error while fetching searched videos")
      })
  }




  useEffect(() => {

    fetchSearchedVideos()
  }, [encodedText])

  if (isLoading) return (
    <div className='flex justify-center items-center mt-10'>
      <CircularProgress />
    </div>

  )
  if (videos.length != 0) return (
    <div className='relative'>
    <div className='sticky top-0 z-40'>
    <Header/>
    </div>
<div className='relative grid grid-cols-[auto,minmax(0,1fr)] gap-0'> 
    <div className='sticky top-16 z-40  overflow-auto h-[calc(100vh-4rem)]'><SideBar /></div>
    <SearchedVideos videos={videos} />
    </div>
</div>
  )
  else return <NotAvailable text={"Nothing matches your search try something else..."}/>
}


export default Search
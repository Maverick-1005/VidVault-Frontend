import React, { useEffect, useState } from 'react'
import SearchedVideos from './SearchedVideos'
import Header from '../Header'
import SideBar from '../SideBar'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../constant.js'

function Search() {
  const [searchParams] = useSearchParams()
  const [videos, setVideos] = useState([])

  const query = searchParams.get('q')
  console.log("query" , query)

  const encodedText = query.replace(/ /g , "+");

  const fetchSearchedVideos = async() => {
    
    await axios.get(`${server}/video/allVideos/?q=${encodedText}&page=1` , {
        
    })
    .then((res) => {
        setVideos(res.data.data)
        console.log("searched videos ", res.data.data)
    })
    .catch((err) => {
        console.log("error while fetching searcjed videos")
    })
  }

  

  
  useEffect(() => {
   
   fetchSearchedVideos()   
  }, [encodedText])
  

  return (
    <div className=''>
    <Header/>
<div className='grid grid-cols-[auto,minmax(0,1fr)] gap-0'> 
  <div className=''><SideBar /></div>
  <SearchedVideos videos = {videos}/>
</div>
</div>

  )
}

export default Search
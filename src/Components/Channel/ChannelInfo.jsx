import axios from 'axios'
import React, { useEffect , useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ChannelInfo() {
   const params = useParams()
   const username = params.username
   const userId = params.userId

   const [channel, setChannel] = useState({})
   
   const getChannelDetails = async() => {
    console.log("userID" , userId)
    await axios.get(`http://localhost:8000/api/v1/users/${userId}` , {
        withCredentials: true
    })
    .then((res) => {
      console.log("channel = ", res.data.data)
      setChannel(res.data.data)
    })
    .catch((err) => {
        console.log("error while fetching channel details  ",err)
    })

   }
   useEffect(() => {
     getChannelDetails()
   }, [username , userId])


   const handleSubscribe = () => {

   }
   const navigate = useNavigate()

  return (
    <div className=''>

        <div className='relative '>
        <div className='flex justify-center min-w-full bg-white'>
            {channel.coverImage == "" ? <div className='bg-black h-80 max-h-80 w-full max-w-7xl min-w-full'></div> :<img src={channel.coverImage} className='max-h-80 w-full max-w-7xl min-w-full'/>}
           
        </div>
        <div className={'absolute left-44 top-2/3 sm:left-56 min-w-36 min-h-36'}>
            <img src={channel.avatar} className='h-48 w-48 rounded-full min-w-36 min-h-36'/>
        </div>
        </div>

        <div className='relative min-w-96'>

        <div className='mt-24 flex'>
            <h1 className='text-white font-extrabold text-6xl ml-48 sm:ml-60 '>{channel.fullName}</h1>
        </div>


        <div className='b flex'>
            <p className='text-white ml-48 sm:ml-60 '>@{channel.username} • 0 subscribers • 10 videos </p>
        </div>
        <div className=' flex'>
        <p className='text-white ml-48 sm:ml-60'>{channel.bio}...</p>           
        </div>
        <div onClick={handleSubscribe} className=' max-w-40 ml-48 mt-2  sm:absolute sm:top-10  sm:right-40 bg-white rounded-3xl p-3'>
        <button className=' text-black font-bold'>Subscribe</button>
        </div>

        </div>

        <div className=' text-white mt-5'>
            <nav className='ml-36'>
                <ul className='flex gap-14 border-b-2  border-b-slate-200'>
                    <li className='font-bold hover:cursor-pointer' onClick={(e) => {
                        navigate(`/channel/${username}/${userId}/videos`)
                    }}>Videos</li>
                    <li className='font-bold hover:cursor-pointer' onClick={(e) => {
                        navigate(`/channel/${username}/${userId}/playlists`)
                    }}>Playlists</li>
                    <li className='font-bold hover:cursor-pointer' onClick={(e) => {
                        navigate(`/channel/${username}/${userId}/community`)
                    }}>Community</li>
                </ul>
            </nav>
        </div>




       
      

        
    </div>
  )
}

export default ChannelInfo
import React, { useState , useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
const VideoCard2 = ({ video, user , showdp=false}) => {
  const thumbnail = video.thumbnail
  const title = video.title
  const views = video.views
  const navigate = useNavigate()
  
 const [owner, setOwner] = useState({})

  if(!user){
    const request = () => {
      axios.get(`http://localhost:8000/api/v1/users/${video.owner}` ,{
        withCredentials: true,
      })
      .then((res) => {
       console.log("User data" , res.data.data)
       setOwner(res.data.data)
      })
      .catch((err)=> {
        console.log("User data nahi aarha" , err)
      })
     }
     useEffect(() => {
       request()
     }, [video])
  }
  const handleOnClick = () => {
    console.log("here" , video);

    navigate(`/videos/${video._id}`)
  }
  return (
    <div onClick={handleOnClick}  className="bg-black hover:cursor-pointer flex  text-white h-32 rounded-lg overflow-hidden shadow-md">
      {/* Thumbnail */}
      <div className='mt-2 ml-1'>
      <div className="relative ">
        <img src={thumbnail} alt="thumbnail" className="w-40 h-30 max-h-32 rounded-lg " />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
          4:10
        </span>
      </div>
      </div>
      

      {/* Video Info */}
      <div>

        <div className="p-3">
          {/* Title */}
          <div className='flex  bg-black mr-0'>
          <h3 className="text-sm font-semibold truncate mr-0">{title}</h3>
          </div>

          {/* Owner */}
          <div className='flex'>
          <div className={showdp ? "" : "hidden" }> <img src={user?.avatar || owner.avatar} className='w-5 h-5 rounded-full'></img></div>
          <button className="text-gray-400 bg-black text-xs mt-2 p-0 ml-0 truncate">{user?.username || owner.username}</button>
          </div>

          {/* Views and Time */}
          <div className="text-gray-400 text-xs mt-2 flex bg-black gap-8 justify-between">
            <div className=''><span>{views} views </span></div>
            <div className='bg-black'><span className="h-1 w-1 rounded-full bg-gray-400"></span></div>
            <div><span>2 days ago</span></div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default VideoCard2;

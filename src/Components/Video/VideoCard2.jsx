import React, { useState , useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { getTimeDifference } from '../../utils/utilFunctions';
import { server } from '../../constant.js';
const VideoCard2 = ({ video, user , showdp=false}) => {
  const thumbnail = video.thumbnail
  const title = video.title
  const views = video.views
  const time = getTimeDifference(video.createdAt)
  const navigate = useNavigate()
  
 const [owner, setOwner] = useState({})

  if(!user){
    const request = () => {
      axios.get(`${server}/users/${video.owner}` ,{
        withCredentials: true,
      })
      .then((res) => {
      //  console.log("User data" , res.data.data)
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

    navigate(`/videos/${user.username}/${video._id}`)
  }
  return (
    <div onClick={handleOnClick}  className={showdp? ' hover:cursor-pointer flex w-full mi  h-72 bg-black text-white rounded-lg overflow-hidden shadow-md':"bg-black hover:cursor-pointer flex  text-white rounded-lg overflow-hidden shadow-md"}>
      {/* Thumbnail */}
      <div className={showdp ?'mt-2 ml-1 max-w-96 h-72 ' :'mt-2 ml-1 max-w-40 max-h-32'}>
      <div className="relative ">
        <img src={thumbnail} alt="thumbnail" className={showdp? "rounded-lg h-60 min-w-96 " : "rounded-lg"} />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
          4:10
        </span>
      </div>
      </div>
      

      {/* Video Info */}
      <div>

        <div className="p-3">
          {/* Title */}
          <div className={showdp?'flex   bg-black mr-0 max-w-20  sm:max-w-xl'  :'flex  bg-black mr-0 max-w-40'}>
          <h3 className={showdp? 'text-lg ' :"text-sm font-semibold truncate mr-0"}>{title}</h3>
          </div>

          {/* Owner */}
          <div className='flex'>
          <div className={showdp ? "mt-5" : "hidden" }> <img src={user?.avatar || owner.avatar} className='w-7 h-7 rounded-full'></img></div>
          <button 
           onClick={
            (e) => {
              e.stopPropagation()
              navigate(`../channel/${user?.username || owner.username}/${user?._id || owner._id}/videos`)
            }
           }
          className={showdp ? "text-gray-400 bg-black mt-5 ml-2" : "text-gray-400 bg-black text-xs mt-2 p-0 ml-0 truncate"}>{user?.username || owner.username}</button>
          </div>

          {/* Views and Time */}
          <div className={showdp? "bg-black  text-sm text-gray-400 gap-1 sm:flex mt-5":"text-gray-400 text-xs mt-2 flex bg-black gap-1 "}>
            <div className=''><span>{views}views  </span></div>
            <div className='bg-black'><span >•</span></div>
            <div><span>{time}</span></div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default VideoCard2;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTimeDifference } from "../../utils/utilFunctions";
const VideoCard = ({video , hidden= false}) => {


  const navigate = useNavigate();
  const thumbnail = video.thumbnail
  const title = video.title
  const id = video.owner
  const [user , setUser] = useState({})

  const handleId = () => {
    navigate(`/videos/${video._id}`);
  }
 const request = () => {
  axios.get(`http://localhost:8000/api/v1/users/${id}` ,{
    withCredentials: true,
  })
  .then((res) => {
   console.log("User data" , res.data.data)
   setUser(res.data.data)
  })
  .catch((err)=> {
    console.log("User data nahi aarha" , err)
  })
 }
 
 useEffect(() => {
   request()
 }, [video])

 

 

  const userAvatar = user.avatar
  const username = user.username
  const views = video.views
  const timeAgo = getTimeDifference(video.createdAt)
  
  // const duration = video.duration,
  return (
    <div onClick={() => handleId()} className="cursor-pointer w-11/12 h-80 bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
      {/* Thumbnail Section */}
      <div className="relative">
        <img src={thumbnail} alt="Video Thumbnail" className="w-full h-[200px] object-fill" />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-xs text-white py-1 px-2 rounded">
          {/* {duration} */}
        </span>
      </div>

      {/* Video Info Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div className={"flex items-center space-x-3"}>
          <img
            src={userAvatar}
            alt="Image"
            className={hidden? "hidden":"w-10 h-10 rounded-full object-cover"}
          />
          <div>
            <button onClick={(e) => {
              e.stopPropagation()
              navigate(`../channel/${username}/${user._id}/videos`)
            }} className={hidden? "hidden":"text-sm font-semibold"}>{username}</button>
            <p className="text-xs text-gray-400">
              {views} views • {timeAgo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

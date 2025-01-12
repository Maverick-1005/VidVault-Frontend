import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoCard2 = ({ video, username }) => {
  const thumbnail = video.thumbnail
  const title = video.title
  const views = video.views
  const navigate = useNavigate()

  const handleOnClick = () => {
    console.log("here" , video);

    navigate(`/videos/${video._id}`)
  }
  return (
    <div onClick={handleOnClick}  className="bg-black hover:cursor-pointer flex max-w-96 text-white h-32 rounded-lg overflow-hidden shadow-md">
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
          <div className='flex w-32 bg-black mr-0'>
          <h3 className="text-sm font-semibold truncate mr-0">{title}</h3>
          </div>

          {/* Owner */}
          <div className='flex'>
          <button className="text-gray-400 bg-black text-xs mt-2 p-0 ml-0 truncate">{username}</button>
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

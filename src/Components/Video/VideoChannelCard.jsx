import React from "react";

const VideoChannelCard = ({ channelName, channelAvatar , channel ,subscriberCount = "0", likeCount = "0" }) => {
  return (
    <div className="flex items-center justify-between bg-black text-white p-4  shadow-md">
      {/* Left Section: Channel Info */}
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold text-green-500">
          {/* Placeholder for Channel Logo */}
          <img
            src={channelAvatar}
            alt="Image"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="ml-3">
          <h2 className="font-semibold text-lg">{channelName}</h2>
          <p className="text-sm text-gray-400">{subscriberCount} subscribers</p>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center space-x-4">
        {/* Subscribe Button */}
        <button className="bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-gray-200">
          Subscribe
        </button>
        {/* Like/Dislike */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button className="text-xl">👍</button>
            <span>{likeCount}</span>
          </div>
          <div className="w-px h-5 bg-gray-700"></div>
          <button className="text-xl">👎</button>
        </div>
        {/* Share Button */}
        <button className="text-gray-400 hover:text-white">Share</button>
        {/* Download Button */}
        <button className="text-gray-400 hover:text-white">Download</button>
        {/* More Options */}
        <button className="text-gray-400 hover:text-white">•••</button>
      </div>
    </div>
  );
};

export default VideoChannelCard;

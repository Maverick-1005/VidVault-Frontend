import React from "react";
import { getTimeDifference } from "../../utils/utilFunctions";

const CommentCard = ({content , username , userAvatar ,likeCount=0 , time}) => {
    const timeAgo = getTimeDifference(time)
  
  return (
    <div className=" bg-black  text-white p-4 rounded-md w-full">
      <div className="flex bg-black items-center mb-2 w-full">
        <div className="h-10 w-10 mb-3rounded-full overflow-hidden flex-shrink-0">
          <img
            src={userAvatar}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
       <div className=" ml-3 w-full">
       <div className=" mt-2 flex bg-black ">
          <p className="text-sm font-semibold">@{username}</p>
          <p className="text-xs text-gray-400 ml-2 mt-1">{timeAgo}</p>
        </div>

      <div className="bg-black pt-2 flex">
      <p className="text-sm mb-4">
        <span className="ml-3">{content}</span>
      </p>
      </div>

       </div>
       

      </div>

     
      

      {/* Actions */}
      <div className="flex pl-14 items-center space-x-4 bg-black">
        {/* Like Button */}
        <button className="flex items-center text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-5 w-5"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="ml-1 text-sm">{likeCount}</span>
        </button>

        {/* Reply Button */}
        <button className="text-gray-400 hover:text-white text-sm">Reply</button>
      </div>
    </div>
  );
};

export default CommentCard;

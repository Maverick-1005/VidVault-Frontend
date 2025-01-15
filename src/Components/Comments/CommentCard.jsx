import React, { useState, useRef, useEffect } from "react";
import { getTimeDifference } from "../../utils/utilFunctions";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const CommentCard = ({ content, username, userAvatar, likeCount = 0, time, currUser, cmt, oncmmtChange}) => {

  const [cmntContent, setCmntContent] = useState(content)
  const timeAgo = getTimeDifference(time)

  const [isMenuOn, setIsMenuOn] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const menuRef = useRef();
  const editRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOn(false);
    }
    if (editRef.current && !editRef.current.contains(event.target)) {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);


  const handleDelete = async () => {
    await axios.post(`http://localhost:8000/api/v1/comments/delete-comment/${cmt._id}`, {}, {
      withCredentials: true
    })
      .then((res) => {
        oncmmtChange()
      })
      .catch((err) => {
        console.log("Error while deleting cmmt", err)
      })
  }

  const handleCommentEdit = async () => {
    await axios.post(`http://localhost:8000/api/v1/comments/update-comment/${cmt._id}`, {
      text: cmntContent
    }, {
      withCredentials: true
    })
    .then((res) => {
      console.log("comment updated successfully")
      oncmmtChange()
    })
    .catch((err) => {
      console.log(" err while updating cmmt " , err)
    })
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommentEdit()
    
      setIsEdit(false)
    }
  };
  // useEffect(() => {
  //   if(isEdit && editRef.current){
  //     editRef.current.focus()
  //   }
  
  // }, [isEdit])
  

  return (
    <div className=" bg-black text-white p-4 rounded-md w-full">
      <div className="flex items-center mb-2 w-full relative">
        <div className="h-10 w-10 mb-3rounded-full overflow-hidden flex-shrink-0">
          <img
            src={userAvatar}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
        <div onClick={() => {
          setIsMenuOn(!isMenuOn)
        }} className="absolute right-2 top-3 cursor-pointer">
          <MoreVertIcon />

        </div>
        <div ref={menuRef} className={isMenuOn ? "w-28 h-16  bg-slate-800 rounded-xl absolute -right-12 top-10" : "hidden"}>
          {
            currUser?.username === username ?
              <div className="flex flex-col" >
                <div onClick={() => {
                  setIsEdit(!isEdit)
                }} className="mt-2 cursor-pointer">
                  <EditIcon /> Edit
                </div>
                <div onClick={handleDelete} className="mt-1 cursor-pointer"><DeleteIcon />Delete</div>
              </div>
              :
              <div className="mt-5">
                <button>Report</button>
              </div>

          }


        </div>
        <div className=" ml-3 w-full">
       <div className=" mt-2 flex bg-black ">
          <p className="text-sm font-semibold">@{username}</p>
          <p className="text-xs text-gray-400 ml-2 mt-1">{timeAgo}</p>
        </div>

      <div className="bg-black pt-2 flex">
      {
              isEdit ?
                <div ref={editRef} className='w-full mr-8 border-0 '>
                  <input
                    type='text'
                    value={cmntContent}
                    onChange={(e) => {
                      setCmntContent(e.target.value)
                    }}
                    onKeyDown={handleKeyPress}
                    className='text-white bg-black ml-5 border-b-2 border-white w-full' placeholder='Add a comment....' />
                </div> :
                 <p className="text-sm mb-4">
                 <span className="ml-3">{content}</span>
               </p>

            }
     
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

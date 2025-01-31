import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTimeDifference } from "../../utils/utilFunctions";
import { server } from "../../constant.js";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideoOptionsMenu from "./VideoOptionsMenu.jsx";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { Box, Divider, Menu, MenuItem, Modal } from "@mui/material";
import { ReplyOutlined } from "@mui/icons-material";
const VideoCard = ({ video, hidden = false }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const thumbnail = video.thumbnail
  const title = video.title
  const id = video.owner
  const [user, setUser] = useState({})
  const [isMenuOpen , setIsMenuOpen] = useState(false)
  const [isPlaylistDialog, setIsPlaylistDialog] = useState(false)

  const request = () => {
    axios.get(`${server}/users/${id}`, {
      withCredentials: true,
    })
      .then((res) => {
        //  console.log("User data" , res.data.data)
        setUser(res.data.data)
      })
      .catch((err) => {
        console.log("User data nahi aarha", err)
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
    <div onClick={() => { navigate(`../../videos/${username}/${video?._id}`) }} className="cursor-pointer   w-11/12 max-w-80   text-white rounded-lg overflow-hidden shadow-lg">

     

      {/* Thumbnail Section */}
      <div className="">
        <img src={thumbnail} alt="Video Thumbnail" className="w-full h-[200px] object-fill" />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-xs text-white py-1 px-2 rounded">
          {/* {duration} */}
        </span>
      </div>

      {/* Video Info Section */}

      <div className="p-2 flex relative  ">

        <div>
          <img
            src={userAvatar}
            alt="Image"
            className={hidden ? "hidden" : "w-10 h-10 rounded-full object-cover"}
          />
        </div>

        <div className="ml-3 pr-2 ">

          <h3 className="text-lg font-bold ">{title}</h3>
          <div>
            <button onClick={(e) => {
              e.stopPropagation()
              navigate(`../channel/${username}/${user._id}/videos`)
            }} className={hidden ? "hidden" : "text-sm text-gray-400 font-semibold"}>{username}</button>
            <p className="text-sm text-gray-400">
              {views} views • {timeAgo}
            </p>
          </div>
         
        </div>
        <div onClick={(e)=> {
          setIsMenuOpen(!isMenuOpen)
          e.stopPropagation()
          setAnchorEl(e.currentTarget);
          
        }} className="absolute right-1">
          <MoreVertIcon/>
        </div>


     

      </div>
     <Menu
        
        anchorEl={anchorEl}
        open={open}
        onClick={e=>e.stopPropagation()}
        
        onClose={()=>setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem  className="hover:bg-gray-700">
          <WatchLaterOutlinedIcon/> <span className="ml-2">Save to Watch Later</span>
        </MenuItem>
        <MenuItem onClick={(e) => {
          setAnchorEl(null)
          setIsPlaylistDialog(true)
        }} className="hover:bg-gray-700">
        <BookmarkBorderOutlinedIcon/> <span className="ml-2">Save to Playlist</span>
        </MenuItem>
        <MenuItem  className="hover:bg-gray-700">
        <div className="scale-x-[-1] inline-block">
      <ReplyOutlined />
    </div> <span className="ml-2">Share</span>
        </MenuItem>
        <Divider/>
        <MenuItem  className="hover:bg-gray-700">
         <NotInterestedOutlinedIcon/>
         <span className="ml-2"> Don't Recommend Channel</span>
        </MenuItem>
        <MenuItem  className="hover:bg-gray-700">
         <FlagOutlinedIcon/> <span className="ml-2"> Report</span>
        </MenuItem>
      </Menu>

      <Dialog open={isPlaylistDialog} onClick={(w) => {
        w.stopPropagation()
      } } onClose={() => setIsPlaylistDialog(false)}>
          <DialogTitle>{"Save Video to.."}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              hello
            </DialogContentText> */}
            <div className="inline">
              <div>
              <input type="checkbox" className=""></input><label className="ml-5">Soothing</label>
              </div>
              <div>
              <input type="checkbox" className=""></input><label className="ml-5">Bhajan</label>
              </div>
              <div>
              <input type="checkbox" className=""></input><label className="ml-5">Car</label>
              </div>
              <div>
              <input type="checkbox" className=""></input><label className="ml-5">Travel</label>
              </div>
            </div>
            
          </DialogContent>
          <DialogActions>
            <Button color="secondary" className="mr-10" >
             + New Playlist
            </Button>
            
          </DialogActions>
        </Dialog>
     
    </div>
  );
};

export default VideoCard;

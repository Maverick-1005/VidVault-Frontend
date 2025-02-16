import React, { useEffect, useRef, useState } from "react";
import axios, { all } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTimeDifference } from "../../utils/utilFunctions";
import { server } from "../../constant.js";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideoOptionsMenu from "./VideoOptionsMenu.jsx";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import { Box, Divider, Menu, MenuItem, Modal } from "@mui/material";
import { ReplyOutlined } from "@mui/icons-material";
const VideoCard = ({ video, hidden = false }) => {

  const currUser = useSelector((state) => (state.auth.userData))
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const thumbnail = video.thumbnail
  const title = video.title
  const id = video.owner
  const [user, setUser] = useState({})
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaylistDialog, setIsPlaylistDialog] = useState(false)
  const [isNewPlaylistDialog, setIsNewPlaylistDialog] = useState(false)

  const [selectedValue, setSelectedValue] = useState(false)
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("")
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("")
  const [allPlaylists, setAllPlaylists] = useState([])

  const userAvatar = user.avatar
  const username = user.username
  const views = video.views
  const timeAgo = getTimeDifference(video.createdAt)

  

  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false)


  const [values, setValues] = useState({});

  const playlistRef = useRef(null)

  useEffect(() => {

    if (allPlaylists?.length) {
      const updatedValues = { ...values }; // Copy existing values
  
      allPlaylists.forEach((item) => {
          updatedValues[item?._id] = false; // Update each key directly
      });
  
      console.log("updated val" , updatedValues); // Verify output
      setValues(updatedValues)
  }
  }, [allPlaylists])


  
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

  const getAllPlaylist = async () => {
    setIsLoadingPlaylists(true)
    console.log("curr user name  " , currUser?.fullName)
    await axios.get(`${server}/playlists/allPlaylists/${currUser?._id}`, {
      withCredentials: true
    })
      .then((res) => {
        setAllPlaylists(res.data.data)
        setIsLoadingPlaylists(false)

        console.log("all plyt ", res.data.data)
      })
      .catch((err) => {
        setIsLoadingPlaylists(false)
        console.log("err while fetching playlists ", err)
      })

  }

  const handleNewPlaylist = async () => {

    await axios.post(`${server}/playlists/new`, {
      playlistName: newPlaylistTitle,
      isPublic: selectedValue,
      videoId: video._id,
      description: newPlaylistDescription,
      thumbnail: video.thumbnail
    }, {
      withCredentials: true
    })
      .then((res) => {
        console.log("res plt ", res)
        toast.success("New Playlist created and video added", {
          position: "bottom-left"
        })
      })
      .catch((err) => {
        console.log("err ", err)
      })
  }
  console.log("Values obj ", values)


  const handleAddingtoPlaylists = async (playlistId , values) => {

    console.log("pid ", playlistId)
    console.log(" values inside hanleAdd ", values)
    console.log(" bool ", values[playlistId])

    if (values[playlistId]) {

      await axios.post(`${server}/playlists/addtoPlaylists`, {
        playlistId: playlistId,
        videoId: video?._id
      }, {
        withCredentials: true
      })
        .then((res) => {
          console.log("added video", res.data.data)
          toast.success(`video added to ${res.data.data.name}`, {
            position: "bottom-left"
          })
        })
        .catch((err) => {
          console.log("err ", err)
        })
    }
    else {
      await axios.post(`${server}/playlists/deleteFromPlaylists`, {
        playlistId: playlistId,
        videoId: video?._id
      }, {
        withCredentials: true
      })
        .then((res) => {
          console.log("video removed", res.data.data)
          toast.success(`video removed from ${res.data.data.name}`, {
            position: "bottom-left"
          })
        })
        .catch((err) => {
          console.log("err ", err)
        })
    }


  }


  // const duration = video.duration,
  return (
    <div onClick={() => { navigate(`../../videos/${username}/${video?._id}`) }} className="cursor-pointer   w-11/12 max-w-80   text-white rounded-lg overflow-hidden shadow-lg">


      <ToastContainer />


      {/* Thumbnail Section */}
      <div className="">
        <img src={thumbnail} alt="Video Thumbnail" className="w-full h-[200px] object-fill" />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-xs text-white py-1 px-2 rounded">
          {/* {duration} */}
        </span>
      </div>

      {/* Video Info Section */}

      <div className="p-2 h-[120px] flex relative  ">

        <div className="h-[40px] w-[40px]">
          <img
            src={userAvatar}
            alt="Image"
            className={hidden ? "hidden" : "w-10 h-10 rounded-full "}
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
        <div onClick={(e) => {
          setIsMenuOpen(!isMenuOpen)
          e.stopPropagation()
          getAllPlaylist()
          setAnchorEl(e.currentTarget);


        }} className="absolute -right-1">
          <MoreVertIcon />
        </div>




      </div>
      <Menu

        anchorEl={anchorEl}
        open={open}
        onClick={e => e.stopPropagation()}

        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem className="hover:bg-gray-700">
          <WatchLaterOutlinedIcon /> <span className="ml-2">Save to Watch Later</span>
        </MenuItem>
        <MenuItem onClick={(e) => {
          setAnchorEl(null)
          setIsPlaylistDialog(true)
        }} className="hover:bg-gray-700">
          <BookmarkBorderOutlinedIcon /> <span className="ml-2">Save to Playlist</span>
        </MenuItem>
        <MenuItem className="hover:bg-gray-700">
          <div className="scale-x-[-1] inline-block">
            <ReplyOutlined />
          </div> <span className="ml-2">Share</span>
        </MenuItem>
        <Divider />
        <MenuItem className="hover:bg-gray-700">
          <NotInterestedOutlinedIcon />
          <span className="ml-2"> Don't Recommend Channel</span>
        </MenuItem>
        <MenuItem className="hover:bg-gray-700">
          <FlagOutlinedIcon /> <span className="ml-2"> Report</span>
        </MenuItem>
      </Menu>

      <Dialog open={isPlaylistDialog} onClick={(w) => {
        w.stopPropagation()
      }} onClose={() => setIsPlaylistDialog(false)}>
        <DialogTitle>{"Save Video to.."}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
              hello
            </DialogContentText> */}
          <div className="inline">

            {
              isLoadingPlaylists ?
                <CircularProgress />
                :
                allPlaylists.map((item) => (
                  <div className="flex justify-between">
                    <div>

                      <input type="checkbox"
                        name={item.name}
                        checked={values[item?.id]}
                        onChange={(e) => {

                          setValues((prev) => {
                            const newVal = {...prev , [item?._id]: !prev[item._id]}
                            handleAddingtoPlaylists(item._id , newVal)
                            return newVal
                          })


                          
                          


                        }}>
                      </input>
                      <label className="ml-5">{item.name}</label>
                    </div>
                    {item.isPublic ? <div className="ml-5"><PublicOutlinedIcon /></div> : <div className="ml-5"><LockOutlinedIcon /></div>}
                  </div>
                ))
            }
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {
            setIsPlaylistDialog(false)
            setIsNewPlaylistDialog(true)
          }} color="secondary" className="mr-10" >
            + New Playlist
          </Button>

        </DialogActions>
      </Dialog>



      <Dialog open={isNewPlaylistDialog} onClick={(w) => {
        w.stopPropagation()
      }} onClose={() => setIsNewPlaylistDialog(false)}>
        <DialogTitle>{"New playlist"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
              hello
            </DialogContentText> */}
          <div className="mt-5">
            <TextField
              sx={{
                width: { xs: "100%", sm: "400px", md: "500px" },
                minWidth: "280px",
              }}
              value={newPlaylistTitle}
              onChange={(e) => {
                setNewPlaylistTitle(e.target.value)
              }}
              placeholder="Choose a title"
              label="Title" />
          </div>
          <div className="mt-5">
            <TextField
              sx={{
                width: { xs: "100%", sm: "400px", md: "500px" },
                minWidth: "280px",
              }}
              value={newPlaylistDescription}
              onChange={(e) => {
                setNewPlaylistDescription(e.target.value)
              }}
              placeholder="Description..."
              label="Description" />
          </div>
          <div className="mt-10">
            <TextField
              select
              label="Visibilty"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              fullWidth
            >
              <MenuItem value={false}><LockOutlinedIcon /><span className="ml-2">Private</span></MenuItem>
              <MenuItem value={true}><PublicOutlinedIcon /><span className="ml-2">Public</span></MenuItem>
            </TextField>
          </div>



        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {
            setIsNewPlaylistDialog(false)
          }} color="secondary" className="mr-10" >
            Cancel
          </Button>

          <Button onClick={(e) => {
            setIsNewPlaylistDialog(false)
            handleNewPlaylist()
          }} color="primary" className="mr-10" >
            Create
          </Button>

        </DialogActions>
      </Dialog>

    </div>
  );
};

export default VideoCard;

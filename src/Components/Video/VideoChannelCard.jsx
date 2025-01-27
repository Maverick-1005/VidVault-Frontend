import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../constant.js"
import axios from "axios";
import { useSelector } from "react-redux";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Box } from "lucide-react";

const VideoChannelCard = ({ channelName, channelAvatar, channel, video}) => {

  // console.log("Likes is ", likesCount)

  // console.log("isLiked ", liked)

  const params = useParams()
  const videoId = params.videoId

  const [loadingChannel, setLoadingChannel] = useState(true)
  const [loadingVideo, setLoadingVideo] = useState(true)

  const [isUnsubDialog, setIsUnsubDialog] = useState(false)

  const [loadingCurrUser, setLoadingCurrUser] = useState(true)
  const currUser = useSelector((state) => (state.auth.userData))

  const [subscribed, setSubscribed] = useState(channel?.isSubscribed || false)
  const [isLiked, setIsLiked] = useState(video?.isLiked || false)


  useEffect(() => {
    if (channel) {
      setSubscribed(channel.isSubscribed)
      setLoadingChannel(false)
    }
  }, [channel])
  console.log("ye aaya channel ", channel)


  useEffect(() => {
    if (video) {
      setIsLiked(video.isLiked)
      setLoadingVideo(false)
    }
  }, [video])
  console.log("ye aaya video ", video)

  useEffect(() => {
    if (currUser) setLoadingCurrUser(false)
  }, [currUser])



  const handleSubscribe = () => {

    if (!subscribed) {
      axios.get(`${server}/subs/subsribe/${channel._id}`, {
        withCredentials: true
      })
        .then((res) => {
          console.log("subscribed", res)
          setSubscribed(true)
        })
        .catch((err) => {
          console.log("err while subscribing ", err)
        })
    }
    else {
      setIsUnsubDialog(true)
      axios.get(`${server}/subs/unsubsribe/${channel._id}`, {
        withCredentials: true
      })
        .then((res) => {
          console.log("unsubscribed", res)
          setSubscribed(false)
        })
        .catch((err) => {
          console.log("err while unsubscribing ", err)
        }).finally(() => {
          setIsUnsubDialog(false)
        })
    }

  }

  const handleLike = async () => {
    setIsLiked(!isLiked)

    await axios.post(`${server}/likes/video/${videoId}` , {
      isLiked: isLiked
    } , {
      withCredentials: true
    })
    .then((res) => {
      console.log(`liked: ${!isLiked}` , res)
    })
    .catch((err) => {
      console.log("err ",err)
    })


  }

  const navigate = useNavigate()
  if (loadingCurrUser || loadingVideo ) return <>Loading...</>
  else if (loadingChannel) return <>Loading...</>
  else return (
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
          <h2 onClick={(e) => {
            navigate(`../channel/${channel.username}/${channel._id}/videos`)
          }} className="font-semibold text-lg cursor-pointer">{channel.username}</h2>
          <p className="text-sm text-gray-400">{channel?.subscribersCount} subscribers</p>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center space-x-4">
        {/* Subscribe Button */}
        {
          subscribed ? <button onClick={() => setIsUnsubDialog(true)} className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-200">
            Subscribed
          </button> : <button onClick={handleSubscribe} className="bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-gray-200">
            Subscribe
          </button>
        }
        <Dialog open={isUnsubDialog} onClose={() => setIsUnsubDialog(false)}>
          <DialogTitle>{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to unsubscribe? You will no longer receive updates from this channel.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={() => setIsUnsubDialog(false)}>
              Cancel
            </Button>
            <Button color="error" onClick={handleSubscribe}>
              Unsubscribe
            </Button>
          </DialogActions>
        </Dialog>
        {/* Like/Dislike */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button onClick={handleLike} className="text-xl">{isLiked ? <ThumbUpIcon/> : <ThumbUpAltOutlinedIcon/>}</button>
            <span>{video?.likesCount}</span>
          </div>
          <div className="w-px h-5 bg-gray-700"></div>
          <button className="text-xl"><ThumbDownOutlinedIcon /></button>
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

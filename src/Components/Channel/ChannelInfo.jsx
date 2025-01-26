import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { server } from "../../constant.js"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

function ChannelInfo() {
    const params = useParams()
    const username = params.username
    const userId = params.userId

    const [channel, setChannel] = useState({})

    const [loadingChannel, setLoadingChannel] = useState(true)

    const [isUnsubDialog, setIsUnsubDialog] = useState(false)

    const [subscribed, setSubscribed] = useState(channel?.isSubscribed || false)

    useEffect(() => {
        if (channel) {
            setSubscribed(channel.isSubscribed)
            setLoadingChannel(false)
        }
    }, [channel])
    console.log("ye aaya channel ", channel)


    const getChannelDetails = async () => {
        console.log("userID", userId)
        await axios.get(`${server}/users/c/${username}`, {
            withCredentials: true
        })
            .then((res) => {
                console.log("channel = ", res.data.data)
                setChannel(res.data.data)
            })
            .catch((err) => {
                console.log("error while fetching channel details  ", err)
            })
    }

    useEffect(() => {
        getChannelDetails()
    }, [username])


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
                })
                .finally(() => {
                    setIsUnsubDialog(false)
                })
        }
    }
    console.log("dialog " , isUnsubDialog)
    const navigate = useNavigate()

    if (loadingChannel) return <>Loading...</>
    else return (
        <div className=''>

            <div className='relative '>
                <div className='flex justify-center min-w-full bg-white'>
                    {channel.coverImage == "" ? <div className='bg-black h-80 max-h-80 w-full max-w-7xl min-w-full'></div> : <img src={channel.coverImage} className='max-h-80 w-full max-w-7xl min-w-full' />}

                </div>
                <div className={'absolute left-44 top-2/3 sm:left-56 min-w-36 min-h-36'}>
                    <img src={channel.avatar} className='h-48 w-48 rounded-full min-w-36 min-h-36' />
                </div>
            </div>

            <div className='relative min-w-96'>

                <div className='mt-24 flex'>
                    <h1 className='text-white font-extrabold text-6xl ml-48 sm:ml-60 '>{channel.fullName}</h1>
                </div>


                <div className='b flex'>
                    <p className='text-white ml-48 sm:ml-60 '>@{channel.username} • {channel.subscribersCount} subscribers • 10 videos </p>
                </div>
                <div className=' flex'>
                    <p className='text-white ml-48 sm:ml-60'>{channel.bio}...</p>
                </div>
                {
                    subscribed ?
                        <div onClick={() => {
                            setIsUnsubDialog(true)
                        }} className=' max-w-40 ml-48 mt-2  sm:absolute sm:top-10  sm:right-40 bg-gray-600 rounded-3xl p-3'>
                            <button className=' text-white font-bold'>Subscribed</button>
                        </div>
                        :
                        <div onClick={handleSubscribe} className=' max-w-40 ml-48 mt-2  sm:absolute sm:top-10  sm:right-40 bg-white rounded-3xl p-3'>
                            <button className=' text-black font-bold'>Subscribe</button>
                        </div>
                }

            </div>
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


            <div className=' text-white mt-5'>
                <nav className='ml-36'>
                    <ul className='flex gap-14 border-b-2  border-b-slate-200'>
                        <li className='font-bold hover:cursor-pointer' onClick={(e) => {
                            navigate(`/channel/${username}/${userId}/videos`)
                        }}>Videos</li>
                        <li className='font-bold hover:cursor-pointer' onClick={(e) => {
                            navigate(`/channel/${username}/${userId}/playlists`)
                        }}>Playlists</li>
                        <li className='font-bold hover:cursor-pointer' onClick={(e) => {
                            navigate(`/channel/${username}/${userId}/community`)
                        }}>Community</li>
                    </ul>
                </nav>
            </div>








        </div>
    )
}

export default ChannelInfo
import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import axios from 'axios';
import { server } from '../../constant.js';
import { useNavigate } from 'react-router-dom';


const SubscribedChannelsCard = ({ channel }) => {

    const [loadingChannel, setLoadingChannel] = useState(true)

    const [isUnsubDialog, setIsUnsubDialog] = useState(false)

    const [subscribed, setSubscribed] = useState(channel?.isSubscribed || false)

    useEffect(() => {
        if (channel) {
            setSubscribed(channel.isSubscribed)
            setLoadingChannel(false)
        }
    }, [channel])


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
    const navigate = useNavigate()
    if(loadingChannel) return <>Loading...</>
   else return (
        <div 
        onClick={() => {
            navigate(`../../channel/${channel.username}/${channel._id}/videos`)
        }}
        className="mt-5 hover:cursor-pointer text-white p-4 rounded-2xl shadow-lg max-w-lg mx-auto md:max-w-full">

            <div className='flex justify-between '>
                <div className="flex items-center">


                    <img
                        src={channel.avatar}
                        alt={channel.name}
                        className="w-24 h-24 rounded-full mr-4 border border-gray-700"
                    />
                    <div>
                        <div>
                            <h2 className="text-xl font-semibold">{channel.fullName}</h2>
                            <div className='flex'>
                                <p className="text-sm text-gray-400">@{channel.username}</p>
                                <p className="text-sm text-gray-400 ml-1">•</p>
                                <p className="text-sm text-gray-400 ml-1">{channel.subscribersCount}subscribers</p>
                            </div>
                        </div>

                        <p className="mt-1 text-gray-300">{channel?.bio || "Here will be the bio of channel"}</p>

                    </div>

                </div>

                <div onClick={
                    (e) => {
                        e.stopPropagation()
                    }
                } className=''>
                    {
                        subscribed ? <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsUnsubDialog(true)
                            }}
                            className="mt-4 bg-slate-700 hover:bg-slate-500 transition-all duration-200 text-white font-semibold px-4 py-2 rounded-lg flex items-center"
                        >
                            <span className="mr-2">Subscribed</span>

                        </button> : <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleSubscribe()
                            }}
                            className="mt-4 bg-slate-200 hover:bg-slate-500 transition-all duration-200 text-black font-semibold px-4 py-2 rounded-lg flex items-center"
                        >
                            <span className="mr-2">Subscribe</span>

                        </button>
                    }

                </div>

            </div>
            <Dialog open={isUnsubDialog} onClose={() => setIsUnsubDialog(false)}>
                <DialogTitle>{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to unsubscribe? You will no longer receive updates from this channel.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={(e) => {
                        e.stopPropagation()
                        setIsUnsubDialog(false)}}>
                        Cancel
                    </Button>
                    <Button color="error" onClick={(e) => {
                        e.stopPropagation()
                        handleSubscribe()
                    }}>
                        Unsubscribe
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    );
};

export default SubscribedChannelsCard;

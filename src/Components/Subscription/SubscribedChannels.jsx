import React, { useEffect, useState } from 'react'
import SubscribedChannelsCard from './SubscribedChannelsCard'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { server } from '../../constant.js'
import Header from '../Header.jsx'
import SideBar from '../SideBar.jsx'

function SubscribedChannels() {
    const [channels, setChannels] = useState([])

    const [currUserLoading, setCurrUserLoading] = useState(true)

    const currUser = useSelector((state) => (state.auth.userData))

    useEffect(() => {
        if (currUser) {
            setCurrUserLoading(false)
        }
    }, [currUser])
    const getChannels = async () => {

        await axios.get(`${server}/subs/subscribedChannels`, {
            withCredentials: true
        })
            .then((res) => {
                console.log("res =  ", res.data.data)
                console.log("subscribed channels ", res.data.data)
                setChannels(res.data.data)
            })
            .catch((err) => {
                console.log("err ", err)
            })
    }
    useEffect(() => {
        getChannels()
    }, [])



    return (
        

                <div className='text-white' >
                    <h1 className='text-5xl font-sans font-bold ml-6 mt-7'>All Subscriptions</h1>
                    <div className=''>
                        {
                            channels.map((item) => {
                                return (
                                    <SubscribedChannelsCard channel={item} />
                                )
                            })
                        }
                    </div>

                </div>
           

    )
}

export default SubscribedChannels
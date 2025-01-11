import React from 'react'
import { useState } from 'react'

function CommentsHeader({ commentsCount=0, userAvatar }) {

    const handleSubmit = (e) => {

    }

    const [comment, setComment] = useState("")
    return (
        <div>
            <div className='flex mt-6 '>
                <div>
                <h2 className='text-white flex justify-start ml-3'>{commentsCount} Comments</h2>
                </div>
                <div>
                <button className=' text-white ml-5 bg-black flex justify-start'>= Sort By</button>
                </div>
            </div>
            <form onSubmit={handleSubmit}>

            <div className='flex justify-evenly mt-5'>
                <div className='w-10 ml-5 mb-1 h-10 rounded-full '>
                    <img src={userAvatar} alt = "image" className='w-10 h-10 rounded-full flex justify-start' />
                </div>
                <div className='w-full mr-8'>
                    <input 
                    type='text' 
                    value={comment} 
                    onChange={(e) => {
                      setComment(e.target.value)
                    }} 
                    className='text-white bg-black ml-5  w-full' placeholder='Add a comment....'/>
                </div>
                 </div>

                 <div className='flex justify-end'>
                 <div>
                <button className='ml-5 text-white' onClick={(e) => {
                    setComment('')
                }}>Cancel</button>
                </div>
                <div>
                <button type='submit' className='ml-5 mr-2 text-white' onClick={handleSubmit}>Comment</button>
                </div>

                </div>
                 </form >


        </div>
    )
}

export default CommentsHeader
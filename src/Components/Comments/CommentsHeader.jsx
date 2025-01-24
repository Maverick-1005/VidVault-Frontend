import axios from 'axios'
import React, { useRef , useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../../constant.js'

function CommentsHeader({ commentsCount=0, userAvatar , onCommentAdded }) {
      
    const params = useParams()
    const [comment, setComment] = useState("")
    const [isWriting, setIsWriting] = useState(false)
    const writeRef = useRef()

   
     const handleClickOutside = (event) => {
       if (writeRef.current && !writeRef.current.contains(event.target)) {
         setIsWriting(false);
       }
      
     };
   
     useEffect(() => {
       document.addEventListener("click", handleClickOutside, true);
       return () => {
         document.removeEventListener("click", handleClickOutside, true);
       };
     }, []);
    const videoId = params.videoId


    const handleSubmit = async (e) => {
        e.preventDefault()
       await axios.post(`${server}/comments/add-comment/${videoId}` , {
            text: comment
        } , {
            params: {
                videoId: videoId
            },
            withCredentials: true
        })
        .then((res) => {
          console.log("Comment added !")
          setComment('')
          if(onCommentAdded){
            onCommentAdded()
          }
        })
        .catch((err) => {
            console.log("Error while adding comment")
        })
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            handleSubmit(e);
        }
    };

   

    return (
        <div>
            <div className='flex mt-6'>
                <div className='ml-3'>
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
                <div className='w-full mr-8 border-0'>
                    <input 
                    type='text' 
                    value={comment} 
                    onChange={(e) => {
                      setComment(e.target.value)
                    }} 
                    onClick={() => {setIsWriting(true)}}
                    onKeyDown={handleKeyPress}
                    className='text-white bg-black ml-5 border-0  w-full' placeholder='Add a comment....'/>
                </div>
                 </div>

                 { isWriting ? <div ref={writeRef} className='flex justify-end'>
                 <div>
                <button className='ml-5 text-white' onClick={(e) => {
                    setComment('')
                }}>Cancel</button>
                </div>
                <div>
                <button type='submit' className='ml-5 mr-2 text-white' onClick={handleSubmit}>Comment</button>
                </div>

                </div> : <></>}
                 </form >


        </div>
    )
}

export default CommentsHeader
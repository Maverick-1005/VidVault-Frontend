import axios from 'axios'
import React, { useEffect , useState } from 'react'
import CommentCard from './CommentCard.jsx'

function Comments({videoId}) {

 const [comments, setComments] = useState([])
 const [user , setUser] = useState({})

 const fetchAllComments = async () => {
    await axios.get('http://localhost:8000/api/v1/comments/allcomments' , {
        params: {
            videoId: videoId,
            page: 1,
            limit: 20
        }
    })
    .then((res) => {
      //  setComments(res.data.data)
      //  console.log("HELLO " , comments)
      //  console.log("res =  " , res.data)

       const allComments = res.data.data ;

     const commentsWithUserData = allComments.map((item) => {
       return axios.get(`http://localhost:8000/api/v1/users/${item.owner}` , {
          withCredentials: true
        })
        .then((res) => { 
          return {...item , user: res.data.data}
        })
        .catch((err) => {
          console.log("Error while fetching user details of person who commented ", err)
          return {...item , user: null}
        })
       })

       Promise.all(commentsWithUserData)
       .then((commentsWithUsers) => {
         console.log('Comments with user data:', commentsWithUsers);
         setComments(commentsWithUsers);
       })
       .catch((err) => {
         console.error('Error resolving user data promises:', err);
       });

    })
    .catch((err) => {
        console.log("Error while fetching comments or user data ", err)
    })
 }

 useEffect(() => {
   fetchAllComments()
 }, [videoId])


 


  return (
    <div>
      {comments.map((item) => (
        <div key={item._id}>
          <CommentCard
            content={item.content}
            username={item.user.username}
            userAvatar={item.user.avatar}
            time={item.createdAt}
          />
        </div>
      ))}
    </div>
  
  )
}

export default Comments
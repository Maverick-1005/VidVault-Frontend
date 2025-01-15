import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard.jsx'
import CommentsHeader from './CommentsHeader.jsx'
import { useParams } from 'react-router-dom'
function Comments({ currUser }) {

  const [comments, setComments] = useState([])
  const [user, setUser] = useState({})

  const params = useParams()
  const videoId = params.videoId



  const fetchAllComments = async () => {
    await axios.get('http://localhost:8000/api/v1/comments/allcomments', {
      params: {
        videoId: videoId,
        page: 1,
        limit: 50
      }
    })
      .then((res) => {

        const allComments = res.data.data;
        const commentsWithUserData = allComments.map((item) => {
          return axios.get(`http://localhost:8000/api/v1/users/${item.owner}`, {
            withCredentials: true
          })
            .then((res) => {
              return { ...item, user: res.data.data }
            })
            .catch((err) => {
              console.log("Error while fetching user details of person who commented ", err)
              return { ...item, user: null }
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
  console.log("comments array ", comments)


  useEffect(() => {
    fetchAllComments()
  }, [videoId])

  const handleOnCommentsChange= () => {
    fetchAllComments()
  };



  return (
    <div className='m-2 max-w-5xl'>
      <CommentsHeader userAvatar={currUser.avatar} commentsCount={comments.length} onCommentAdded={handleOnCommentsChange} />
      <div>

        {comments.map((item) => (
          <div key={item._id}>
            <CommentCard
              cmt = {item}
              content={item.content}
              username={item.user.username}
              userAvatar={item.user.avatar}
              time={item.createdAt}
              currUser = {currUser}
              oncmmtChange={handleOnCommentsChange}
            />
          </div>
        ))}

      </div>
    </div>


  )
}

export default Comments
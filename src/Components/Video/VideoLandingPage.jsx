import React , {useState , useEffect}from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Header from '../Header.jsx'
import SideBar from '../SideBar.jsx'
import VideoPlayer from './VideoPlayer.jsx'
import VideoAlley from './VideoAlley.jsx'
import Comments from '../Comments/Comments.jsx'
function VideoLandingPage() {

      const [videoFile, setVideoFile] = useState({});
      const [user, setUser] = useState({});
      const [currUser , setCurrUser] = useState({});
  
      const params = useParams();
      const videoId = params.videoId;
  
      const videoDetails = () => {
          console.log("Video Id ANdar = ", videoId);
          axios.get(`http://localhost:8000/api/v1/video/v/${videoId}`, {
              withCredentials: true
          })
          .then((res) => {
              setVideoFile(res.data.data);
              // console.log("" ,res.data.data )
          })
          .catch((err) => {
              console.log("error while playing video" , err);
          });
      }
  
      useEffect(() => {
          videoDetails();
      }, [videoId]);
  
      const getVideoOwner = () => {
          axios.get(`http://localhost:8000/api/v1/users/${videoFile.owner}`, {
              withCredentials: true
          })
          .then((res) => {
              setUser(res.data.data);
              console.log("owner = ", res.data.data);
          })
          .catch((err) => {
              console.log("err while getVideoOwner ", err);
          });
      }
      useEffect(() => {
          console.log("useeff ke andar");
          if (videoFile.owner) getVideoOwner();
      }, [videoFile]);
  
      const getCurrUser = () => {
          axios.get(`http://localhost:8000/api/v1/users/current-user`, {
              withCredentials: true
          })
          .then((res) => {
              setCurrUser(res.data.data);
          })
          .catch((err) => {
              console.log("Error while fetching user details of person who commented ", err);
          });
      }
      useEffect(() => {
          getCurrUser();
      }, [videoId]);
  

  return (
    <>   
      <Header/>
      <div>
      <div className='grid grid-cols-1 lg:grid-cols-[auto,minmax(0,1fr),auto] gap-0'> 
        <SideBar myprop={true} />
        < VideoPlayer videoId={videoId} videoFile={videoFile} user={user} currUser={currUser} />
        <VideoAlley videoOwner={videoFile.owner} username = {user.username} videoId = {videoId}/>
      </div>
      <Comments currUser={currUser} />

      </div>
   
    </>
  )
}
// videoId = "677abe7e4a2768b7f83dbde3"

export default VideoLandingPage
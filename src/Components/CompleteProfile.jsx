import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PersonIcon from "@mui/icons-material/Person";

import { useSelector } from 'react-redux';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CompleteProfile = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
  });
  const [avatarPreview, setAvatarPreview] = useState("");


  // if already login
  const loginStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData);

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setAvatarPreview(previewURL);
    }
    setAvatar(file)
  };
  // console.log("yaha ak", loginStatus)
  if (loginStatus) {
    // console.log("login hai already ", userData)
    if (!avatarPreview) setAvatarPreview(userData.avatar);
    if (!credentials.fullName && !credentials.email) setCredentials({ ...credentials, fullName: userData.fullName, email: userData.email })
  }

  const navigate = useNavigate()

 
  const handleCoverImageChange = (e) => {
    e.preventDefault();
    setCoverImage(e.target.files[0])
  }

  const handleSubmit =  async(e) => {
    e.preventDefault();
    console.log('Signup attempted with:', credentials);

    const formData = new FormData();
    formData.append("username", credentials.username)
    formData.append("email", credentials.email)
    formData.append("password", credentials.password)
    formData.append("fullName", credentials.fullName)


    formData.append("avatar", avatar);


    console.log("here5")

    if (coverImage) {
      console.log("")
      formData.append("coverImage", coverImage);
    }

    if (!loginStatus) {
      axios.post("http://localhost:8000/api/v1/users/register", formData, {
        withCredentials: true
      })
        .then((res) => {
          console.log(res.data.message);
          navigate("/home")

        })
        .catch((err) => {
          console.log(err, "while registering from frontend")
        })
    }
    else {
      const formData2 = new FormData()
      formData2.append("username", credentials.username)
      formData2.append("password", credentials.password)
      formData2.append("fullName", credentials.fullName)
       console.log("formdata2 " , formData2)


     await axios.patch("http://localhost:8000/api/v1/users/update-account", formData2, {
        headers: {
          "Content-Type" : "application/json"
        },
        withCredentials: true
      })
        .then((res) => {
          console.log(res.data.message);
          // navigate("/home")
        })
        .catch((err) => {
          console.log(err, "while completing profile 1 from frontend")
        })

        if(avatar){
          formData2.append("avatar" , avatar)
         await axios.patch("http://localhost:8000/api/v1/users/avatar", formData2, {
            withCredentials: true
          })
            .then((res) => {
              console.log(res.data.message);
              // navigate("/home")
            })
            .catch((err) => {
              console.log(err, "while completing profile 2 from frontend")
            })
        }
        if(coverImage){
          formData2.append("coverImage" , coverImage)
          await axios.patch("http://localhost:8000/api/v1/users/coverImage", formData2, {
            withCredentials: true
          })
            .then((res) => {
              console.log(res.data.message);
              // navigate("/home")
            })
            .catch((err) => {
              console.log(err, "while completing profile 2 from frontend")
            })
        }

        await axios.post('http://localhost:8000/api/v1/users/change-password' , {
          oldPassword: "",
          newPassword: credentials.password
        } ,{
          withCredentials: true
        })
        .then((res) => {
          console.log(res.message)
          toast.success("Profile Setup Complete" , {
            position: "top-right"
          })

          setTimeout(() => {
            navigate('../home')
          } , 2000)

        })
        .catch((err) => {
          console.log(err)
          toast.error("Something went wrong while setting Password" , {
            position: "top-right"
          })
        })

      
    }

  };

  const responseGoogle = async (authResult) => {
    try {
      console.log("Obj", authResult)
      if (authResult) {
        console.log("Code", authResult.code)
        await axios.get(`http://localhost:8000/users/auth/google/?code=${authResult.code}`)
          .then((res) => {
            console.log("res", res)
          })
          .catch((err) => {
            console.log("err while signup with google ", err)
          })
      }
    } catch (error) {
      console.log("Error while requesting google code", error)
    }
  }
  const googleLogin = useGoogleLogin(
    {
      onSuccess: responseGoogle,
      onError: responseGoogle,
      flow: 'auth-code'
    }
  )

  return (
    <div className='bg-black flex justify-center'>
    <ToastContainer/>
      <div className="max-w-md w-full space-y-8 h-15 mt-10">
        {/* Logo and Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">VidVault</h1>
          <p className="text-gray-400">Complete Your Profile</p>
        </div>

        {/* Signup Form */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="flex justify-center">
              <div className="relative w-32 h-32 mt-10">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                    <PersonIcon style={{ fontSize: "2rem", color: "gray" }} />
                  </div>
                )}
                {/* Invisible File Input */}
                <input
                  type="file"
                  accept="image/*"
                  id="avatar-input"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {/* Camera Icon */}
                <label
                  htmlFor="avatar-input"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
                >
                  <AddAPhotoIcon />
                </label>
              </div>
            </div>



            <div className="">
              <label htmlFor="coverImage" className=" text-sm font-medium text-gray-300">Cover Image</label>
              <input
                id="coverImage"
                type="file"
                accept='image/*'
                className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleCoverImageChange}
              />
            </div>
            <div>
              <label htmlFor="FullName" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="FullName"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={credentials.fullName}
                onChange={(e) => setCredentials({ ...credentials, fullName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>



          </form>
        </div>


      </div>
    </div>
  );
};

export default CompleteProfile;
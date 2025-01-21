import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
  });
  const navigate = useNavigate()
  const [avatar , setAvatar] = useState(null);
  const [coverImage , setCoverImage] = useState(null);

  const handleAvatarChange = (e) => {

    e.preventDefault();

    console.log("avatar" ,e.target.files[0] )

    setAvatar(e.target.files[0])

  }
  const handleCoverImageChange = (e) => {

    e.preventDefault();

    console.log("coverImage" ,e.target.files[0] )
    setCoverImage(e.target.files[0])

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup attempted with:', credentials);
    
    const formData = new FormData();
    formData.append("username" , credentials.username)
    formData.append("email" , credentials.email)
    formData.append("password" , credentials.password)
    formData.append("fullName" , credentials.fullName)

    if(avatar) {
      formData.append("avatar" , avatar);
    }
    console.log("here5" )

    if(coverImage){
      formData.append("coverImage", coverImage);
    }
    axios.post("http://localhost:8000/api/v1/users/register" , formData , {
      withCredentials: true
    })
    .then((res) => {
      console.log(res.data.message);
      navigate("/home")

    })
    .catch((err) => {
      console.log(err , "while registering from frontend")
    } )
  };
  
  const responseGoogle = async (authResult) => {
    try {
      console.log("Obj" ,authResult)
      if(authResult){
        console.log("Code" , authResult.code)
        await axios.get(`http://localhost:8000/users/auth/google/?code=${authResult.code}`)
        .then((res) => {
          console.log("res", res)
        })
        .catch((err) => {
          console.log("err while signup with google " , err)
        })
      }
    } catch (error) {
      console.log("Error while requesting google code" , error)
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
      <div className="max-w-md w-full space-y-8 h-15 mt-10">
        {/* Logo and Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">VidVault</h1>
          <p className="text-gray-400">Create your Account</p>
        </div>

        {/* Signup Form */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="">
              <label htmlFor="avatar" className=" text-sm font-medium text-gray-300">Avatar</label>
              <input
                id="avatar"
                type="file"
                accept='image/*'
                required
                className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleAvatarChange}
              />
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
              Signup 
            </button>

            <div className="text-center">
              <p className="text-gray-400">OR</p>
            </div>

            <button
            onClick={googleLogin}
  type="button"
  className="w-full flex items-center justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white hover:text-gray-700 hover:bg-gray-100"
>
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path
      d="M21.805 10.023h-9.76v3.967h5.623c-.22 1.246-.89 2.298-1.86 2.995v2.496h3.006c1.759-1.615 2.78-4.007 2.78-6.707 0-.649-.058-1.28-.165-1.896z"
      fill="#4285F4"
    />
    <path
      d="M11.673 22c2.43 0 4.469-.806 5.959-2.187l-3.006-2.496c-.834.56-1.901.891-2.953.891-2.27 0-4.192-1.532-4.876-3.593h-3.059v2.25A9.998 9.998 0 0 0 11.673 22z"
      fill="#34A853"
    />
    <path
      d="M6.797 13.614a6.01 6.01 0 0 1 0-3.228v-2.25H3.738a9.996 9.996 0 0 0 0 7.728l3.059-2.25z"
      fill="#FBBC05"
    />
    <path
      d="M11.673 5.265c1.328 0 2.518.456 3.453 1.344l2.586-2.586C15.84 2.528 13.801 1.6 11.673 1.6a9.998 9.998 0 0 0-7.935 3.705L6.797 7.55c.684-2.061 2.606-3.593 4.876-3.593z"
      fill="#EA4335"
    />
  </svg>
  Signup with Google
</button>

            
          </form>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-400">Get the app.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="flex items-center">
              <img src="/api/placeholder/120/40" alt="Download on App Store" className="h-10" />
            </a>
            <a href="#" className="flex items-center">
              <img src="/api/placeholder/120/40" alt="Get it on Google Play" className="h-10" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
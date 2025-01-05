import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-700"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Log in with Facebook
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
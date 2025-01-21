import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { logout } from '../Redux/authSlice';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams()
 
  
  const [searchedText, setSearchedText] = useState("")
  useEffect(() => {
    if(searchParams.get('q')){
      const entext = searchParams.get('q')
      console.log("entext" , entext)
      const dectext = entext.replace(/\+/g, " ");
      setSearchedText(dectext)
    }
  }, [searchParams.get('q')])
  
  

  const [avatar, setAvatar] = useState("")
  const [loggedInUser, setLoggedInUser] = useState({})
  const currentUser = () => {
    axios.get('http://localhost:8000/api/v1/users/current-user', {
      withCredentials: true
    })
      .then((res) => {
        const user = res.data.data;
        setLoggedInUser(user)
        setAvatar(user.avatar)
      })
      .catch((err) => {
         console.log("ERROR WHILE SHOWING AVATAR ON HOME ", err);
      })
  }

  useEffect(() => {
    currentUser()
  }, [])

  const handleOnClickCreate = (e) => {
    navigate('/studio');
  }
 
  const handleLogout = (e) => { 
    e.preventDefault();
    axios.get('http://localhost:8000/api/v1/users/logout' , {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(logout());
      toast.success('Logged Out Successfully', {
                     position: 'top-right', // Use 'top-right' instead of toast.POSITION.TOP_RIGHT
                   });
      setTimeout(()=> {
        navigate('/');
      } , 1000)
      
    })
    .catch((err) => {
      console.log("Error occoured while logout " , err)
    })
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    const encodedText = searchedText.replace(/ /g, "+");
    navigate(`../search/results/?q=${encodedText}`)

  }

  


  return (
    <>
    <ToastContainer/>

    <header className="bg-black px-4 py-2 flex items-center justify-between ">
      {/* Left Section */}
      <div className="flex items-center">
        {/* <button onClick={handleClick} className='text-white'>  ===</button> */}
        <button 
        onClick = {(e) => {
          navigate('/home')
        }}
        className="text-white text-xl ml-10 font-bold">
          VidVault
          </button>
      </div>

      {/* Center Section (Search Bar) */}
      <div className="flex items-center flex-grow max-w-lg">
        <form onSubmit={handleSearch}>
          <div className='flex'>
          <input
          type="text"
          placeholder="Search"
          value={searchedText}
          onChange={(e) => {
            setSearchedText(e.target.value)
          }}
          className="w-96 min-w-40 px-4 py-2 bg-gray-800 text-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-gray-700"
        />
        <button type='submit' className="bg-gray-700 w-5 sm:10 md:w-20 px-4 py-2 rounded-r-full text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
            />
          </svg>
        </button>
          </div>
       
        </form >
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <button onClick={handleOnClickCreate} className="bg-gray-700 min-w-20 p-0 text-white md:px-4 md:py-2 sm:p-1 rounded-md hover:bg-gray-600">
          + Create
        </button>
        <button onClick={handleLogout} className="bg-gray-700 min-w-20  text-white p-0 md:p-4 md:py-2 rounded-md hover:bg-gray-600">
          LogOut
        </button>
        <button className="text-white relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25M8.25 9V5.25M9 16.5H15M21 12c0 7.732-6.268 14-14 14S-7 19.732-7 12 1.268-2 9-2s14 6.268 14 14z"
            />
          </svg>
          <span className="absolute top-0 right-0 bg-red-600 text-xs text-white rounded-full px-1">4</span>
        </button>
        <button className="w-10 h-10 bg-gray-600 rounded-full overflow-hidden">
        <img
            src={avatar}
            alt="Image"
            className="w-10 h-10 rounded-full object-cover"
          />
        </button>
      </div>
    </header>
    </>
  );
};

export default Header;
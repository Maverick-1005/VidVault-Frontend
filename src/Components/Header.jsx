import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { logout } from '../Redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { server } from '../constant.js';
import { SearchIcon } from 'lucide-react';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MicIcon from '@mui/icons-material/Mic';
import { Menu } from '@mui/material';
import { MenuOpenOutlined, MenuOutlined } from '@mui/icons-material';
import { toggleSideBar } from '../Redux/sideBarSlice.js';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams()


  const [searchedText, setSearchedText] = useState("")
  useEffect(() => {
    if (searchParams.get('q')) {
      const entext = searchParams.get('q')
      console.log("entext", entext)
      const dectext = entext.replace(/\+/g, " ");
      setSearchedText(dectext)
    }
  }, [searchParams.get('q')])



  const [avatar, setAvatar] = useState("")
  const [loggedInUser, setLoggedInUser] = useState({})
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const currentUser = () => {
    axios.get(`${server}/users/current-user`, {
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
    axios.get(`${server}/users/logout`, {
      withCredentials: true,
    })
      .then((res) => {
        dispatch(logout());
        toast.success('Logged Out Successfully', {
          position: 'top-right', // Use 'top-right' instead of toast.POSITION.TOP_RIGHT
        });
        setTimeout(() => {
          navigate('/');
        }, 1000)

      })
      .catch((err) => {
        console.log("Error occoured while logout ", err)
      })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    let x = searchedText.trim()
    if (x != "") {
      const encodedText = searchedText.replace(/ /g, "+");
      navigate(`../search/results/?q=${encodedText}`)
    }


  }

  // Load sidebar state from sessionStorage (default to true if not set)
  const [isOpen, setIsOpen] = useState(
    () => JSON.parse(sessionStorage.getItem("sidebarOpen")) ?? true
  );

  // Update sessionStorage whenever isOpen changes
  useEffect(() => {
    sessionStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
    dispatch(toggleSideBar())
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }


  return (
    <>

      <ToastContainer />
    <button></button>
      
      <header className={`bg-black  relative  py-2 w-screen overflow-hidden flex items-center justify-between ${isSearchOpen ?'' :''}`}>

      {
       
       isSearchOpen ? 
       <div className="flex w-screen max-w-96 items-center bg-gray-800 ml-0 absolute z-20  sm:hidden">
         <form onSubmit={handleSearch}>
           <div className='flex'>
             <input
               type="text"
               placeholder="Search"
               value={searchedText}
               onChange={(e) => {
                 setSearchedText(e.target.value)
               }}
               className="ml-0 w-96 min-w-40 sm:block px-4 py-2 bg-gray-400 text-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-gray-700"
             />
             <button type='submit' className="sm:bg-gray-700 ml-2  sm:w-10 pl-1   sm:rounded-r-full text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700">
               <SearchIcon />
             </button>
             <button type='submit' className="sm:bg-gray-700 ml-2 sm:w-10 pl-1   sm:rounded-r-full text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700">
               <MicIcon />
             </button>
           </div>

         </form >
       </div>
       : 
       <></>

     }

        {/* Left Section */}
        <div className="flex items-center">
               
          <button
            onClick={toggleSidebar}
            className="text-white text-xl ml-5 font-bold">
            <MenuOutlined/>
          </button>
          <button
            onClick={(e) => {
              navigate('/home')
            }}
            className="text-white text-xl ml-20 font-bold">
            VidVault
          </button>
        </div>

        {/* Center Section (Search Bar) */}
        <div className={`flex items-center  max-w-lg ${isSearchOpen ? 'hidden' : ''}`}>
          <form onSubmit={handleSearch}>
            <div className='flex'>
              <input
                type="text"
                placeholder="Search"
                value={searchedText}
                onChange={(e) => {
                  setSearchedText(e.target.value)
                }}
                className=" w-96 min-w-40 hidden sm:block px-4 py-2 bg-gray-800 text-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
              <button onClick={(e) => {
                setIsSearchOpen(true)
              }} type='submit' className="sm:bg-gray-700  sm:w-10 pl-1   sm:rounded-r-full text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700">
                <SearchIcon />
              </button>
            </div>

          </form >
        </div>

        {/* Right Section */}
        <div className={`flex items-center space-x-4 ${isSearchOpen ? 'hidden' : ''}`}>
          <button onClick={handleOnClickCreate} className="bg-gray-700 min-w-5 p-1 text-white md:px-4 md:py-2 sm:p-1 rounded-full sm:rounded-md hover:bg-gray-600">
            {<div className='flex '>
              <span className=''><AddIcon /></span><span className='hidden sm:block ml-2'>Create</span>
            </div>
            }
          </button>
          <button onClick={handleLogout} className="bg-gray-700 min-w-20  text-white p-0 md:p-4 md:py-2 rounded-md hover:bg-gray-600">
            LogOut
          </button>
          <button className="text-white relative hidden sm:block">

            <NotificationsIcon />
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
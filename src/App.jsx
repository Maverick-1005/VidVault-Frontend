import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import { logout , login } from "./Redux/authSlice.js";
import { useDispatch ,useSelector} from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { server } from './constant.js'
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checklogin = async()=> {
        try {
          const response =  await axios.get(`${server}/users/current-user`, {
            withCredentials: true, 
          }) ;
          if (response){
           console.log("login wala data " , response.data.data)
            dispatch(login(response.data.data));
           
          }else{
            console.log("not working");
            dispatch(logout());
          }
        } catch (error) {
          console.log("yahn",error);
          navigate('/')
          dispatch(logout());
        }
      }
      useEffect(() => {
        checklogin();
      }, [])
      localStorage.setItem("toggleSideBar" , "true")
  return (
    <GoogleOAuthProvider clientId= "416500417090-l3pidjc80j3cbrrbh4oqbi8s7fr9i587.apps.googleusercontent.com">
       <Outlet/>
    </GoogleOAuthProvider>
    
  )
}

export default App

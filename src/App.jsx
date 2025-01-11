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
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checklogin = async()=> {
        try {
          const response =  await axios.get('http://localhost:8000/api/v1/users/current-user', {
            withCredentials: true, 
          }) ;
          if (response){
            // console.log("First PAge Loding",response);
            // console.log("Doing");
            dispatch(login());
          }else{
            console.log("not working");
            dispatch(logout());
          }
        } catch (error) {
          console.log(error);
          dispatch(logout());
        }
      }
      useEffect(() => {
        checklogin();
      }, [])
      localStorage.setItem("toggleSideBar" , "true")
  return (
     <Outlet/>
  )
}

export default App

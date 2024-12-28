import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './Components/Login.jsx'
import './index.css'
import App from './App.jsx'
import LandingPage from './Components/LandingPage.jsx'
import Signup from './Components/Signup.jsx'
import Message from './Components/Message.jsx'
import { AuthProvider } from './Context/AuthContext.js'
import Home from './Components/Home.jsx'
import Studio from './Components/Studio.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage/>,
   
  },
  {
      path: "/signup",
      element: <Signup/>
  },
  {
    path:"/studio",
    element: <Studio/>
  },
  {
    path: "/home",
    element: <Home/>
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)

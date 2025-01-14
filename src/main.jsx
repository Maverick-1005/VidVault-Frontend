import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './Components/LandingPage/Login.jsx'
import './index.css'
import App from './App.jsx'
import LandingPage from './Components/LandingPage/LandingPage.jsx'
import Signup from './Components/Signup/Signup.jsx'
import Home from './Components/Home/Home.jsx'
import Studio from './Components/Studio/Studio.jsx'
import VideoLandingPage from './Components/Video/VideoLandingPage.jsx'
import { store } from './Redux/store.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: "/",
        element: <LandingPage/>
      },
      {
        path: "/logout",
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
    {
      path: "/videos/:videoId",
      element: <VideoLandingPage/>
    }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
        </Provider>
  // </React.StrictMode>,
)

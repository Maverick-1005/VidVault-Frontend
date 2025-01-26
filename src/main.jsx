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
import ChannelLandingPage from './Components/Channel/ChannelLandingPage.jsx'
import ChannelVideoGrid from './Components/Channel/ChannelVideoGrid.jsx'
import ChannelPlaylists from './Components/Channel/ChannelPlaylists.jsx'
import ChannelCommunity from './Components/Channel/ChannelCommunity.jsx'
import Search from './Components/Search/Search.jsx'
import CompleteProfile from './Components/CompleteProfile.jsx'
import VideoGrid from './Components/Video/VideoGrid.jsx'
import SubscribedChannels from './Components/Subscription/SubscribedChannels.jsx'
import NotAvailable from './Components/NotAvailable.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/logout",
        element: <LandingPage />,
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/profile-setup",
        element: <CompleteProfile />
      },
      {
        path: "/studio",
        element: <Studio />
      },
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            path: "",
            element: <VideoGrid />
          },
          {
            path: "feed/subscriptions",
            element: <SubscribedChannels />
          },

        ]
      },

      {
        path: "/videos/:username/:videoId",
        element: <VideoLandingPage />
      },
      {
        path: "/channel/:username/:userId/",
        element: <ChannelLandingPage />,
        children: [
          {
            path: "videos",
            element: <ChannelVideoGrid />
          },
          {
            path: "playlists",
            element: <ChannelPlaylists />
          },
          {
            path: "community",
            element: <ChannelCommunity />
          }
        ]
      },
      {
        path: "/search/results",
        element: <Search />
      },
      {
        path: "*",
        element: <NotAvailable/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  //  </React.StrictMode>,
)

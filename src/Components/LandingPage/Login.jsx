import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {login } from '../../Redux/authSlice.js'
import { store  } from '../../Redux/store.js';
import { useGoogleLogin } from '@react-oauth/google';
import { server } from '../../constant.js';
import GoogleIcon from '@mui/icons-material/Google';
import { CircularProgress, LinearProgress } from '@mui/material';
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
console.log("nav1")
const [open, setOpen] = useState(false);
  const [message , setMessage] = useState('');

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email: ''
  });
  
  const [isLoading, setIsLoading] = useState(false)
      // const {status} = useSelector((state) => state.auth);


  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();
    axios.post(`${server}/users/login`, credentials, {
      withCredentials: true, // This should be here
    })
    
    .then((res) => {
       setOpen(true)
       setIsLoading(false)
       dispatch(login(res.data.data))
       toast.success('Logged in Successfully', {
        position: 'top-right', 
      });
      setTimeout(() => {
        navigate('/home');
      }, 2000)
      //  console.log("Login status = ", status)
    })
    .catch((err) => {
       console.log(err);
       setIsLoading(false)
       toast.error('LogIn failed', {
        position: 'top-right', 
      });
       setOpen(true)
    })
    console.log('Login attempted with:',credentials);
  };

  const responseGoogle = async (authResult) => {
    setIsLoading(true)
    try {
      console.log("Obj" ,authResult)
      if(authResult){
        console.log("Code" , authResult.code)
        await axios.get(`${server}/users/auth/google/?code=${authResult.code}` , {
          withCredentials: true
        })
        .then((res) => {
          console.log("res via login", res)
          dispatch(login(res.data?.data))
          toast.success('Logged in Successfully', {
                    position: 'top-right', 
                  });
                  setTimeout(() => {
                    if(res.data.data?.accessToken){
                      navigate('../home')
                    }
                    else{
                      
                      setIsLoading(false)
                      console.log("pro")
                      navigate('../profile-setup')
                    }
                  }, 2000)

          
        })
        .catch((err) => {
          setIsLoading(false)
          toast.error('Google LogIn failed', {
            position: 'top-right', 
          });
         
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
      flow: 'auth-code',
    }
  )
  return (
    <>
       <ToastContainer />
      <div className="max-w-md min-w-96 w-full space-y-8">

        {isLoading ? <><LinearProgress/></>: <></>}
        {/* Logo and Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">VidVault</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                 username or email address
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
              Log in
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
  Continue with Google
</button>

            <div className="text-center">
              <a href="#" className="text-sm text-blue-500 hover:text-blue-400">
                Forgotten your password?
              </a>
            </div>
          </form>

       
        </div>

        {/* Sign Up Section */}
        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <a href="signup" className="text-blue-500 hover:text-blue-400">
              Sign up
            </a>
          </p>
        </div>

       
      </div>
    </>
  );
};

export default Login;
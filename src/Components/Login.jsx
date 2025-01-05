import axios from 'axios';
import React, { useState } from 'react';
import Message from './Message';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useAuth from '../Context/AuthContext';


const Login = () => {
  const navigate = useNavigate()
console.log("nav1")
const [open, setOpen] = useState(false);
  const [message , setMessage] = useState('');

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/v1/users/login', credentials, {
      withCredentials: true, // This should be here
    })
    
    .then((res) => {
      // const authToken = res.cookie.accessToken
      // const refreshToken = res.cookie.refreshToken
      // localStorage.setItem('authToken', authToken);
      // console.log("auth token = " , authToken)
      // localStorage.setItem('refreshToken', refreshToken);
       setOpen(true)
       navigate('/home');
    })
    .catch((err) => {
       console.log(err);
       setMessage(err.message)
       setOpen(true)
    })
    console.log('Login attempted with:',credentials);
  };

  return (
    <>
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">VidVault</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
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
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-700"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Log in with Facebook
            </button>

            <div className="text-center">
              <a href="#" className="text-sm text-blue-500 hover:text-blue-400">
                Forgotten your password?
              </a>
            </div>
          </form>

          <Snackbar className=" bg-white"open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert className="text-white" severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
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

        {/* App Download Section */}
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
    </>
  );
};

export default Login;
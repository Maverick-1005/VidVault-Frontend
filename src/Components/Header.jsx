import React from 'react';

const Header = () => {

  const Logout = ()=>{
     
  }
  return (
    <header className="bg-black px-4 py-2 flex items-center justify-between ">
      {/* Left Section */}
      <div className="flex items-center">
        <div className="text-white text-xl font-bold">VidVault</div>
      </div>

      {/* Center Section (Search Bar) */}
      <div className="flex items-center flex-grow max-w-lg">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-gray-700"
        />
        <button className="bg-gray-700 px-4 py-2 rounded-r-full text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700">
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

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
          + Create
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
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
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;

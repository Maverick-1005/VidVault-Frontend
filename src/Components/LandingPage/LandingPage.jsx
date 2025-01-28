import axios from "axios";
import Login from "./Login.jsx";
import { Outlet } from "react-router-dom";
import { logout , login } from "../../Redux/authSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../constant.js";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  axios.get(`${server}/users/current-user`, {
    withCredentials: true, 
  }) 
  .then((res) => {
     dispatch(login())
     navigate('/home');
  })
  .catch((err) => {
    dispatch(logout());
  })
  
  
    return (
        <div className=" w-screen p-0rem m-0 bg-black flex items-center justify-center">

            <div className=" grid grid-cols-2 gap-72">



            <div className="h-screen w-screen p-0 m-0  bg-black hidden sm:flex items-center justify-center">

  <div className="grid grid-cols-2 gap-72">


    <div className="flex justify-center items-center h-screen bg-black">


      <div className="text-center text-white font-bold text-[6rem] leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {["WELCOME", "TO", "VIDVAULT"].map((word, wordIndex) => (
          <div key={wordIndex} className="mb-10">


            {Array.from(word).map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className="inline-block opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${(wordIndex * 1) + letterIndex * 0.2}s`,
                  textShadow: "0px 4px 10px rgba(255, 255, 255, 0.8)",
                }}
              >
                {letter}
              </span>
            ))}

          </div>
        ))}
      </div>


    </div>


  </div>
</div>


                <div className="mt-16 ml-5 sm:mt-16 sm:mr-16"><Login /></div>

            </div>

        </div>)
}
export default LandingPage;
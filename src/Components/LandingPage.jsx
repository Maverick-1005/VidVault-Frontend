import Login from "./Login";
import { Outlet } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="h-screen w-screen p-0rem m-0 bg-black flex items-center justify-center">
            <div className=" grid grid-cols-2 gap-72">
                <div > 
                    <h1 className="text-white font-mono font-bold text-10rem mt-64">Welcome to VidVault...</h1>
                </div>
                <div><Login/></div>
                
            </div>
       
    </div>    )
}
export default LandingPage;
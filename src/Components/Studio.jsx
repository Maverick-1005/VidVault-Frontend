import React , {useState} from 'react'
import axios from 'axios';



function Studio() {

    const [videoData, setVideoData] = useState({
        title: '',
        description: '',
        isPublic: true
    });

    const [videoFile , setVideoFile] = useState(null)
    const [thumbnail , setThumbnail] = useState(null)

    const handleVideoChange= (e) => {
        e.preventDefault()
      setVideoFile(e.target.files[0])
    }
    const handlethumbnailChange= (e) => {
        e.preventDefault()
      setThumbnail(e.target.files[0])
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Video details:', videoData);
        
        const formData = new FormData();
        formData.append("title" , videoData.title)
        formData.append("description" , videoData.description)
        formData.append("isPublic" , videoData.isPublic)
         
        formData.append("videoFile" , videoFile)
        formData.append("thumbnail" , thumbnail)


        axios.post("http://localhost:8000/api/v1/video/video-upload" , formData , {
            withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.message);
        //   navigate("/home")
    
        })
        .catch((err) => {
          console.log(err , "while uploading video from frontend")
        } )
      };
    
    
    return (
        <div className='bg-black flex justify-center'>
            <div className="max-w-md w-full space-y-8 h-15 mt-10">
                {/* Logo and Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">VidVault</h1>
                    <p className="text-gray-400">Create your Account</p>
                </div>

                {/* Signup Form */}
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="">
                            <label htmlFor="videoFile" className=" text-sm font-medium text-gray-300">Video</label>
                            <input
                                id="videoFile"
                                type="file"
                                accept='video/*'
                                required
                                className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={handleVideoChange}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="thumbnail" className=" text-sm font-medium text-gray-300">thumbnail</label>
                            <input
                                id="thumbnail"
                                type="file"
                                required
                                accept='image/*'
                                className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={handlethumbnailChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={videoData.fullName}
                                onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                                Description
                            </label>
                            <input
                                id="description"
                                type="text"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={videoData.username}
                                onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="isPublicYes" className="block text-sm font-medium text-gray-300">
                                Public? (yes or no)
                            </label>
                            <div className="mt-2 flex space-x-4">
                                <div>
                                    <input
                                        id="isPublicYes"
                                        name="isPublic"
                                        type="radio"
                                        required
                                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value="yes"
                                        checked={videoData.isPublic === true}
                                        onChange={() => setVideoData({ ...videoData, isPublic: true })}
                                    />
                                    <label htmlFor="isPublicYes" className="ml-2 text-sm text-gray-300">
                                        Yes
                                    </label>
                                </div>
                                <div>
                                    <input
                                        id="isPublicNo"
                                        name="isPublic"
                                        type="radio"
                                        required
                                        className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value="no"
                                        checked={videoData.isPublic === false}
                                        onChange={() => setVideoData({ ...videoData, isPublic: false })}
                                    />
                                    <label htmlFor="isPublicNo" className="ml-2 text-sm text-gray-300">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Upload Video
                        </button>

                        <div className="text-center">
                            <p className="text-gray-400">OR</p>
                        </div>

                        {/* <button
                            type="button"
                            className="w-full flex items-center justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-700"
                        >
                            <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Log in with Facebook
                        </button> */}


                    </form>
                </div>

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
        </div>

    )
}

export default Studio
import React , {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Studio() {
    const navigate = useNavigate()
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
          navigate("/home")
    
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
                    <p className="text-gray-400">UPLOAD VIDEO</p>
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

                    </form>
                </div>

            </div>
        </div>

    )
}

export default Studio
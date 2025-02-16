import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { useNavigate } from 'react-router-dom';

const PlaylistsCard = ({playlistId , thumbnail , videosCount , title }) => {

  const navigate = useNavigate()
  return (
    <div onClick={(e) => {
      navigate(`../../../home/playlist/${playlistId}`)

    }} className="relative w-80 rounded-xl shadow-lg overflow-hidden cursor-pointer group">
      {/* Thumbnail Image */}
      <img
        src={thumbnail}
        alt="Playlist Thumbnail"
        className="w-full h-48 object-cover"
      />

      {/* Playlist Details */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-300">View full playlist</p>
      </div>

      {/* Video Count Badge */}
      <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
        <PlaylistPlayIcon className="w-4 h-4" />
        <span>{videosCount} videos</span> 
      </div>
    </div>
  );
};

export default PlaylistsCard;

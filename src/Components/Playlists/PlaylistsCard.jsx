import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';

const PlaylistsCard = () => {
  return (
    <div className="relative w-80 rounded-xl shadow-lg overflow-hidden cursor-pointer group">
      {/* Thumbnail Image */}
      <img
        src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" 
        alt="Playlist Thumbnail"
        className="w-full h-48 object-cover"
      />

      {/* Playlist Details */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white">
        <h3 className="text-lg font-semibold">Chai aur New Tech | Raw</h3>
        <p className="text-sm text-gray-300">View full playlist</p>
      </div>

      {/* Video Count Badge */}
      <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
        <PlaylistPlayIcon className="w-4 h-4" />
        <span>4 videos</span> 
      </div>
    </div>
  );
};

export default PlaylistsCard;

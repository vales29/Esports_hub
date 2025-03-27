const VideoPlayer = ({ video }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <iframe
        className="w-full h-56 rounded-md"
        src={video.url}
        title={video.title}
        allowFullScreen
        />
        <h3 className="text-xl font-semibold mt-3">{video.title}</h3>
        <p className="text-gray-400 text-sm">{new Date(video.date).toLocaleDateString()}</p>
        </div>
    );
};

export default VideoPlayer;

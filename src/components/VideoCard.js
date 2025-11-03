import React from "react";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div
      className="w-96 m-3 rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 bg-gray-900 text-white border-b-4 hover:shadow-red-600 shadow-md
     border-red-600 z-10"
    >
      <div className="relative">
        <img
          className="w-full h-52 object-cover"
          src={thumbnails?.high?.url}
          alt={title}
        />
        <div className="absolute bottom-0 right-0 bg-red-600 text-white text-xs px-2 py-1 m-1 rounded">
          {new Date(snippet?.publishedAt).toLocaleDateString()}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
        <p className="text-gray-400 text-sm mt-2">{channelTitle}</p>
        <div className="flex items-center mt-3">
          <span className="text-gray-300 text-sm">
            {statistics?.viewCount
              ? `${parseInt(statistics.viewCount).toLocaleString()} views`
              : "No views"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

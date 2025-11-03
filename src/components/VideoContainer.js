// src/components/VideoContainer.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";

const VideoContainer = () => {
  const dispatch = useDispatch();
  const {
    videos = [],
    loading,
    error,
    currentSearchQuery,
  } = useSelector((store) => store.video);

  useEffect(() => {
    console.log("VideoContainer - current videos state:", videos);
    console.log("VideoContainer - loading state:", loading);
    console.log("VideoContainer - error state:", error);
    console.log("VideoContainer - currentSearchQuery:", currentSearchQuery);
  }, [videos, loading, error, currentSearchQuery]);


  useEffect(() => {
    const getPopularVideos = async () => {
      console.log("Attempting to fetch popular videos...");
      try {
        const data = await fetch(YOUTUBE_VIDEOS_API);
        
        if (!data.ok) {
          const errorText = `HTTP error fetching popular videos! Status: ${data.status}`;
          console.error(errorText);
          dispatch({
            type: "video/fetchVideos/rejected",
            payload: errorText,
          });
          return;
        }
        
        const json = await data.json();
        console.log("Fetched Popular Videos JSON:", json);

        if (json.items) {
          console.log("Fetched Popular Videos (items):", json.items);
          dispatch({ type: "video/fetchVideos/fulfilled", payload: json.items });
        } else {
          console.warn("Popular videos API response did not contain 'items'. Full response:", json);
          dispatch({
            type: "video/fetchVideos/rejected",
            payload: "Popular videos response missing 'items' array.",
          });
        }
      } catch (err) {
        console.error("Error fetching popular videos (catch block):", err);
        dispatch({
          type: "video/fetchVideos/rejected",
          payload: err.message || "An unknown error occurred during popular video fetch.",
        });
      }
    };
    if (!currentSearchQuery && videos.length === 0 && !loading && !error) {
      getPopularVideos();
    }
  }, [dispatch, currentSearchQuery, videos.length, loading, error]);
  return (
    <div className="flex flex-wrap justify-center mt-28">
      {videos.length > 0 ? (
        videos.map((video) => (
          <Link
            key={video.id?.videoId || video.id}
            to={"/watch?v=" + (video.id?.videoId || video.id)}
          >
            <VideoCard info={video} />
          </Link>
        ))
      ) : (
        <p className="text-gray-400 text-xl">Loading videos or no results...</p>
      )}
    </div>
  );
};

export default VideoContainer;


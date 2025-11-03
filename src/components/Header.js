import React, { useEffect, useState } from "react";
import {
  LOGO_URL,
  YOUTUBE_SEARCH_API, // For suggestions
} from "../utils/constants";
import { SEARCH_URL } from "../utils/constants";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "../utils/searchSlice";
import { fetchVideos } from "../utils/videoSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, searchCache]);

  const getSearchSuggestions = () => {
    const callbackName = `jsonpCallback_${Date.now()}`;
    window[callbackName] = (data) => {
      console.log("Header: JSONP Callback Data:", data);
      let fetchedSuggestions = [];

      if (Array.isArray(data) && Array.isArray(data[1])) {
        fetchedSuggestions = data[1].map((item) => item[0]);
      } else {
        console.warn(
          "Header: Unexpected suggestion API response format from JSONP callback:",
          data
        );
      }
      setSuggestions(fetchedSuggestions);
      dispatch(
        cacheResults({
          [searchQuery]: fetchedSuggestions,
        })
      );
      delete window[callbackName];
      script.remove();
    };

    const fetchUrl = `${YOUTUBE_SEARCH_API}&q=${searchQuery}&callback=${callbackName}`;
    console.log("Header: Fetching suggestions via JSONP URL:", fetchUrl);

    const script = document.createElement("script");
    script.src = fetchUrl;
    script.async = true;
    script.onerror = (e) => {
      console.error("Header: JSONP script loading error:", e);
      setSuggestions([]);
      delete window[callbackName];
      script.remove();
    };
    document.body.appendChild(script);
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleSearch = (term) => {
    console.log("Performing actual video search for:", term);
    setSearchQuery(term); // Update search bar with selected suggestion
    setShowSuggestions(false); // Hide suggestions after search
    dispatch(fetchVideos(term)); // Dispatch the thunk to fetch actual videos
  };

  return (
    <div className="fixed w-full h-24 flex items-center justify-between bg-gray-950 mx-1 border-b-2 rounded-b-3xl border-red-600 p-2 z-50">
      <div className="flex items-center">
        <button className="z-50 pl-4 pb-2" onClick={toggleMenuHandler}>
          <div
            className="w-6 h-0.5 bg-red-600 my-1 transition-transform duration-300 transform"
            style={{
              transform: isMenuOpen
                ? "rotate(45deg) translate(4.5px, 4.5px)"
                : "none",
            }}
          ></div>
          <div
            className="w-6 h-0.5 bg-red-600 my-1 transition-opacity duration-300"
            style={{ opacity: isMenuOpen ? "0" : "1" }}
          ></div>
          <div
            className="w-6 h-0.5 bg-red-600 my-1 transition-transform duration-300 transform"
            style={{
              transform: isMenuOpen
                ? "rotate(-45deg) translate(4.5px, -4.5px)"
                : "none",
            }}
          ></div>
        </button>

        <h1 className="flex items-center text-3xl font-bold text-red-600 font-grenze cursor-pointer p-2">
          <img className="w-10 h-10 mr-2" src={LOGO_URL} alt="Logo" />
        </h1>
      </div>
      <div className="flex-grow flex justify-center mx-4">
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="flex w-full">
            <input
              className="rounded-l-full w-full border-2 bg-slate-900 border-gray-950 focus:outline-none enabled:border-l-red-600 enabled:border-y-red-600 pl-3 py-1 text-white "
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            />
            <button
              className="rounded-r-full border-red-600 py-1 bg-red-600 w-7 hover:w-8 duration-200"
              onClick={() => handleSearch(searchQuery)}
            >
              <img src={SEARCH_URL} alt="Search" />
            </button>
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div className="fixed z-50 w-1/3 mr-5 mt-8">
              <ul className="w-full bg-gray-950 text-white border border-red-600 rounded-2xl mt-2">
                {suggestions.map((s) => (
                  <li
                    key={s}
                    className="px-4 py-2 hover:bg-gray-900 hover:px-5 duration-200 rounded-2xl cursor-pointer"
                    onMouseDown={() => handleSearch(s)}
                  >
                    ⌕ {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <button className="rounded-full border-2 border-red-600 text-center px-4 py-1 hover:px-6 ease-in duration-200 text-white">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Header;

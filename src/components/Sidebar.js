import React from "react";
import { HISTORY_URL, HOME_URL, TRENDING_URL } from "../utils/constants";
import { SETTINGS_URL, PROFILE_URL, SUBS_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white shadow-x">
      <div className="flex flex-1">
        <div
          className={`fixed w-20 bg-gray-950 p-4 rounded-r-3xl rounded-l-3xl transform transition-transform duration-300 overflow-y-auto z-50 border-r-2 border-t-2 border-red-600 mt-16 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ height: '80vh' }}
        >
          <nav className="flex flex-col items-center">
            <ul className="flex flex-col justify-start items-center h-auto space-y-5 overflow-hidden">
              <li className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition duration-200 ease-in-out">
                <div
                  className="cursor-pointer"
                  onClick={() => console.log("Navigating to Home (simulated)")}
                >
                  <Link to="/">
                    <img
                      src={HOME_URL}
                      alt="Home"
                      className="w-6 h-6 object-contain hover:scale-110 transition duration-200 ease-in-out"
                    />
                  </Link>
                </div>
              </li>
              <li className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition duration-200 ease-in-out">
                <img
                  className="w-6 h-6 object-contain hover:scale-110 transition duration-200 ease-in-out"
                  src={SUBS_URL}
                  alt="Subscriptions"
                />
              </li>
              <li className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition duration-200 ease-in-out">
                <img
                  className="w-6 h-6 object-contain hover:scale-110 transition duration-200 ease-in-out"
                  src={SETTINGS_URL}
                  alt="Settings"
                />
              </li>
              <li className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition duration-200 ease-in-out">
                <img
                  className="w-6 h-6 object-contain hover:scale-110 transition duration-200 ease-in-out"
                  src={PROFILE_URL}
                  alt="Profile"
                />
              </li>
              <li className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition duration-200 ease-in-out">
                <img
                  className="w-7 h-7 object-contain hover:scale-110 transition duration-200 ease-in-out"
                  src={HISTORY_URL}
                  alt="History"
                />
              </li>

              <div className="border-b border-gray-700 w-8 my-3"></div>

              <li className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-2">
                Explore
              </li>

              <li className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition duration-200 ease-in-out">
                <img
                  className="w-6 h-6 object-contain hover:scale-110 transition duration-200 ease-in-out"
                  src={TRENDING_URL}
                  alt="Trending"
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


// HEADER
export const LOGO_URL =
  "https://img.icons8.com/?size=100&id=3fSWweGYBvrq&format=png&color=e7000b";
export const USER_ICON =
  "https://images.icon-icons.com/3868/PNG/512/profile_circle_icon_242774.png";

// SIDEBAR
export const HOME_URL =
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/home-10179590-8229219.png?f=webp&w=512";
export const SETTINGS_URL =
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/repair-51-522295.png?f=webp&w=512";
export const PROFILE_URL =
  "https://cdn.iconscout.com/icon/premium/png-256-thumb/account-8453118-6904488.png?f=webp&w=256";
export const SEARCH_URL =
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/zoom-lens-8283543-6813662.png?f=webp&w=512";
export const SUBS_URL =
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/hand-icon-download-in-svg-png-gif-file-formats--button-subscribe-follow-click-gesture-pack-sign-symbols-icons-9998551.png?f=webp&w=512";
export const HISTORY_URL =
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/history-8658558-6908309.png?f=webp&w=512";

// SIDEBAR/EXPLORE
export const TRENDING_URL =
  "https://img.icons8.com/?size=100&id=la2S0ys9gplw&format=png&color=e7000b";

// APIS
const apiKey=process.env.REACT_APP_GOOGLE_API_KEY
export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=" +
  apiKey;

export const YOUTUBE_DATA_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

export const YOUTUBE_SEARCH_API =
  "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt";
  // /search&regionCode=US

// export const COMMENTS_API = "https://www.googleapis.com/youtube/v3/comments"
export const OFFSET_LIVE_CHAT = 10;


import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {  YOUTUBE_DATA_API_BASE_URL } from "./constants";

export const fetchVideos = createAsyncThunk(
  "video/fetchVideos",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const response = await fetch(
        `${YOUTUBE_DATA_API_BASE_URL}/search?part=snippet&maxResults=25&q=${searchQuery}&type=video&key=${apiKey}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message ||
            `Failed to fetch videos with status: ${response.status}`
        );
      }
      const json = await response.json();
      console.log("Youtube Video Search API Respnse", json);
      return json.items;
    } catch (error) {
      console.error("Error fetching youtube videos", error);
      rejectWithValue(
        error.message || `An unknown error occurred during video fetch.`
      );
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [], // Array to store the fetched video objects
    loading: false, // Boolean to indicate if an API call is in progress
    error: null,
    currentSearchQuery: "",
  },
  reducers: {
    clearVideos: (state) => {
      state.videos = [];
      state.currentSearchQuery = "";
      state.error = null;
    },
  },
  // extraReducers handle actions dispatched by createAsyncThunk
  // These are for actions that are defined outside of this slice (like thunks)
  extraReducers: (builder) => {
    builder
      // pending
      .addCase(fetchVideos.pending, (state, action) => {
        state.loading = true;
        state.error = null; // clear previous errors
        // action.meta.arg contains the argument passed to the thunk (the searchQuery)
        state.currentSearchQuery = action.meta.arg;
      })
      // fullfilled
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      // rejected
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.videos = []; // Clear videos on error
      });
  },
});

export const { clearVideos } = videoSlice.actions;
export default videoSlice.reducer;

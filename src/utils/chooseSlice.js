import { createSlice } from "@reduxjs/toolkit";

const chooseSlice = createSlice({
  name: "choose",
  initialState: {
    currentChoose: null,
    currentVideo: null,
    currentShow: null,
    tvshowVideo: null,
  },
  reducers: {
    updateChoose: (state, action) => {
      state.currentChoose = action.payload;
    },

    chooseVideo: (state, action) => {
      state.currentVideo = action.payload;
    },

    updateShow: (state, action) => {
      state.currentShow = action.payload;
    },

    chooseTvShowVideo: (state, action) => {
      state.tvshowVideo = action.payload;
    },

    removeChoose: (state) => {
      return {
        currentChoose: null,
        currentVideo: null,
        tvshowVideo: null,
        currentShow: null,
      };
    },
  },
});

export const {
  updateChoose,
  removeChoose,
  chooseVideo,
  chooseTvShowVideo,
  updateShow,
} = chooseSlice.actions;

export default chooseSlice.reducer;

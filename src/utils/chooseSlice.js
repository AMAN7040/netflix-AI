import { createSlice } from "@reduxjs/toolkit";

const chooseSlice = createSlice({
    name: 'choose',
    initialState: {
      currentChoose : null,
      currentVideo: null,
    },
    reducers: {
      updateChoose : (state, action) => {
        state.currentChoose =  action.payload;
      },
     
      chooseVideo: (state, action) => {
        state.currentVideo = action.payload;
      },

      removeChoose: (state) => {
        return {
          currentChoose: null,
          currentVideo: null,
        };
      },
    }
});

export const {updateChoose,removeChoose, chooseVideo} = chooseSlice.actions;

export default chooseSlice.reducer;
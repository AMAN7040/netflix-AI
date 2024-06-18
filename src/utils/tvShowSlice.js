import { createSlice } from "@reduxjs/toolkit";

const tvShowSlice = createSlice({
    name: 'tvShows',
    initialState: {
      allShow: null,
    },
    reducers: {
      addShow : (state, action) => {
        state.allShow =  action.payload;
      },
    }
});

export const {addShow} = tvShowSlice.actions;

export default tvShowSlice.reducer;
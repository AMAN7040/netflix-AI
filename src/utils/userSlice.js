import { createSlice } from "@reduxjs/toolkit";

const initialRecentlyViewed = localStorage.getItem("recentlyViewed")
  ? JSON.parse(localStorage.getItem("recentlyViewed"))
  : [];

const userSlice = createSlice({
    name: 'user',
    initialState: {
      currentUser: null,
      recentlyViewed: initialRecentlyViewed,
  },
    reducers: {
      addUser : (state, action) => {
        state.currentUser = action.payload;
      },

      removeUser: (state,action) => {
        state.currentUser = null;
      },
      addToRecentlyViewed: (state, action) => {
        const item  = action.payload;
        // Check if item is already in recently viewed, remove it to add at the top
        state.recentlyViewed = state.recentlyViewed.filter((i) => i.id !== item.id);
        // Add the item at the beginning of the array (most recent first)
        state.recentlyViewed.unshift(item);
        // Keep only the first 10 items in recently viewed
        if (state.recentlyViewed.length > 10) {
            state.recentlyViewed = state.recentlyViewed.slice(0, 10);
        }
        localStorage.setItem("recentlyViewed", JSON.stringify(state.recentlyViewed));
      },
    }
});

export const {addUser, removeUser, addToRecentlyViewed} = userSlice.actions;

export default userSlice.reducer;
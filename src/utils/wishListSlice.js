import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('wishlist')) || [], // Initialize wishlist from local storage
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      if (!state.items.some(item => item.id === newItem.id)) {
        state.items.push(newItem);
        updateLocalStorage(state.items); // Update local storage
      }
    },
    removeFromWishlist: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== idToRemove);
      updateLocalStorage(state.items);
    },
  },
});

// Function to update local storage
const updateLocalStorage = (wishlist) => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
